import type { Response } from 'express';
import type { ValidatedRequest } from "express-joi-validation";
import { Comment } from './comment.model';
import { CommentGetAllRequestSchema } from './comment.getAll.schema';

export default async function (
  req: ValidatedRequest<CommentGetAllRequestSchema>,
  res: Response
): Promise<Response> {
  const { proposer, filter, sort, offset, limit } = req.query;

  const condition = {
    ...(filter === 'mbti' ? { mbti: {$exists: true} } : {}),
    ...(filter === 'enneagram' ? { enneagram: {$exists: true} } : {}),
    ...(filter === 'zodiac' ? { zodiac: {$exists: true} } : {}),
  };

  let sortBy: any = { $sort: {likes_count: -1} };
  if (sort !== 'recent') {
    sortBy = { $sort: {createdAt: -1} };
  }

  try {
    const comments = await Comment.aggregate([
      { $match: {
        proposer,
        ...condition,
      }},
      { $project: {
        "author": 1,
        "proposer": 1,
        "mbti": 1,
        "zodiac": 1,
        "enneagram": 1,
        "title": 1,
        "content": 1,
        "likes": 1,
        "likes_count": { $size: "$likes" }
      }},
      { ...sortBy },
      { $skip : offset? +offset : 0 },
      { $limit : limit? +limit : 10 }
    ]);

    const total = await Comment
      .find({
        proposer
      })
      .where({
        ...condition
      })
      .count();

    return res.status(200).json({
      success: true,
      data: {
        total,
        offset: offset? +offset : 0,
        limit: limit? +limit : 10,
        comments
      },
    });
  } catch (err) {
    console.log('Get comments', err);
    return res.status(500).json({
      success: false,
      message: 'something went wrong',
    });
  }
};
