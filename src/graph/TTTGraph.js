/**
 * @author robp94 / https://github.com/robp94
 */

import { Graph } from "./core/Graph";
import { TTTNode } from "./TTTNode";
import { TTTEdge } from "./TTTEdge";
import { DFSExtended } from "./search/DFSExtended";

class TTTGraph extends Graph {

	constructor( humanPlayer = 1 ) {

		super();
		this.digraph = true;

		this.lookUp = new Map(); //store node value and node id for fast lookup
		this.currentNode = - 1;
		this.nextNode = 0;

		this.arrayTurn = [];
		this.currentPlayer = 1;
		this.kiIsSimple = true;
		this.kiPlayer = this.nextPlayer( humanPlayer );


		this.init( );

	}

	init( ) {

		const node = new TTTNode( this.nextNode ++ );
		this.addNode( node );
		this.initRec( node.index, this.currentPlayer, 0 );
		this.currentNode = node.index;

	}
	addNode( node ) {

		node.setValue();
		this.lookUp.set( node.value, node.index );
		return super.addNode( node );

	}

	initRec( preNodeIndex, activePlayer, count ) {

		const preNode = this.getNode( preNodeIndex );

		for ( let i = 0; i < 9; i ++ ) {

			if ( preNode.field[ i ] === 9 ) {

				const nextField = preNode.getNextTurn( i, activePlayer );
				let activeNode = this.findNode( nextField );
				if ( activeNode === - 1 ) {

					const node = new TTTNode( this.nextNode ++, nextField );
					this.addNode( node );
					activeNode = node.index;
					const edge = new TTTEdge( preNodeIndex, activeNode, i, activePlayer );
					this.addEdge( edge );
					if ( ! node.isWin && count < 8 ) {

						this.initRec( activeNode, this.nextPlayer( activePlayer ), count + 1 );

					}

				} else {

					const edge = new TTTEdge( preNodeIndex, activeNode, i, activePlayer );
					this.addEdge( edge );
					this.getNode( activeNode ).weight ++;

				}

			}

		}

	}

	kiTurn() {

		if ( this.kiIsSimple ) {

			const nodeIndex = this.dfs();

			if ( nodeIndex !== - 1 ) {

				const edge = this.getEdge( this.currentNode, nodeIndex );
				const cell = edge.cell;
				this.turn( cell, this.kiPlayer );

			} else {

				//pick random
				this.turn( this.kiPickRandom(), this.kiPlayer );

			}

		} else {
			//something else count wins per path and use best

			//make sure don't lose next turn if possible ?lookup more than one turn?
			//find node with highest win rate oder draw rate
		}

	}

	kiPickRandom() {

		const node = this.getNode( this.currentNode );
		for ( let i = 0; i < 9; i ++ ) {

			if ( node.field[ i ] === 9 ) {

				return i;

			}

		}

	}

	dfs() {

		const dfseWin = new DFSExtended( this, this.currentNode, targetConditionWin.bind( this ) );
		dfseWin.search();
		if ( dfseWin.found ) {

			const path = dfseWin.getPath();
			return path[ 1 ];

		} else {

			const dfseDraw = new DFSExtended( this, this.currentNode, targetConditionDraw.bind( this ) );
			dfseDraw.search();
			if ( dfseDraw.found ) {

				const path2 = dfseDraw.getPath();
				return path2[ 1 ];

			}

			return - 1;

		}


	}

	nextPlayer( currentPlayer ) {

		return ( currentPlayer % 2 ) + 1;

	}

	findNode( array ) {

		const value = this.fieldToValue( array );
		const node = this.lookUp.get( value );
		if ( typeof node === 'undefined' ) {

			return - 1;

		} else {

			return node;

		}

	}

	fieldToValue( field ) {

		let s = "";
		for ( let i = 0; i < 9; i ++ ) {

			if ( field[ i ] !== 9 ) {

				const x = field[ i ];
				s = s + x;

			} else {

				s = s + "9";

			}

		}

		return parseInt( s, 10 );

	}

	turn( cell, player ) {

		this.arrayTurn = [];
		this.getEdgesOfNode( this.currentNode, this.arrayTurn );
		for ( let i = 0; i < this.arrayTurn.length; i ++ ) {

			const edge = this.arrayTurn[ i ];
			if ( edge.cell == cell && edge.player === player ) {

				this.currentNode = edge.to;
				this.currentPlayer = this.nextPlayer( player );
				break;

			}

		}

	}

}
function targetConditionWin( node ) {

	return node.isWin && node.winPlayer === this.kiPlayer;

}

function targetConditionDraw( node ) {

	return ! node.isWin && node.filled === 9;

}

export { TTTGraph };
