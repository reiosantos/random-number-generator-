import express from 'express';
import { generateNumbers, sortedNumbers } from '../controllers';

const router = express.Router();

/* GET home page. */
// noinspection JSUnresolvedFunction
router.get('/', sortedNumbers);
// noinspection JSUnresolvedFunction
router.get('/generate/numbers/', generateNumbers);
// noinspection JSUnresolvedFunction
router.get('/generate/numbers/:order/', sortedNumbers);

export default router;
