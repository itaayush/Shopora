import JWT from "jsonwebtoken";


export const requireSignIn = async (req, res, next) => {
  try {
    
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Please login first",
      });
    }
    
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Unauthorized",
    });
  }
};
