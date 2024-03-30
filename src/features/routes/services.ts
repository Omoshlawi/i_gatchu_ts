import { Router } from "express";
import {
  createServices,
  deleteServices,
  getServices,
  updateServices,
} from "../controllers/services";
import fileUploader from "../../middlewares/upload";

const router = Router();

router.get("/", getServices);
router.post(
  "/",
  fileUploader({ dest: "services" }).single("image"),
  createServices
);
router.put(
  "/:id",
  fileUploader({ dest: "services" }).single("image"),
  updateServices
);
router.delete("/:id", deleteServices);

export default router;
