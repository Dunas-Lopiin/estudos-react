import { Router } from 'express';
import createUser from '../modules/create-user.js';
import validateInputs from '../middlewares/validate-inputs.js';
const router = Router();

router.post('/', validateInputs, async (req, res) => {
  try {
    const response = await createUser(req.user);

    if (response.error || req.error) {
      throw new Error(response.error.message);
    }

    res
      .cookie('token', response.token, {
        httpOnly: true,
      })
      .send(response.user);
  } catch (error) {
    console.error(error);
    //FIXME dev only! stop sending entire error messages to the client
    res.status(error.code || 400).send({ error: error.message });
  }
});

export default router;
