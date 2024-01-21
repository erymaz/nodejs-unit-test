import * as Joi from 'joi';
import type { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import type { MbtiType, EnneagramType, ZodiacType  } from '../../shared/types';

export const commentCreateBodySchema = Joi.object({
  author: Joi.string().required(),
  proposer: Joi.string().required(),
  mbti: Joi.string().optional(),
  enneagram: Joi.string().optional(),
  zodiac: Joi.string().optional(),
  title: Joi.string().required(),
  content: Joi.string().required(),
});

interface CommentCreateBodySchema {
  author: string;
  proposer: string;
  mbti?: MbtiType,
  enneagram?: EnneagramType,
  zodiac?: ZodiacType,
  title: string;
  content: string;
}

export interface CommentCreateRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: CommentCreateBodySchema;
}
