import { Router } from 'express';
import pg from 'pg';
import validateToken from '../middlewares/validate-token.js';

const router = Router();
const { Client } = pg;

router.delete('/', validateToken, async (req, res) => {
  const client = new Client();
  try {
    const user = req.body.data.username;
    const query = 'UPDATE public.users SET deleted = true WHERE username=$1';
    await client.connect();
    console.log('conectado ao banco');
    await client.query(query, [user]);
    console.log(user);
    res.send({ data: 'User deleted successfully' });
  } catch (e) {
    console.error(e);
    res.status(e.code || 503).send({ error: e.message });
  } finally {
    await client.end();
    console.log('Fim da conexão');
  }
});

export default router;
