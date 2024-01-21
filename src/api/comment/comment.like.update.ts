import type { Response } from "express";
import type { ValidatedRequest } from "express-joi-validation";
import { Comment } from "./comment.model";
import { CommentLikeUpdateRequestSchema } from './comment.like.update.schema';

export default async(
  req: ValidatedRequest<CommentLikeUpdateRequestSchema>,
  res: Response,
): Promise<Response> => {
  const { userId } = req.body;
  const { id } = req.params;

  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(400).json({
        success: false,
        message: `Can't find comment with ID: ${id}`,
      });
    }

    if (comment.likes.includes(userId)) {
      comment.likes = comment.likes.filter(_ => _ !== userId);
    } else {
      comment.likes.push(userId);
    }
    await comment.save();

    return res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (err) {
    console.log('Create comment', err);
    return res.status(500).json({
      success: false,
      message: 'something went wrong',
    });
  }
}
