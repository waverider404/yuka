import { Edge } from "../core/Edge";
import { DFS } from "./DFS";

/**
 * @author robp94 / https://github.com/robp94
 */
class DFSExtended extends DFS {

	constructor( graph, source, targetCondition ) {

		super( graph, source );
		this.targetCondition = targetCondition;//Function: node -> boolean

	}

	/**
	 * Executes the graph search. If the search was successful, {@link DFS#found}
	 * is set to true.
	 *
	 * @return {DFSExtended} A reference to this DFSExtended object.
	 */
	search() {

		// create a stack(LIFO) of edges, done via an array

		const stack = new Array();
		const outgoingEdges = new Array();

		// create a dummy edge and put on the stack to begin the search

		const startEdge = new Edge( this.source, this.source );

		stack.push( startEdge );

		// while there are edges in the stack keep searching

		while ( stack.length > 0 ) {

			// grab the next edge and remove it from the stack

			const nextEdge = stack.pop();

			// make a note of the parent of the node this edge points to

			this._route.set( nextEdge.to, nextEdge.from );

			// and mark it visited

			this._visited.add( nextEdge.to );

			// expand spanning tree

			if ( nextEdge !== startEdge ) {

				this._spanningTree.add( nextEdge );

			}

			// if the target has been found the method can return success

			if ( this.checkCondition( nextEdge.to ) ) {

				this.found = true;
				this.target = nextEdge.to;

				return this;

			}

			// determine outgoing edges

			this.graph.getEdgesOfNode( nextEdge.to, outgoingEdges );

			// push the edges leading from the node this edge points to onto the
			// stack (provided the edge does not point to a previously visited node)

			for ( let i = 0, l = outgoingEdges.length; i < l; i ++ ) {

				const edge = outgoingEdges[ i ];

				if ( this._visited.has( edge.to ) === false ) {

					stack.push( edge );

				}

			}

		}

		this.found = false;

		return this;

	}

	checkCondition( nodeIndex ) {

		const node = this.graph.getNode( nodeIndex );
		return this.targetCondition( node );

	}

}
export { DFSExtended };
