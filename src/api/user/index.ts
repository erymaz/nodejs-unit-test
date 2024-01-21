import * as express from 'express';
import { createValidator } from 'express-joi-validation';

import userGet from './user.get';
import userCreate from './user.create';
import { userGetParamsSchema } from './user.get.schema';
import { userCreateBodySchema } from './user.create.schema';

const router = express.Router();
const validator = createValidator();

router.get('/:id', validator.params(userGetParamsSchema), userGet);

router.post('/', validator.body(userCreateBodySchema), userCreate);

export default router;
