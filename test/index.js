import chai from 'chai';
import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';
import * as controllers from '../src/controllers';

chai.use(sinonChai);
const { expect } = chai;

const { fs } = controllers;

const unlink = () => {
	try {
		fs.unlinkSync('numbers.json');
	} catch (e) {
		// pass
	}
};

describe('generateNumbers(req, res)', () => {
	let sandbox;
	let res;
	beforeEach(() => {
		sandbox = sinon.createSandbox();
		unlink();

		sandbox.stub(fs, 'write').yields(null);
		res = {
			render: sinon.spy()
		};
	});

	afterEach('restore sandbox', () => {
		sandbox.restore();
		unlink();
	});

	it('should generate a list of numbers', () => {
		controllers.generateNumbers({ params: {} }, res);

		// eslint-disable-next-line no-unused-expressions
		expect(fs.write).to.have.been.calledOnce;
	});

	it('should throw error', () => {
		sandbox.stub(fs, 'readFile').yields({});
		controllers.sortedNumbers({ params: {} }, res);

		// eslint-disable-next-line no-unused-expressions
		expect(fs.readFile).to.have.been.calledOnce;
		expect(res.render).to.have.been.calledOnceWith(
			'main/main.html.twig',
			{ error: 'Could not find previous numbers, Try generating new numbers.' }
		);
	});

	it('should return sorted numbers in ascending', () => {
		sandbox.stub(fs, 'readFile').yields(null, '{ "numbers": ["0456", "08", "076", "09"] }');

		controllers.sortedNumbers({ params: {} }, res);

		// eslint-disable-next-line no-unused-expressions
		expect(fs.readFile).to.have.been.calledOnce;
		expect(res.render).to.have.been.calledOnceWith(
			'main/main.html.twig',
			{
				maximum: '0456', minimum: '08', numbers: ['08', '09', '076', '0456'], total: 4
			}
		);
	});

	it('should return sorted numbers in descending order', () => {
		sandbox.stub(fs, 'readFile').yields(null, '{ "numbers": ["0456", "08", "076", "09"] }');

		controllers.sortedNumbers({ params: { order: '0' } }, res);

		// eslint-disable-next-line no-unused-expressions
		expect(fs.readFile).to.have.been.calledOnce;
		expect(res.render).to.have.been.calledOnceWith(
			'main/main.html.twig',
			{
				maximum: '0456', minimum: '08', numbers: ['0456', '076', '09', '08'], total: 4
			}
		);
	});
});
