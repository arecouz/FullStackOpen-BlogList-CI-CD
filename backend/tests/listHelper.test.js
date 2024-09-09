import { test, describe } from 'node:test';
import assert from 'node:assert';
import * as listHelper from '../utils/list_helper.js';

const oneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0,
  },
];
const threeBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'The Mythical Man-Month',
    author: 'Fred Brooks',
    url: 'https://en.wikipedia.org/wiki/The_Mythical_Man-Month',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17fa',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    url: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882',
    likes: 8,
    __v: 0,
  },
];
const threeBlogsWithLikesTie = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'The Mythical Man-Month',
    author: 'Fred Brooks',
    url: 'https://en.wikipedia.org/wiki/The_Mythical_Man-Month',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17fa',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    url: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882',
    likes: 8,
    __v: 0,
  },
];
const threeBlogsWithDuplicateAuthor = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'JOHN',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'The Mythical Man-Month',
    author: 'Fred Brooks',
    url: 'https://en.wikipedia.org/wiki/The_Mythical_Man-Month',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17fa',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'JOHN',
    url: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882',
    likes: 8,
    __v: 0,
  },
];

describe('listHelper tests', () => {
  describe('total likes', () => {
    test('for zero blogs', () => {
      const result = listHelper.totalLikes([]);
      assert.strictEqual(result, 0);
    });

    test('for one blog', () => {
      const result = listHelper.totalLikes(oneBlog);
      assert.strictEqual(result, 5);
    });

    test('for multiple blogs', () => {
      const result = listHelper.totalLikes(threeBlogs);
      assert.strictEqual(result, 23);
    });
  });

  describe('favorite blog', () => {
    test('for zero blogs', () => {
      const result = listHelper.favoriteBlog([]);
      assert.deepStrictEqual(result, null);
    });

    test('for one blog', () => {
      const result = listHelper.favoriteBlog(oneBlog);
      assert.deepStrictEqual(result, oneBlog[0]);
    });

    test('for multiple blogs', () => {
      const result = listHelper.favoriteBlog(threeBlogs);
      assert.deepStrictEqual(result, {
        _id: '5a422aa71b54a676234d17f9',
        title: 'The Mythical Man-Month',
        author: 'Fred Brooks',
        url: 'https://en.wikipedia.org/wiki/The_Mythical_Man-Month',
        likes: 10,
        __v: 0,
      });
    });

    test('for multiple blogs with a tie', () => {
      const result = listHelper.favoriteBlog(threeBlogsWithLikesTie);
      const option1 = {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 10,
        __v: 0,
      };
      const option2 = {
        _id: '5a422aa71b54a676234d17f9',
        title: 'The Mythical Man-Month',
        author: 'Fred Brooks',
        url: 'https://en.wikipedia.org/wiki/The_Mythical_Man-Month',
        likes: 10,
        __v: 0,
      };
      assert.deepStrictEqual(result, option1 || option2);
    });
  });

  describe('most blogs', () => {
    test('for zero blogs', () => {
      const result = listHelper.mostBlogs([]);
      assert.deepStrictEqual(result, null);
    });

    test('for one blog', () => {
      const result = listHelper.mostBlogs(oneBlog);
      assert.deepStrictEqual(result, {
        author: 'Edsger W. Dijkstra',
        blogs: 1,
      });
    });

    test('for multiple blogs', () => {
      const result = listHelper.mostBlogs(threeBlogsWithDuplicateAuthor);
      assert.deepStrictEqual(result, {
        author: 'JOHN',
        blogs: 2,
      });
    });
  });

  describe('most likes', () => {
    test('for zero blogs', () => {
      const result = listHelper.mostLikes([]);
      assert.deepStrictEqual(result, null);
    });

    test('for one blog', () => {
      const result = listHelper.mostLikes(oneBlog);
      assert.deepStrictEqual(result, {
        author: 'Edsger W. Dijkstra',
        likes: 5,
      });
    });

    test('for multiple blogs', () => {
      const result = listHelper.mostLikes(threeBlogsWithDuplicateAuthor);
      assert.deepStrictEqual(result, {
        author: 'JOHN',
        likes: 18,
      });
    });
  });
});
