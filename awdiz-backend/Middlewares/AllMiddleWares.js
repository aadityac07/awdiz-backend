import UserModal from "../Modals/User.modal.js"

export const checkUser =async(req , res , next)=>{
    try {
        const { id } = req.body
        const user =await UserModal.findById(id)
        if(user){
            // res.status(200).json({success : true , message :'done',user})
            next()
        }
        else{
            res.status(404).json({success : false , message:'id not found'})
            
        }
    }
    catch(error){
        res.status(500).json({success:false , message:'something went wrong'})
        console.log(error)
    }
}