/**
 * @author robp94 / https://github.com/robp94
 */
import { Edge } from "./core/Edge";

class TTTEdge extends Edge {

	constructor( from, to, x, y, player ) {

		super( from, to );
		this.x = x;
		this.y = y;
		this.player = player;

	}

}

export { TTTEdge };
