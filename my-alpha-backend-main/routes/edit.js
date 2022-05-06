import { Router } from 'express';
import pg from 'pg';
import validateToken from '../middlewares/validate-token.js';
import bcrypt from 'bcrypt';
const saltRounds = 12;
const router = Router();
const { Client } = pg;

router.put('/', validateToken, async (req, res) => {
  const client = new Client();
  const { data } = req.body;

  if (data.password) {
    const hash = bcrypt.hashSync(data.password, saltRounds);
    data.password = hash;
  }

  const updates = [];
  Object.entries(data).forEach((entry, index, array) => {
    if (index === array.length - 1) {
      if (entry[1]) updates.push(` ${entry[0]}='${entry[1]}' `);
    } else {
      if (entry[1]) updates.push(` ${entry[0]}='${entry[1]}'`);
    }
  });

  try {
    await client.connect();

    console.log(data);
    console.log(updates);

    if (data.email) {
      const querySelect = `SELECT email FROM public.users WHERE email=$1`;
      const { rows } = await client.query(querySelect, [data.email]);

      if (rows[0]) {
        throw new Error('This email is already registered!');
      }
    }

    const queryInsert = `UPDATE public.users SET ${updates.join()} WHERE username=$1 RETURNING username, email, photo, birthdate;`;
    const values = [data.username];

    const { rows } = await client.query(queryInsert, values);

    console.log('rows');
    console.log(rows);

    res.send(rows[0]);
  } catch (error) {
    console.error(error);
    await client.query('ROLLBACK');
    res.status(error.code || 401).send({ error: error.message });
  } finally {
    await client.end();
  }
});

export default router;
