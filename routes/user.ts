import { Router } from "express";
import { _DELETE, _GET, _GET_BY_ID, _POST, _PUT } from "../controllers/users";

const router = Router();

router.get("/", _GET);
router.get("/:id", _GET_BY_ID);
router.post("/", _POST);
router.put("/:id", _PUT);
router.delete("/:id", _DELETE);

export default router;
