import Blog from '../models/blog.js';
import User from '../models/user.js';

export const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
  },
  {
    title: 'The Mythical Man-Month',
    author: 'Fred Brooks',
    url: 'https://en.wikipedia.org/wiki/The_Mythical_Man-Month',
    likes: 10,
  },
  {
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    url: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882',
    likes: 18,
  },
];

export const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

export const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};
