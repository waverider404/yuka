/**
 * @author robp94 / https://github.com/robp94
 */

import { Node } from '../../../../build/yuka.module.js';

class TTTNode extends Node {


	// x	x	x 	0	1	2
	// x	x	x	3	4	5
	// x	x	x	6	7	8

	constructor( index, field = [ 9, 9, 9, 9, 9, 9, 9, 9, 9 ] ) {

		super( index );
		this.field = field;
		//9 empty, 1 player 1, 2 player 2
		this.filled = this.countFilledFields();
		this.value = 999999999;// number representation of the field for faster comparision
		this.winPlayer = this.win(); //which player wins with this node if there is none -1
		this.isWin = ( this.winPlayer !== - 1 );

		this.weight = 1;

	}

	countFilledFields() {

		// refactor to bool if there are still moves possible

		let count = 0;

		for ( let i = 0; i < 9; i ++ ) {

			if ( this.field[ i ] !== 9 ) {

				count ++;

			}

		}
		return count;

	}

	setValue() {

		let s = this.field.join( "" );
		this.value = parseInt( s, 10 );

	}

	getNextTurn( cell, player ) {

		const array = new Array( 9 );
		for ( let i = 0; i < 9; i ++ ) {

			array[ i ] = this.field[ i ];

		}
		array[ cell ] = player;
		return array;

	}

	win() {

		//all win conditions
		//horizontal
		if ( [ this.field[ 0 ], this.field[ 1 ], this.field[ 2 ] ].every( condition ) ) {

			return this.field[ 0 ];

		}

		if ( [ this.field[ 3 ], this.field[ 4 ], this.field[ 5 ] ].every( condition ) ) {

			return this.field[ 3 ];

		}
		if ( [ this.field[ 6 ], this.field[ 7 ], this.field[ 8 ] ].every( condition ) ) {

			return this.field[ 6 ];

		}
		//vertical
		if ( [ this.field[ 0 ], this.field[ 3 ], this.field[ 6 ] ].every( condition ) ) {

			return this.field[ 0 ];

		}
		if ( [ this.field[ 1 ], this.field[ 4 ], this.field[ 7 ] ].every( condition ) ) {

			return this.field[ 1 ];

		}
		if ( [ this.field[ 2 ], this.field[ 5 ], this.field[ 8 ] ].every( condition ) ) {

			return this.field[ 2 ];

		}
		//diagonal
		if ( [ this.field[ 0 ], this.field[ 4 ], this.field[ 8 ] ].every( condition ) ) {

			return this.field[ 0 ];

		}
		if ( [ this.field[ 6 ], this.field[ 4 ], this.field[ 2 ] ].every( condition ) ) {

			return this.field[ 6 ];

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