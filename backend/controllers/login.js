import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Router } from 'express';
import User from '../models/user.js';

const loginRouter = Router();

loginRouter.get('/', (request, response) => {
  response.status(200).send('login API');
});

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  try {
    const user = await User.findOne({ username });
    const passwordCorrect = user
      ? await bcrypt.compare(password, user.passwordHash)
      : false;

    if (!user || !passwordCorrect) {
      return response.status(401).json({ error: 'invalid username or password' });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' });

    response.status(200).send({
      token,
      username: user.username,
      name: user.name,
    });
  } catch (error) {
    response.status(500).json({ error: `internal server error: ${error}` });
  }
});

export default loginRouter;
