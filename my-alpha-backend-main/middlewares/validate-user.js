import bcrypt from 'bcrypt';
import pg from 'pg';
const { Client } = pg;
const saltRounds = 12;

const validateUser = async (req, res, next) => {
  const client = new Client();
  await client.connect();

  try {
    if (!req.body.data || !req.body.data.username || !req.body.data.password) {
      throw new Error('Unsufficient inputs!');
    }

    const query = `SELECT * FROM public.users WHERE username=$1 AND deleted IS NOT TRUE`;
    const results = await client.query(query, [req.body.data.username]);

    const user = results.rows[0];

    if (!user) {
      throw new Error('The user is not registered!');
    }

    const match = await bcrypt.compare(req.body.data.password, user.password);

    if (!match) {
      throw new Error('Wrong password!');
    }

    req.user = {
      id: user.id,
      data: {
        username: user.username,
        email: user.email,
        photo: user.photo,
        birthdate: new Date(user.birthdate).toISOString().split('T')[0],
      },
    };

    return next();
  } catch (error) {
    console.error(error);
    res.status(error.code || 400).send({ error: error.message });
  } finally {
    await client.end();
  }
};

export default validateUser;
