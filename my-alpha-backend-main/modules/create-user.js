import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pg from 'pg';
import bcrypt from 'bcrypt';
const { Client } = pg;
const saltRounds = 12;
dotenv.config();

const createUser = async (data) => {
  const client = new Client();
  await client.connect();

  try {
    const querySelect = `SELECT * FROM public.users WHERE email=$1`;
    const resultsSelect = await client.query(querySelect, [data.email]);

    const user = resultsSelect.rows[0];

    if (user) {
      throw new Error('This email is already registered!');
    }

    const hash = bcrypt.hashSync(data.password, saltRounds);

    const jsonwebtoken = jwt.sign(
      {
        username: data.username,
        birthdate: data.birthdate,
      },
      process.env.JWT_SECRET,
      //FIXME raise the time to expire, 2min is only for testing
      { expiresIn: 60 * 100 }
    );

    const queryInsert = `INSERT INTO public.users (username, email, password, birthdate, token, deleted) VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [data.username, data.email, hash, data.birthdate, jsonwebtoken, 'false'];

    const resultsInsert = await client.query(queryInsert, values);

    return {
      token: jsonwebtoken,
      user: {
        username: data.username,
        email: data.email,
        birthdate: data.birthdate,
        userCreated: true,
      },
    };
  } catch (error) {
    await client.query('ROLLBACK');
    return { error };
  } finally {
    await client.end();
  }
};

export default createUser;
