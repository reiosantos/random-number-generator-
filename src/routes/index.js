import express from 'express';

const router = express.Router();

/* GET home page. */
// noinspection JSUnresolvedFunction
router.get('/', (req, res) => {
	res.render('index.html.twig', { title: 'Phone Number Generator' });
});

export default router;
