import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pg from 'pg';
const { Client } = pg;
dotenv.config();

const generateToken = async (user) => {
  const client = new Client();
  await client.connect();

  try {
    const jsonwebtoken = jwt.sign(
      {
        username: user.data.username,
        birthdate: user.data.birthdate,
      },
      process.env.JWT_SECRET,
      //FIXME raise the time to expire, 2min is only for testing
      { expiresIn: 60 * 100 }
    );

    const query = `UPDATE public.users SET token=$1 WHERE id=$2 RETURNING *`;
    const results = await client.query(query, [jsonwebtoken, user.id]);
    console.log(results.rows);

    return jsonwebtoken;
  } catch (error) {
    console.error(error);
    await client.query('ROLLBACK');
  } finally {
    await client.end();
  }
};

export default generateToken;
