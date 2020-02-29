import { confirmInput, log, selectOption } from 'app/functions';

export async function main() {
	const board = ["", "", "", "O", "X", "O", "X", "O", "X"];
	let boardDisplay: any = "";
	/** goes through every value in the board, and sets it equal to a string with dashes and spaces as needed */
	function displayBoard(board: any) {
		for(let i = 0; i < 9; i++) {
			let whiteSpace: string;;
			if(i > 7) {
				whiteSpace = "";
			}
			else if((i + 1) % 3 === 0) {
				whiteSpace = "\n–– ––– ––\n";
			} else {
				whiteSpace = " | ";
			}
			const positionValue: any = (board[i] === "") ? " " : board[i] ;
			boardDisplay = boardDisplay + positionValue + whiteSpace;
		}

		log(boardDisplay);
	}

	displayBoard(board);
}
