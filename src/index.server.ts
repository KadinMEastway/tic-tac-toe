import { Functions } from './app/functions';
import { main } from './app/app';

// setup the input function
Functions.input = function(message?: string): Promise<string> {
	const stdin = process.stdin
	stdin.resume();

	if (message) {
		console.log(message);
	}

	return new Promise(resolve => {
		stdin.once('data', function (data) {
			resolve(data.toString().trim());
		});
	});
}

console.log('Starting App');
main().then(() => process.exit());
