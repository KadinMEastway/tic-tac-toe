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

export const input = (...message: any[]) => Functions.input(...message);

export const log = (...message: any[]) => Functions.log(...message);

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

export async function selectOption(message: string, option: string[]): Promise<string> {
	message += '\n';
	for (let i = 0; i < option.length; i++) {
		const optionNumber = i + 1;
		message += `${optionNumber}-${option[i]} `;
	}
	log(message);

	return option[await inputWithinRange(1, option.length) - 1];
}

export async function confirmInput(message?: string): Promise<string> {
	let confirmed = false;
	let userInput = '';
	while (!confirmed) {
		userInput = await input(message);
		confirmed = await selectOption('Are you sure?', [ 'Yes', 'No' ]) === 'Yes';
	}

	return userInput;
}
