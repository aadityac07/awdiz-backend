import { Router } from "express";
import authRoutes from "./Auth.routes.js"
import productsRoutes from "./Product.routes.js"
import userRoutes from "./user.routes.js"
const router = Router()


router.use("/auth",authRoutes)
router.use("/product",productsRoutes)
router.use('/user',userRoutes)

export default router