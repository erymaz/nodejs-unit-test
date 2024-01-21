import * as Joi from 'joi';
import type { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";

export const userGetParamsSchema = Joi.object({
  id: Joi.string().required(),
});

export interface UserGetRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {
    id: string;
  }
};
