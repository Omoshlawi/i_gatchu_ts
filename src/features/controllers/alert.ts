import { NextFunction, Response, Request } from "express";
import { EmmergencyAlertModel, SupportServiceModel } from "../models";
import { APIException } from "../../shared/exceprions";
import { EmegencyAlertSchema } from "../schema";
import { z } from "zod";
import path from "path/posix";

export const getAlerts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json({
      results: await EmmergencyAlertModel.findMany({
        include: { user: true, supportService: true, responses: true },
      }),
    });
  } catch (error) {
    next(error);
  }
};

export const createAlert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let uploadFiles;
    if (req.files?.length && (req.files!.length as any) > 0) {
      uploadFiles = Array.from(
        (req.files as Express.Multer.File[] | undefined) ?? []
      ).map(({ filename }) => path.join("alerts", filename));
    }
    const validation = await EmegencyAlertSchema.safeParseAsync({
      ...req.body,
      images: uploadFiles,
    });
    if (!validation.success)
      throw new APIException(400, validation.error.format());
    const { supportServiceId } = validation.data;
    if (
      supportServiceId &&
      !(await SupportServiceModel.findUnique({
        where: { id: supportServiceId },
      }))
    )
      throw new APIException(400, {
        supportServiceId: { _errors: ["Invalid support service id"] },
      });
    const service = await EmmergencyAlertModel.create({
      data: { ...validation.data, userId: (req as any).user.id },
      include: { user: true },
    });
    return res.json(service);
  } catch (error) {
    next(error);
  }
};

export const updateAlert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let uploadFiles;
    if (
      z.string().uuid().safeParse(req.params.id) ||
      !(await EmmergencyAlertModel.findUnique({ where: { id: req.params.id } }))
    )
      throw { status: 404, errors: { detail: "Service not found" } };
    if (req.files?.length && (req.files!.length as any) > 0) {
      uploadFiles = Array.from(
        (req.files as Express.Multer.File[] | undefined) ?? []
      ).map(({ filename }) => path.join("alerts", filename));
    }
    const validation = await EmegencyAlertSchema.safeParseAsync({
      ...req.body,
      images: uploadFiles,
    });
    if (!validation.success)
      throw new APIException(400, validation.error.format());
    const { supportServiceId } = validation.data;
    if (
      supportServiceId &&
      !(await SupportServiceModel.findUnique({
        where: { id: supportServiceId },
      }))
    )
      throw new APIException(400, {
        supportServiceId: { _errors: ["Invalid support service id"] },
      });
    const service = await EmmergencyAlertModel.update({
      where: { id: req.params.id },
      data: { ...validation.data, userId: (req as any).user.id },
    });
    return res.json(service);
  } catch (error) {
    next(error);
  }
};

export const deleteAlert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      z.string().uuid().safeParse(req.params.id) ||
      !(await EmmergencyAlertModel.findUnique({ where: { id: req.params.id } }))
    )
      throw { status: 404, errors: { detail: "Service not found" } };

    const service = await EmmergencyAlertModel.delete({
      where: { id: req.params.id },
    });
    return res.json(service);
  } catch (error) {
    next(error);
  }
};
