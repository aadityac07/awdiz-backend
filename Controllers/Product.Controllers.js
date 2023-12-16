import ProductModal from "../Modals/Product.modal.js"

export const Products = async (req , res) =>{
   try{
    const AllProducts = await ProductModal.find({})
    if(AllProducts.length)return res.status(200).json({success:true , message:'Products found',products :AllProducts})
    // if(!AddProduct.length)return res.status
   }
   catch(error){
    res.status(500).json({success:false , message:'something went wrong'})
   }

}

export const AddProduct = async (req , res)=>{
    try{
        const {name, price , category , image , id} = req.body
        if(!name || !price || !category || !image ) return res.status(404).json({success:false , message : 'incomplete fields'})

        const product = new ProductModal({
            name , image , category , price,userId : id
        })

       const ress =  await product.save()
       console.log(ress)
        return res.status(200).json({success:true , message :"product added successfully", id})
    }
    catch(error){
       return res.status(500).json({success:false , message:error})
    }
}

export const SingleProduct = async (req, res)=>{
    try{
        const {id :Id} = req.query
        // console.log(id)

        const product = await ProductModal.findById(Id)

        if(!product)return res.status(404).json({success:false , message:'no Id matched'})
        console.log(product)
        return res.status(200).json({success:true , message : 'Product found ' , product})
    }
    catch(error){
        console.log(error)
        return  res.status(500).json({success:false , message:'something went wrong'})
    }
}


export const FilterProduct = async (req , res)=>{
    try{
        const {skip = 0 , page = 2 , query} = req.body

        const updatedQuery = {category: query}
       
        const products = await ProductModal.find(updatedQuery).skip(skip).limit(page)

        if(!products)return res.status(404).json({success:false, message:'not found'})

        return res.status(200).json({success:true , message:'found Products -',products})
    }
    catch(error){
        return res.status(500).json({success:false , message:'something went wrong'})
    }
}

export const SortProduct = async (req, res)=>{
    try{
        const { sorting } = req.body


        const products = await ProductModal.find({}).sort({price:sorting}).select("name price")

        if(!products)return res.status(404).json({success:false, message:'not found'})

        return res.status(200).json({success:true , message:'found Products -',products})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false , message:'something went wrong'})
    }
}


export const YourProduct = async (req , res )=>{
    try{
        const { id } = req.body

        if(!id) return  res.status(404).json({success:false, message:'not found'})

        const allProducts = await ProductModal.find({userId: id})
        console.log(allProducts)
        return res.status(200).json({success : true , message:'your products ' , allProducts})
    }catch(error){
        console.log(error)
        return res.status(500).json({success:false , message:'something went wrong'})
    }
}

export const UpdateProduct = async (req , res)=>{
    try{
        const {name , image , price , category , _id} = req.body.productData
        if(!name && !image && !price && !category)return res.status(404).json({success: false , message:"incomplete fields"})
        await ProductModal.findByIdAndUpdate(_id , {name ,image , price , category})
        return res.status(200).json({success:true , message:"updated successfully"})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false , message:'something went wrong'})
    }
}

export const deleteProduct = async(req,res)=>{
    try {
        const { id } = req.query;
        if (!id) return res.status(404).json({ message: "Id not found." })

        await ProductModal.findByIdAndDelete(id)
        return res.status(200).json({ success: true, message: "Product deleted successfully." })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message:"something went wrong" })
    }
}