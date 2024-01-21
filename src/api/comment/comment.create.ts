import type { Response } from "express";
import type { ValidatedRequest } from "express-joi-validation";
import { Comment, CommentInput } from "./comment.model";
import { CommentCreateRequestSchema } from './comment.create.schema';

export default async(
  req: ValidatedRequest<CommentCreateRequestSchema>,
  res: Response,
): Promise<Response> => {
  const { author, content, proposer, title, mbti, enneagram, zodiac } = req.body;

  const commentInput: CommentInput = {
    author,
    proposer,
    title,
    content,
    ...(mbti ? {mbti} : {}),
    ...(enneagram ? {enneagram} : {}),
    ...(zodiac ? {zodiac} : {}),
  };

  try {
    const commentCreated = await Comment.create(commentInput);
    return res.status(201).json({
      success: true,
      data: commentCreated,
    });
  } catch (err) {
    console.log('Create comment', err);
    return res.status(500).json({
      success: false,
      message: 'something went wrong',
    });
  }
}
