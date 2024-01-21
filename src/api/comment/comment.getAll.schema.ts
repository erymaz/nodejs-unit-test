import * as Joi from 'joi';
import type { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import { CommentFilterType, CommentSortType } from '../../shared/types';

export const commentGetAllQuerySchema = Joi.object({
  proposer: Joi.string().required(),
  filter: Joi.string().optional(),
  sort: Joi.string().optional(),
  offset: Joi.number(),
  limit: Joi.number(),
});

export interface CommentGetAllRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    proposer: string;
    filter?: CommentFilterType;
    sort?: CommentSortType;
    offset?: number;
    limit?: number;
  }
};
