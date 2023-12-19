import UserModal from "../Modals/User.modal.js"
import bcrypt from 'bcrypt'
import Jwt from "jsonwebtoken"

export const Login = async (req, res) => {
    try {
      const { email, password } = req.body.userData;
  
      if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are mandatory." });
      }
  
      const user = await UserModal.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ success: false, message: "Invalid email." });
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
  
      if (!isPasswordCorrect) {
        return res.status(401).json({ success: false, message: "Wrong password." });
      }
  
      const token =await Jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      console.log(user._id)
  
      return res.status(200).json({success: true, message: "Login successful", user: { name: user.name, id:user._id },token: token
      })
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ success: false, message: "Internal server error." });
    }
  };
  export const Register = async (req, res) => {
    try {
      const { name, email, password } = req.body.userData;
  
      if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are mandatory." });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new UserModal({
        name,
        email,
        password: hashedPassword
      });
  
      await user.save();
  
      return res.status(200).json({ success: true, message: "Registration successful" });
    } catch (error) {
      console.error("Error during registration:", error);
      return res.status(500).json({ success: false, message: "Internal server error." });
    }
  };
export const getCurrentUser =async (req, res)=> {
    try {
        const { token } = req.body;

        if (!token) return res.status(401).json({ success: false, message: "Token is required." })

        const {id } = await Jwt.verify(token, process.env.JWT_SECRET)
         console.log(id, 'id')

        const user = await UserModal.findById(id);

        if (!user) return res.status(401).json({ success: false, message: "User not found." })

        return res.status(200).json({ success: true, user: { name: user.name, id: user._id } })

    } catch (error) {

        return res.status(500).json({ success: false, message: error })
    }


}