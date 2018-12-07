/**
 * @author robp94 / https://github.com/robp94
 */

import { Node } from "./core/Node";

class TTTNode extends Node {

	constructor( index, field = [[ 9, 9, 9 ], [ 9, 9, 9 ], [ 9, 9, 9 ]] ) {

		super( index );
		this.field = field;
		//9 empty, 1 player 1, 2 player 2
		this.filled = this.countFilledFields();
		this.value = 999999999;
		this.winPlayer = this.win();
		this.isWin = ( this.winPlayer !== - 1 );

	}

	countFilledFields() {

		let count = 0;

		for ( let i = 0; i < 3; i ++ ) {

			for ( let j = 0; j < 3; j ++ ) {

				if ( this.field[ i ][ j ] !== 9 ) {

					count ++;

				}

			}

		}
		return count;

	}

	countEmptyFields() {

		return 9 - this.countFilledFields();

	}

	setValue() {

		let s = "";
		for ( let i = 0; i < 3; i ++ ) {

			for ( let j = 0; j < 3; j ++ ) {

				if ( this.field[ i ][ j ] !== 9 ) {

					const x = this.field[ i ][ j ];
					s = s + x;

				} else {

					s = s + "9";

				}

			}

		}
		this.value = parseInt( s, 10 );

	}

	getNextTurn( x, y, player ) {

		const array = [ new Array( 3 ), new Array( 3 ), new Array( 3 ) ];
		for ( let i = 0; i < 3; i ++ ) {

			for ( let j = 0; j < 3; j ++ ) {

				array[ i ][ j ] = this.field[ i ][ j ];

			}

		}
		array[ x ][ y ] = player;
		return array;

	}

	print() {

		let s = "";

		for ( let i = 0; i < 3; i ++ ) {

			s = s + '[';

			for ( let j = 0; j < 3; j ++ ) {

				if ( this.field[ i ][ j ] === 9 ) {

					s = s + " ";

				} else {

					s = s + this.field[ i ][ j ];

				}

			}
			s = s + ']\n';

		}
		console.log( s );

	}



	win() {

		//horizontal
		if ( [ this.field[ 0 ][ 0 ], this.field[ 0 ][ 1 ], this.field[ 0 ][ 2 ] ].every( condition ) ) {

			return this.field[ 0 ][ 0 ];

		}

		if ( [ this.field[ 1 ][ 0 ], this.field[ 1 ][ 1 ], this.field[ 1 ][ 2 ] ].every( condition ) ) {

			return this.field[ 1 ][ 0 ];

		}
		if ( [ this.field[ 2 ][ 0 ], this.field[ 2 ][ 1 ], this.field[ 2 ][ 2 ] ].every( condition ) ) {

			return this.field[ 2 ][ 0 ];

		}
		//vertical
		if ( [ this.field[ 0 ][ 0 ], this.field[ 1 ][ 0 ], this.field[ 2 ][ 0 ] ].every( condition ) ) {

			return this.field[ 0 ][ 0 ];

		}
		if ( [ this.field[ 0 ][ 1 ], this.field[ 1 ][ 1 ], this.field[ 2 ][ 1 ] ].every( condition ) ) {

			return this.field[ 0 ][ 1 ];

		}
		if ( [ this.field[ 0 ][ 2 ], this.field[ 1 ][ 2 ], this.field[ 2 ][ 2 ] ].every( condition ) ) {

			return this.field[ 0 ][ 2 ];

		}
		//diagonal
		if ( [ this.field[ 0 ][ 0 ], this.field[ 1 ][ 1 ], this.field[ 2 ][ 2 ] ].every( condition ) ) {

			return this.field[ 0 ][ 0 ];

		}
		if ( [ this.field[ 2 ][ 0 ], this.field[ 1 ][ 1 ], this.field[ 0 ][ 2 ] ].every( condition ) ) {

			return this.field[ 0 ][ 2 ];

		}

		return - 1;

	}

}

function condition( v, i, a ) {

	return (
		a[ i ] === a[ 0 ] &&
		a[ i ] !== 9
	);

}

export { TTTNode };
