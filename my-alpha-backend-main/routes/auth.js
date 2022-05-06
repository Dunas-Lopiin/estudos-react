import { Router } from 'express';
import validateUser from '../middlewares/validate-user.js';
import generateToken from '../modules/generate-token.js';
const router = Router();

router.post('/', validateUser, async (req, res) => {
  try {
    const token = await generateToken(req.user);

    if (!token) {
      throw new Error('could not set cookies');
    }

    res
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      .send(req.user.data);
  } catch (error) {
    console.error(error.code);
    //FIXME dev only! stop sending entire error messages to the client
    res.status(error.code || 400).send({ error: error.message });
  }
});

export default router;
