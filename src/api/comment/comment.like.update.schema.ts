import * as Joi from 'joi';
import type { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";

export const commentLikeUpdateBodySchema = Joi.object({
  userId: Joi.string().required(),
});

interface CommentLikeUpdateBodySchema {
  userId: string;
}

export interface CommentLikeUpdateRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: CommentLikeUpdateBodySchema;
}
