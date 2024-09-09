import { Router } from 'express';
import jwt from 'jsonwebtoken';
import Blog from '../models/blog.js';
import User from '../models/user.js';
import { authenticationToken, userExtractor } from '../utils/middleware.js'; // Import middleware functions

const blogsRouter = Router();

// Middleware to extract token and user
blogsRouter.use(authenticationToken);
blogsRouter.use(userExtractor);

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1 });
  response.status(200).json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.status(200).json(blog);
});

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const user = await User.findById(decodedToken.id);

  const newBlog = new Blog({ title, author, url, likes, user });
  const savedBlog = await newBlog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const blog = await Blog.findById(request.params.id);
  if (blog.user.toString() !== request.user) {
    return response.status(403).json({ error: 'permission denied' });
  }
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlogResult = await Blog.findByIdAndUpdate(
    request.params.id,
    updatedBlog,
    { new: true }
  );
  response.status(200).json(updatedBlogResult);
});

export default blogsRouter;
