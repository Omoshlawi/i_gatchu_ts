import { Router } from "express";
import {
  createAlert,
  deleteAlert,
  getAlerts,
  updateAlert,
} from "../controllers/alert";
import authenticate from "../../middlewares/authentication";
import fileUploader from "../../middlewares/upload";

const router = Router();

router.get("/", getAlerts);
router.post(
  "/",
  [authenticate, fileUploader({ dest: "alerts" }).array("images")],
  createAlert
);
router.put(
  "/:id",
  [authenticate, fileUploader({ dest: "alerts" }).array("images")],
  updateAlert
);
router.delete("/:id", [authenticate], deleteAlert);

export default router;
