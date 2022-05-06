import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const validateToken = (req, res, next) => {
  try {
    const token = req.cookies['token'];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //FIXME test if data structures is wrong
    if (!token || req.body.data.username !== decoded.username) {
      throw new Error(
        'The user does not have authorization for this request or the token has expired, please login again!'
      );
    }

    req.user = { ...decoded, isAuth: true };
    return next();
  } catch (error) {
    console.error(error.code);
    //FIXME dev only! stop sending entire error messages to the client
    res.status(error.code || 400).send({ error: error.message });
  }
};

export default validateToken;
