
export const numberGenerator = (size = 1000, length = 10) => {
	const intMap = {};
	while (size--) {
		let int = `0${Math.random() * (10 ** (length - 1)) << 0}`;
		int += '0'.repeat(length - int.length);

		if (!intMap[int]) {
			intMap[int] = true;
		}
	}
	return Object.keys(intMap);
};

const __swap = (array, i, j) => {
	const tmp = array[i];
	array[i] = array[j];
	array[j] = tmp;
};

const __partition = (array, low, high, ascending) => {
	let i = low - 1; // index of smaller element
	const pivot = array[high];
	for (let j = low; j < high; j += 1) {
		if (ascending) {
			if (Number.parseInt(array[j].slice(1), 10) <= Number.parseInt(pivot.slice(1), 10)) {
				i += 1;
				__swap(array, i, j);
			}
		} else if (Number.parseInt(array[j].slice(1), 10) >= Number.parseInt(pivot.slice(1), 10)) {
			i += 1;
			__swap(array, i, j);
		}
	}

	__swap(array, (i + 1), high);
	return i + 1;
};

export const quickSort = (array, low, high, ascending = true) => {
	// Create an auxiliary stack
	const size = (high - low) + 1;
	// eslint-disable-next-line no-unused-vars
	const stack = Array.from({ length: size }, (v, k) => 0);

	// initialize top of stack
	let top = -1;

	// push initial values of low and high to stack
	top += 1;
	stack[top] = low;
	top += 1;
	stack[top] = high;

	// Keep popping from stack while is not empty
	while (top >= 0) {
		// Pop high and low
		high = stack[top];
		top -= 1;
		low = stack[top];
		top -= 1;
		// Set pivot element at its correct position in sorted array
		const pivot = __partition(array, low, high, ascending);

		// If there are elements on left side of pivot, then push left side to stack
		if (pivot - 1 > low) {
			top += 1;
			stack[top] = low;
			top += 1;
			stack[top] = pivot - 1;
		}

		// If there are elements on right side of pivot, then push right side to stack
		if (pivot + 1 < high) {
			top += 1;
			stack[top] = pivot + 1;
			top += 1;
			stack[top] = high;
		}
	}
	return array;
};
