import request from 'supertest';
import { app, server } from '../src/app'
import { Comment } from '../src/api/comment/comment.model';
import { fakeCommentData } from './fixtures/index';
import {
  validateNotEmpty,
  validateStringEquality,
} from './utils/validators';

describe('Comment Model Test Suite', () => {
  test('should validate saving a new comment successfully', async () => {
    const validComment = new Comment(fakeCommentData);
    const savedComment = await validComment.save();

    validateNotEmpty(savedComment);

    validateStringEquality(savedComment.title, savedComment.title);
    validateStringEquality(
      savedComment.content,
      fakeCommentData.content
    );
    expect(savedComment.likes).toEqual([]);
  });
});

describe('Comment Endpoints Test Suite', () => {
  afterAll(() => {
    if (server) {
      server.close();
    }
  });

  let commentId = '';
  it('should create a new Comment', async () => {
    const res = await request(app)
      .post('/api/comments')
      .send(fakeCommentData);
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toEqual(true);
  });

  it('should get empty with wrong proposer', async () => {
    const res = await request(app)
      .get(`/api/comments?proposer=${fakeCommentData.author}`)
      .send();
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.data.total).toEqual(0);
    expect(res.body.data.comments).toEqual([]);
  });

  it('should get 2 comments from DB with correct proposer', async () => {
    const res = await request(app)
      .get(`/api/comments?proposer=${fakeCommentData.proposer}&filter=mbti`)
      .send();
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.data.total).toEqual(2);
    expect(res.body.data.comments.length).toEqual(2);
    commentId = res.body.data.comments[0]._id;
  });

  it('should get 0 comments from DB by filter', async () => {
    const res = await request(app)
      .get(`/api/comments?proposer=${fakeCommentData.proposer}&filter=zodiac`)
      .send();
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
    expect(res.body.data.total).toEqual(0);
    expect(res.body.data.comments.length).toEqual(0);
  });

  it('should add or remove like from comment', async () => {
    const res1 = await request(app)
      .patch(`/api/comments/${commentId}/like`)
      .send({
        userId: "likeUserId"
      });
    expect(res1.statusCode).toEqual(200);
    expect(res1.body.success).toEqual(true);
    expect(res1.body.data.likes.length).toEqual(1);
    expect(res1.body.data.likes[0]).toEqual("likeUserId");

    const res2 = await request(app)
      .patch(`/api/comments/${commentId}/like`)
      .send({
        userId: "likeUserId"
      });
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.success).toEqual(true);
    expect(res2.body.data.likes.length).toEqual(0);
  });

  // we can add more unit tests for params validation and failed cases
});
