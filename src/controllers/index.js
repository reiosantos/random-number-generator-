import * as fs from 'fs';
import { numberGenerator, quickSort } from '../utils';

const sortedNumbers = (req, res) => {
	const { order } = req.params;

	fs.readFile('numbers.json', { encoding: 'utf-8', flag: 'r' }, (err, data) => {
		if (err) {
			return res.render('main/main.html.twig', {
				error: 'Could not find previous numbers, Try generating new numbers.'
			});
		}

		let maximum; let minimum; let numbers;
		try {
			const { numbers: num } = JSON.parse(data);
			numbers = num || [];
		} catch (e) {
			numbers = [];
		}

		if (numbers.length > 0) {
			if (order === '0') {
				// Descending
				quickSort(numbers, 0, numbers.length - 1, false);
				minimum = numbers[numbers.length - 1];
				[maximum] = numbers;
			} else {
				// Ascending
				quickSort(numbers, 0, numbers.length - 1);
				[minimum] = numbers;
				maximum = numbers[numbers.length - 1];
			}
		}
		return res.render('main/main.html.twig', {
			maximum, minimum, numbers, total: numbers.length
		});
	});
};

const generateNumbers = (req, res) => {
	const numbers = numberGenerator(10000);

	const fd = fs.openSync('numbers.json', 'w', 0o777);

	return fs.write(
		fd,
		Buffer.from(JSON.stringify({ numbers }), 'utf-8'),
		// eslint-disable-next-line no-unused-vars
		err => sortedNumbers(req, res)
	);
};

export {
	sortedNumbers,
	generateNumbers,
	fs
};
