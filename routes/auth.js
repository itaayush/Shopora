import express from "express";
import { loginController, registerController, logoutController, updateProfileController } from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddlewares.js";

const router = express.Router();
 



router.post('/register', registerController)

router.post('/login', loginController)

router.post('/logout', logoutController)


router.put('/profile', requireSignIn, updateProfileController)



router.get("/user-auth", requireSignIn, (req, res)=>{
    res.status(200).send({
        "ok":true,
    })
})




export default router;

