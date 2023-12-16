import { Router } from "express";
import { AddProduct, Products, SingleProduct, FilterProduct, SortProduct, YourProduct, UpdateProduct, deleteProduct } from "../Controllers/Product.Controllers.js";
import { checkUser } from "../Middlewares/AllMiddleWares.js";

const router = Router()

router.get('/Allproducts',Products)
router.post('/Add-product',checkUser,AddProduct)
router.get('/single-product',SingleProduct)
router.post('/filter', FilterProduct) 
router.post('/sorting',SortProduct)
router.post('/your-products',YourProduct)
router.post('/update-product',UpdateProduct)
router.delete('/delete-product',deleteProduct)

export default router