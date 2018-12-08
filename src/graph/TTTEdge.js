/**
 * @author robp94 / https://github.com/robp94
 */
import { Edge } from "./core/Edge";

class TTTEdge extends Edge {

	constructor( from, to, cell, player ) {

		super( from, to );
		this.cell = cell;
		this.player = player;

	}

}

export { TTTEdge };
