import { NextFunction, Response, Request } from "express";
import { SupportServiceModel } from "../models";
import { APIException } from "../../shared/exceprions";
import { SupportServiceSchema } from "../schema";
import { z } from "zod";
import path from "path/posix";

export const getServices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json({ results: await SupportServiceModel.findMany() });
  } catch (error) {
    next(error);
  }
};

export const createServices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let uploadFile;
    if (req.file) {
      uploadFile = path.join("services", req.file.filename);
    }
    const validation = await SupportServiceSchema.safeParseAsync({
      ...req.body,
      image: uploadFile,
    });
    if (!validation.success)
      throw new APIException(400, validation.error.format());
    const service = await SupportServiceModel.create({ data: validation.data });
    return res.json(service);
  } catch (error) {
    next(error);
  }
};

export const updateServices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let uploadFile;
    if (
      z.string().uuid().safeParse(req.params.id) ||
      !(await SupportServiceModel.findUnique({ where: { id: req.params.id } }))
    )
      throw { status: 404, errors: { detail: "Service not found" } };
    if (req.file) {
      uploadFile = path.join("services", req.file.filename);
    }
    const validation = await SupportServiceSchema.safeParseAsync({
      ...req.body,
      image: uploadFile,
    });
    if (!validation.success)
      throw new APIException(400, validation.error.format());
    const service = await SupportServiceModel.update({
      where: { id: req.params.id },
      data: validation.data,
    });
    return res.json(service);
  } catch (error) {
    next(error);
  }
};

export const deleteServices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      z.string().uuid().safeParse(req.params.id) ||
      !(await SupportServiceModel.findUnique({ where: { id: req.params.id } }))
    )
      throw { status: 404, errors: { detail: "Service not found" } };

    const service = await SupportServiceModel.delete({
      where: { id: req.params.id },
    });
    return res.json(service);
  } catch (error) {
    next(error);
  }
};
