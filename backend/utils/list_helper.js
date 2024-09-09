import _ from 'lodash';

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => acc + curr.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const fave = blogs.reduce((winning, current) => {
    return current.likes > winning.likes ? current : winning;
  }, blogs[0]);
  return fave;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const authorCounts = _.countBy(blogs, 'author');
  const topAuthor = _.maxBy(
    _.keys(authorCounts),
    (author) => authorCounts[author]
  );
  return { author: topAuthor, blogs: authorCounts[topAuthor] };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const authorLikes = {};
  blogs.forEach((blog) => {
    if (Object.prototype.hasOwnProperty.call(authorLikes, blog.author)) {
      authorLikes[blog.author] += blog.likes;
    } else {
      authorLikes[blog.author] = blog.likes;
    }
  });

  const topAuthor = _.maxBy(
    _.keys(authorLikes),
    (author) => authorLikes[author]
  );
  return { author: topAuthor, likes: authorLikes[topAuthor] };
};

export { totalLikes, favoriteBlog, mostBlogs, mostLikes };
