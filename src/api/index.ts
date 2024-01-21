import * as express from 'express';
import user from './user';
import comment from './comment';

const router = express.Router()

router.use('/users', user);

router.use('/comments', comment);

export default router;
