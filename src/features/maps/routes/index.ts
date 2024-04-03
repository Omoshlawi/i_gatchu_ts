import { NextFunction, Request, Response } from "express";
import { Router } from "express";
import {
  mapQuestPlacesSearch,
  openRoutePlaceSearch,
  mapQuestReverseGeoCode,
  openRouteReverseGeocode,
  openRouteMatrix,
  mapQuestMatrix,
  mapQuestOptimizedRoute,
} from "../repositories";

const router = Router();

router.get(
  "/places",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Here is it", req.query, req.path);

    try {
      const results = await openRoutePlaceSearch(
        (req.query.q as string | undefined) ?? ""
      );
      res.json({ results: results || [] });
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  "/direction",
  async (req: Request, res: Response, next: NextFunction) => {}
);
router.get(
  "/geocoding/reverse",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const location: any = req.query.location;
      if (!location || location.split(",").length !== 2) {
        return res
          .status(400)
          .json({ detail: "Invalid Query parameter location" });
      }
      const [lat, lng] = location.split(",");
      const results = await openRouteReverseGeocode({ lat, lng });
      res.json({ results: results || [] });
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/matrix",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const profile = req.body.profile || undefined;
      const response = await mapQuestMatrix({ ...req.body, profile });
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/direction",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const profile = req.body.profile || undefined;
      const response = await mapQuestOptimizedRoute({ ...req.body, profile });
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
