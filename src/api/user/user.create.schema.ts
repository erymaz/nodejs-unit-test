import * as Joi from 'joi';
import type { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import type { CategoryType, IPersonalities } from '../../shared/types';

export const userPersonalitiesSchema = Joi.object({
  mbti: Joi.string(),
  enneagram: Joi.string(),
  socionics: Joi.string(),
});

export const userCreateBodySchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  image: Joi.string().required(),
  bio: Joi.string().required(),
  category: Joi.string().required(),
  personalities: userPersonalitiesSchema,
});

interface UserCreateBodySchema {
  firstName: string;
  lastName: string;
  image: string;
  bio: string;
  category: CategoryType;
  personalities?: IPersonalities;
}

export interface UserCreateRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: UserCreateBodySchema;
}
