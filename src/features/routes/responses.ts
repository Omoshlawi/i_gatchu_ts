import { Router } from "express";
import {
  createResponse,
  deleteResponse,
  getResponses,
  updateResponse,
} from "../controllers/response";
import authenticate from "../../middlewares/authentication";
import fileUploader from "../../middlewares/upload";

const router = Router();

router.get("/", getResponses);
router.post(
  "/",
  [authenticate, fileUploader({ dest: "responses" }).array("images")],
  createResponse
);
router.put(
  "/:id",
  [authenticate, fileUploader({ dest: "responses" }).array("images")],
  updateResponse
);
router.delete("/:id", [authenticate], deleteResponse);

export default router;
