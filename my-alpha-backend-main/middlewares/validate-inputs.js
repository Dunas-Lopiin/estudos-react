import pg from 'pg';
const { Client } = pg;

const validateInputs = async (req, res, next) => {
  try {
    const { username, email, password, birthdate } = req.body.data;

    const regex = {
      html: /<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/,
      username: /^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      email: /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,4})+$/,
      password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
      birthdate: /^([1-2][0-9]{3})-([0-9]{2})-([0-9]{2})$/,
    };

    if (
      regex.html.test(username) ||
      regex.html.test(email) ||
      regex.html.test(birthdate) ||
      !regex.username.test(username) ||
      !regex.email.test(email) ||
      !regex.password.test(password) ||
      !regex.birthdate.test(birthdate)
    ) {
      throw new Error('invalid inputs');
    }

    //---QUERY THE DATABASE FOR THE USERNAME (IF EXISTS, THROW AN ERROR)
    const client = new Client();
    await client.connect();

    //FIXME what if the user exists but has been deleted?
    const query = `SELECT * FROM public.users WHERE username=$1`;
    const results = await client.query(query, [username]);

    if (results.rows[0]) {
      throw new Error('This username already exists!');
    }

    await client.end();
    //---

    req.user = { username, email, birthdate, password };

    return next();
  } catch (error) {
    res.status(error.code || 400).send({ error: error.message });
  }
};

export default validateInputs;
