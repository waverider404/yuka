/**
 * @author robp94 / https://github.com/robp94
 */

import { Graph } from "./core/Graph";
import { TTTNode } from "./TTTNode";
import { TTTEdge } from "./TTTEdge";

class TTTGraph extends Graph {

	constructor() {

		super();
		this.lookUp = new Map();
		this.currentNode = - 1;
		this.nextNode = 0;
		this.digraph = true;
		this.nodesFind = [];
		this.arrayTurn = [];
		this.init( 1 );

	}

	init( firstPlayer ) {

		const node = new TTTNode( this.nextNode ++ );
		this.addNode( node );
		this.initRec( node.index, firstPlayer, 0 );

	}
	addNode( node ) {

		node.setValue();
		this.lookUp.set( node.value, node.index );
		return super.addNode( node );

	}

	initRec( preNodeIndex, activePlayer, count ) {

		const preNode = this.getNode( preNodeIndex );

		for ( let i = 0; i < 3; i ++ ) {

			for ( let j = 0; j < 3; j ++ ) {

				if ( typeof preNode.field[ i ][ j ] === "undefined" ) {

					const nextField = preNode.getNextTurn( i, j, activePlayer );
					let activeNode = this.findNode( nextField );
					if ( activeNode === - 1 ) {

						const node = new TTTNode( this.nextNode ++, nextField );
						this.addNode( node );
						activeNode = node.index;
						const edge = new TTTEdge( preNodeIndex, activeNode, i, j, activePlayer );
						this.addEdge( edge );
						if ( count < 8 ) {

							this.initRec( activeNode, ( activePlayer % 2 ) + 1, count + 1 );

						}

					} else {

						const edge = new TTTEdge( preNodeIndex, activeNode, i, j, activePlayer );
						this.addEdge( edge );

					}

				}

			}

		}

	}

	findNode( array ) {

		const value = this.fieldToValue( array );
		const node = this.lookUp.get( value );
		if ( typeof node === "undefined" ) {

			return - 1;

		} else {

			return node;

		}

	}

	fieldToValue( field ) {

		let s = "";
		for ( let i = 0; i < 3; i ++ ) {

			for ( let j = 0; j < 3; j ++ ) {

				if ( typeof field[ i ][ j ] !== 'undefined' ) {

					const x = field[ i ][ j ];
					s = s + x;

				} else {

					s = s + "9";

				}

			}

		}
		return parseInt( s, 10 );

	}

	turn( x, y, player ) {

		this.arrayTurn = [];
		this.getEdgesOfNode( this.currentNode, this.arrayTurn );
		for ( let i = 0; i < this.arrayTurn.length; i ++ ) {

			const edge = this.arrayTurn[ i ];
			if ( edge.x === x && edge.y === y && edge.player === player ) {

				this.currentNode = edge.to;
				break;

			}

		}

	}

}
export { TTTGraph };
