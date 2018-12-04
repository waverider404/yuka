/**
 * @author robp94 / https://github.com/robp94
 */

import { Node } from "./core/Node";

class TTTNode extends Node {

	constructor( index, field = [ new Array( 3 ), new Array( 3 ), new Array( 3 ) ] ) {

		super( index );
		this.field = field;
		//undefined empty, 0 player 1, 1 player 2
		this.filled = this.countFilledFields();
		this.value = 999999999;

	}

	countFilledFields() {

		let count = 0;

		for ( let i = 0; i < 3; i ++ ) {

			for ( let j = 0; j < 3; j ++ ) {

				if ( typeof this.field[ i ][ j ] !== "undefined" ) {

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

				if ( typeof this.field[ i ][ j ] !== 'undefined' ) {

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

				if ( typeof this.field[ i ][ j ] === "undefined" ) {

					s = s + " ";

				} else {

					s = s + this.field[ i ][ j ];

				}

			}
			s = s + ']\n';

		}
		console.log( s );

	}

}

export { TTTNode };
