import { confirmInput, log, selectOption } from 'app/functions';

const charClasses = [ 'Swordsman', 'Mage', 'Rogue', 'Cleric', 'Ranger' ];
const charGenders = [ 'Male', 'Female' ];

async function createUserCharacter(): Promise<User> {
	return {
		className: await selectOption('First things first. Enter your class number.', charClasses),
		gender: await selectOption('Now select your character\'s gender.', charGenders),
		name: await confirmInput('What do you wish to be called?'),
		level: 1
	};
}

export interface User {
	className: string,
	gender: string,
	name: string,
	level: number
}

function welcomeUser(userCharacter: User): void {
	if (userCharacter.className === 'Rogue') {
		log(
			'I see, so you\'re a Rogue. How unfortunate... Nonetheless, ' +
			userCharacter.name + ', it is an honor to meet you. Welcome to the Land of Thristen!'
		);
	} else {
		log('Your future shines brightly, '+ userCharacter.name +'. Best of luck to you, and welcome to Thristen!')
	}

	log('Class:', userCharacter.className, '  Gender:', userCharacter.gender, '  Name:', userCharacter.name);
}

export async function main() {
	const userCharacter =  await createUserCharacter();
	welcomeUser(userCharacter);
}
