import * as express from 'express';
import { createValidator } from 'express-joi-validation';

import commentCreate from './comment.create';
import commentGetAll from './comment.getAll';
import commentLike from './comment.like.update'
import { commentCreateBodySchema } from './comment.create.schema';
import { commentGetAllQuerySchema } from './comment.getAll.schema';
import { commentLikeUpdateBodySchema } from './comment.like.update.schema';

const router = express.Router();
const validator = createValidator();

router.get('/', validator.query(commentGetAllQuerySchema), commentGetAll);

router.post('/', validator.body(commentCreateBodySchema), commentCreate);

router.patch('/:id/like', validator.body(commentLikeUpdateBodySchema), commentLike);

export default router;
