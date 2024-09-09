import bcrypt from 'bcrypt';
import { Router } from 'express';
import User from '../models/user.js';
import logger from '../utils/logger.js';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({}).populate('blogs', { title: 1 });
    response.status(200).json(users);
  } catch (error) {
    response.status(500).json({ error: 'internal server error' });
    logger.error(error);
  }
});

usersRouter.post('/', async (request, response) => {
  const { name, username, password } = request.body;

  if (password.length < 3) {
    return response.status(400).json({ error: 'Password too short' });
  }

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ name, username, passwordHash });
    const savedUser = await newUser.save();
    response.status(201).json(savedUser);
  } catch (error) {
    response.status(400).json({ error: error.message });
    logger.error(error.message);
  }
});

export default usersRouter;
