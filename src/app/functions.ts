export const Functions = {
	input: function(...messages: any[]): Promise<string> {
		if (messages.length) {
			log(...messages);
		}
		return Promise.resolve('');
	},
	log: function(...messages: any[]): void {
		console.log(...messages);
	}
}

/** accept a line of user input */
export const input = (...message: any[]) => Functions.input(...message);

/** logs a line of text out to the user */
export const log = (...message: any[]) => Functions.log(...message);

/** accept a number from the user within the requested range */
export async function inputWithinRange(
	min = 0,
	max = Number.POSITIVE_INFINITY,
	errorMessage = `Input is not within range: ${min}-${max}`
): Promise<number> {
	let validInput = false;
	let userInput = 0;
	while (!validInput) {
		userInput = parseInt(await input());
		validInput = userInput >= min && userInput <= max;
		if (!validInput) {
			log(errorMessage);
		}
	}

	return userInput;
}

/** have the user select an option from the provided options */
export async function selectOption(message: string, option: string[]): Promise<string> {
	message += '\n';
	for (let i = 0; i < option.length; i++) {
		const optionNumber = i + 1;
		message += `${optionNumber}-${option[i]} `;
	}
	log(message);

	return option[await inputWithinRange(1, option.length) - 1];
}

/** accept an input from the user and have them confirm their answer */
export async function confirmInput(message?: string): Promise<string> {
	let confirmed = false;
	let userInput = '';
	while (!confirmed) {
		userInput = await input(message);
		confirmed = await selectOption('Are you sure?', [ 'Yes', 'No' ]) === 'Yes';
	}

	return userInput;
}
