import { NextFunction, Response, Request } from "express";
import { EmmergencyAlertModel, EmergencyResponseModel } from "../models";
import { APIException } from "../../shared/exceprions";
import { EmergencyReponseSchema } from "../schema";
import { z } from "zod";
import path from "path/posix";

export const getResponses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json({ results: await EmergencyResponseModel.findMany() });
  } catch (error) {
    next(error);
  }
};

export const createResponse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let uploadFiles;
    if (req.files?.length && (req.files!.length as any) > 0) {
      uploadFiles = Array.from(
        (req.files as Express.Multer.File[] | undefined) ?? []
      ).map(({ filename }) => path.join("responses", filename));
    }
    const validation = await EmergencyReponseSchema.safeParseAsync({
      ...req.body,
      images: uploadFiles,
    });
    if (!validation.success)
      throw new APIException(400, validation.error.format());
    const { alertId } = validation.data;
    if (
      !(await EmmergencyAlertModel.findUnique({
        where: { id: alertId },
      }))
    )
      throw new APIException(400, {
        alertId: { _errors: ["Invalid alert"] },
      });
    const service = await EmergencyResponseModel.create({
      data: validation.data,
    });
    return res.json(service);
  } catch (error) {
    next(error);
  }
};

export const updateResponse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let uploadFiles;
    if (
      z.string().uuid().safeParse(req.params.id) ||
      !(await EmergencyResponseModel.findUnique({
        where: { id: req.params.id },
      }))
    )
      throw { status: 404, errors: { detail: "Response not found" } };
    if (req.files?.length && (req.files!.length as any) > 0) {
      uploadFiles = Array.from(
        (req.files as Express.Multer.File[] | undefined) ?? []
      ).map(({ filename }) => path.join("responses", filename));
    }
    const validation = await EmergencyReponseSchema.safeParseAsync({
      ...req.body,
      images: uploadFiles,
    });
    if (!validation.success)
      throw new APIException(400, validation.error.format());
    const { alertId } = validation.data;
    if (
      !(await EmmergencyAlertModel.findUnique({
        where: { id: alertId },
      }))
    )
      throw new APIException(400, {
        alertId: { _errors: ["Invalid alert"] },
      });
    const service = await EmergencyResponseModel.update({
      where: { id: req.params.id },
      data: validation.data,
    });
    return res.json(service);
  } catch (error) {
    next(error);
  }
};

export const deleteResponse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      z.string().uuid().safeParse(req.params.id) ||
      !(await EmergencyResponseModel.findUnique({
        where: { id: req.params.id },
      }))
    )
      throw { status: 404, errors: { detail: "alert not found" } };

    const service = await EmergencyResponseModel.delete({
      where: { id: req.params.id },
    });
    return res.json(service);
  } catch (error) {
    next(error);
  }
};
