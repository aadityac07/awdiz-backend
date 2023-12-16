
import { Router } from "express";
import { addCart, getCart } from "../Controllers/User.controllers.js";


const router = Router()

router.post("/cart",addCart)
router.post("/get-cart",getCart)


export default router