(function () {
	'use strict';

	/**
	 * @author Mugen87 / https://github.com/Mugen87
	 *
	 * Reference: https://github.com/mrdoob/three.js/blob/master/src/math/Math.js
	 *
	 */

	const _Math = {

		clamp: ( value, min, max ) => {

			return Math.max( min, Math.min( max, value ) );

		},

		randFloat: ( min, max ) => {

			return min + Math.random() * ( max - min );

		},

		area( a, b, c ) {

			return ( ( c.x - a.x ) * ( b.z - a.z ) ) - ( ( b.x - a.x ) * ( c.z - a.z ) );

		}

	};

	/**
	 * @author Mugen87 / https://github.com/Mugen87
	 *
	 * Reference: https://github.com/mrdoob/three.js/blob/master/src/math/Vector3.js
	 *
	 */

	class Vector3 {

		constructor( x = 0, y = 0, z = 0 ) {

			this.x = x;
			this.y = y;
			this.z = z;

		}

		set( x, y, z ) {

			this.x = x;
			this.y = y;
			this.z = z;

			return this;

		}

		copy( v ) {

			this.x = v.x;
			this.y = v.y;
			this.z = v.z;

			return this;

		}

		clone() {

			return new this.constructor().copy( this );

		}

		add( v ) {

			this.x += v.x;
			this.y += v.y;
			this.z += v.z;

			return this;

		}

		addScalar( s ) {

			this.x += s;
			this.y += s;
			this.z += s;

			return this;

		}

		addVectors( a, b ) {

			this.x = a.x + b.x;
			this.y = a.y + b.y;
			this.z = a.z + b.z;

			return this;

		}

		sub( v ) {

			this.x -= v.x;
			this.y -= v.y;
			this.z -= v.z;

			return this;

		}

		subScalar( s ) {

			this.x -= s;
			this.y -= s;
			this.z -= s;

			return this;

		}

		subVectors( a, b ) {

			this.x = a.x - b.x;
			this.y = a.y - b.y;
			this.z = a.z - b.z;

			return this;

		}

		multiply( v ) {

			this.x *= v.x;
			this.y *= v.y;
			this.z *= v.z;

			return this;

		}

		multiplyScalar( s ) {

			this.x *= s;
			this.y *= s;
			this.z *= s;

			return this;

		}

		multiplyVectors( a, b ) {

			this.x = a.x * b.x;
			this.y = a.y * b.y;
			this.z = a.z * b.z;

			return this;

		}

		divide( v ) {

			this.x /= v.x;
			this.y /= v.y;
			this.z /= v.z;

			return this;

		}

		divideScalar( s ) {

			this.x /= s;
			this.y /= s;
			this.z /= s;

			return this;

		}

		divideVectors( a, b ) {

			this.x = a.x / b.x;
			this.y = a.y / b.y;
			this.z = a.z / b.z;

			return this;

		}

		clamp( min, max ) {

			this.x = Math.max( min.x, Math.min( max.x, this.x ) );
			this.y = Math.max( min.y, Math.min( max.y, this.y ) );
			this.z = Math.max( min.z, Math.min( max.z, this.z ) );

			return this;

		}

		min( v ) {

			this.x = Math.min( this.x, v.x );
			this.y = Math.min( this.y, v.y );
			this.z = Math.min( this.z, v.z );

			return this;

		}

		max( v ) {

			this.x = Math.max( this.x, v.x );
			this.y = Math.max( this.y, v.y );
			this.z = Math.max( this.z, v.z );

			return this;

		}

		dot( v ) {

			return ( this.x * v.x ) + ( this.y * v.y ) + ( this.z * v.z );

		}

		cross( v ) {

			const x = this.x, y = this.y, z = this.z;

			this.x = ( y * v.z ) - ( z * v.y );
			this.y = ( z * v.x ) - ( x * v.z );
			this.z = ( x * v.y ) - ( y * v.x );

			return this;

		}

		crossVectors( a, b ) {

			const ax = a.x, ay = a.y, az = a.z;
			const bx = b.x, by = b.y, bz = b.z;

			this.x = ( ay * bz ) - ( az * by );
			this.y = ( az * bx ) - ( ax * bz );
			this.z = ( ax * by ) - ( ay * bx );

			return this;

		}

		angleTo( v ) {

			const theta = this.dot( v ) / ( Math.sqrt( this.squaredLength() * v.squaredLength() ) );

			// clamp, to handle numerical problems

			return Math.acos( _Math.clamp( theta, - 1, 1 ) );

		}

		length() {

			return Math.sqrt( this.squaredLength() );

		}

		squaredLength() {

			return this.dot( this );

		}

		manhattanLength() {

			return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z );

		}

		distanceTo( v ) {

			return Math.sqrt( this.squaredDistanceTo( v ) );

		}

		squaredDistanceTo( v ) {

			const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;

			return ( dx * dx ) + ( dy * dy ) + ( dz * dz );

		}

		manhattanDistanceTo( v ) {

			const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;

			return Math.abs( dx ) + Math.abs( dy ) + Math.abs( dz );

		}

		normalize() {

			return this.divideScalar( this.length() || 1 );

		}

		applyMatrix4( m ) {

			const x = this.x, y = this.y, z = this.z;
			const e = m.elements;

			const w = 1 / ( ( e[ 3 ] * x ) + ( e[ 7 ] * y ) + ( e[ 11 ] * z ) + e[ 15 ] );

			this.x = ( ( e[ 0 ] * x ) + ( e[ 4 ] * y ) + ( e[ 8 ] * z ) + e[ 12 ] ) * w;
			this.y = ( ( e[ 1 ] * x ) + ( e[ 5 ] * y ) + ( e[ 9 ] * z ) + e[ 13 ] ) * w;
			this.z = ( ( e[ 2 ] * x ) + ( e[ 6 ] * y ) + ( e[ 10 ] * z ) + e[ 14 ] ) * w;

			return this;

		}

		applyRotation( q ) {

			const x = this.x, y = this.y, z = this.z;
			const qx = q.x, qy = q.y, qz = q.z, qw = q.w;

			// calculate quat * vector

			const ix = qw * x + qy * z - qz * y;
			const iy = qw * y + qz * x - qx * z;
			const iz = qw * z + qx * y - qy * x;
			const iw = - qx * x - qy * y - qz * z;

			// calculate result * inverse quat

			this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
			this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
			this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

			return this;

		}

		fromMatrix3Column( m, i ) {

			return this.fromArray( m.elements, i * 3 );

		}

		fromMatrix4Column( m, i ) {

			return this.fromArray( m.elements, i * 4 );

		}

		fromSpherical( radius, phi, theta ) {

			const sinPhiRadius = Math.sin( phi ) * radius;

			this.x = sinPhiRadius * Math.sin( theta );
			this.y = Math.cos( phi ) * radius;
			this.z = sinPhiRadius * Math.cos( theta );

			return this;

		}

		fromArray( array, offset = 0 ) {

			this.x = array[ offset + 0 ];
			this.y = array[ offset + 1 ];
			this.z = array[ offset + 2 ];

			return this;

		}

		toArray( array, offset = 0 ) {

			array[ offset + 0 ] = this.x;
			array[ offset + 1 ] = this.y;
			array[ offset + 2 ] = this.z;

			return array;

		}

		equals( v ) {

			return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );

		}

	}

	/**
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	class Graph {

		constructor() {

			this.digraph = false;

			this._nodes = new Map();
			this._edges = new Map(); // adjacency list for each node

		}

		addNode( node ) {

			const index = node.index;

			this._nodes.set( index, node );
			this._edges.set( index, new Array() );

			return this;

		}

		addEdge( edge ) {

			let edges;

			edges = this._edges.get( edge.from );
			edges.push( edge );

			if ( this.digraph === false ) {

				const oppositeEdge = edge.clone();

				oppositeEdge.from = edge.to;
				oppositeEdge.to = edge.from;

				edges = this._edges.get( edge.to );
				edges.push( oppositeEdge );

			}

			return this;

		}

		getNode( index ) {

			return this._nodes.get( index ) || null;

		}

		getEdge( from, to ) {

			if ( this.hasNode( from ) && this.hasNode( to ) ) {

				const edges = this._edges.get( from );

				for ( let i = 0, l = edges.length; i < l; i ++ ) {

					const edge = edges[ i ];

					if ( edge.to === to ) {

						return edge;

					}

				}

			}

			return null;

		}

		getNodes( result ) {

			result.length = 0;
			result.push( ...this._nodes.values() );

			return this;

		}

		getEdgesOfNode( index, result ) {

			const edges = this._edges.get( index );

			if ( edges !== undefined ) {

				result.length = 0;
				result.push( ...edges );

			}

			return this;

		}

		getNodeCount() {

			return this._nodes.size;

		}

		getEdgeCount() {

			let count = 0;

			for ( const edges of this._edges.values() ) {

				count += edges.length;

			}

			return count;

		}

		removeNode( node ) {

			this._nodes.delete( node.index );

			if ( this.digraph === false ) {

				// if the graph is not directed, remove all edges leading to this node

				const edges = this._edges.get( node.index );

				for ( const edge of edges ) {

					const edgesOfNeighbor = this._edges.get( edge.to );

					for ( let i = ( edgesOfNeighbor.length - 1 ); i >= 0; i -- ) {

						const edgeNeighbor = edgesOfNeighbor[ i ];

						if ( edgeNeighbor.to === node.index ) {

							const index = edgesOfNeighbor.indexOf( edgeNeighbor );
							edgesOfNeighbor.splice( index, 1 );

							break;

						}

					}

				}

			} else {

				// if the graph is directed, remove the edges the slow way

				for ( const edges of this._edges.values() ) {

					for ( let i = ( edges.length - 1 ); i >= 0; i -- ) {

						const edge = edges[ i ];

						if ( ! this.hasNode( edge.to ) || ! this.hasNode( edge.from ) ) {

							const index = edges.indexOf( edge );
							edges.splice( index, 1 );

						}

					}

				}

			}

			// delete edge list of node (edges leading from this node)

			this._edges.delete( node.index );

			return this;

		}

		removeEdge( edge ) {

			// delete the edge from the node's edge list

			const edges = this._edges.get( edge.from );

			if ( edges !== undefined ) {

				const index = edges.indexOf( edge );
				edges.splice( index, 1 );

				// if the graph is not directed, delete the edge connecting the node in the opposite direction

				if ( this.digraph === false ) {

					const edges = this._edges.get( edge.to );

					for ( let i = 0, l = edges.length; i < l; i ++ ) {

						const e = edges[ i ];

						if ( e.to === edge.from ) {

							const index = edges.indexOf( e );
							edges.splice( index, 1 );
							break;

						}

					}

				}

			}

			return this;

		}

		hasNode( index ) {

			return this._nodes.has( index );

		}

		hasEdge( from, to ) {

			if ( this.hasNode( from ) && this.hasNode( to ) ) {

				const edges = this._edges.get( from );

				for ( let i = 0, l = edges.length; i < l; i ++ ) {

					const edge = edges[ i ];

					if ( edge.to === to ) {

						return true;

					}

				}

				return false;

			} else {

				return false;

			}

		}

		clear() {

			this._nodes.clear();
			this._edges.clear();

			return this;

		}

	}

	/**
	 * @author Mugen87 / https://github.com/Mugen87
	 *
	 * binary heap priority queue (see https://github.com/mourner/tinyqueue)
	 */

	class PriorityQueue {

		constructor( compare = defaultCompare ) {

			this.data = new Array();
			this.length = 0;
			this.compare = compare;

		}

		push( item ) {

			this.data.push( item );
			this.length ++;
			this._up( this.length - 1 );

		}

		pop() {

			if ( this.length === 0 ) return null;

			const top = this.data[ 0 ];
			this.length --;

			if ( this.length > 0 ) {

				this.data[ 0 ] = this.data[ this.length ];
				this._down( 0 );

			}

			this.data.pop();

			return top;

		}

		peek() {

			return this.data[ 0 ] || null;

		}

		_up( index ) {

			const data = this.data;
			const compare = this.compare;
			const item = data[ index ];

			while ( index > 0 ) {

				const parent = ( index - 1 ) >> 1;
				const current = data[ parent ];
				if ( compare( item, current ) >= 0 ) break;
				data[ index ] = current;
				index = parent;

			}

			data[ index ] = item;

		}

		_down( index ) {

			const data = this.data;
			const compare = this.compare;
			const item = data[ index ];
			const halfLength = this.length >> 1;

			while ( index < halfLength ) {

				let left = ( index << 1 ) + 1;
				let right = left + 1;
				let best = data[ left ];

				if ( right < this.length && compare( data[ right ], best ) < 0 ) {

					left = right;
					best = data[ right ];

				}

				if ( compare( best, item ) >= 0 ) break;

				data[ index ] = best;
				index = left;

			}


			data[ index ] = item;

		}

	}

	/* istanbul ignore next */

	function defaultCompare( a, b ) {

		return ( a < b ) ? - 1 : ( a > b ) ? 1 : 0;

	}

	/**
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	class HeuristicPolicyEuclid {

		static calculate( graph, source, target ) {

			const sourceNode = graph.getNode( source );
			const targetNode = graph.getNode( target );

			return sourceNode.position.distanceTo( targetNode.position );

		}

	}

	/**
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	class AStar {

		constructor( graph = null, source = - 1, target = - 1 ) {

			this.graph = graph;
			this.source = source;
			this.target = target;
			this.heuristic = HeuristicPolicyEuclid;
			this.found = false;

			this._cost = new Map(); // contains the "real" accumulative cost to a node
			this._shortestPathTree = new Map();
			this._searchFrontier = new Map();

		}

		search() {

			const outgoingEdges = new Array();
			const pQueue = new PriorityQueue( compare );

			pQueue.push( {
				cost: 0,
				index: this.source
			} );

			// while the queue is not empty

			while ( pQueue.length > 0 ) {

				const nextNode = pQueue.pop();
				const nextNodeIndex = nextNode.index;

				// if the shortest path tree has the given node, we already found the shortest
				// path to this particular one

				if ( this._shortestPathTree.has( nextNodeIndex ) ) continue;

				// move this edge from the frontier to the shortest path tree

				if ( this._searchFrontier.has( nextNodeIndex ) === true ) {

					this._shortestPathTree.set( nextNodeIndex, this._searchFrontier.get( nextNodeIndex ) );

				}

				// if the target has been found exit

				if ( nextNodeIndex === this.target ) {

					this.found = true;

					return this;

				}

				// now relax the edges

				this.graph.getEdgesOfNode( nextNodeIndex, outgoingEdges );

				for ( let i = 0, l = outgoingEdges.length; i < l; i ++ ) {

					const edge = outgoingEdges[ i ];

					// A* cost formula : F = G + H

					// G is the cumulative cost to reach a node

					const G = ( this._cost.get( nextNodeIndex ) || 0 ) + edge.cost;

					// H is the heuristic estimate of the distance to the target

					const H = this.heuristic.calculate( this.graph, edge.to, this.target );

					// F is the sum of G and H

					const F = G + H;

					// We enhance our search frontier in two cases:
					// 1. If the node was never on the search frontier
					// 2. If the cost to this node is better than before

					if ( ( this._searchFrontier.has( edge.to ) === false ) || G < ( this._cost.get( edge.to ) ) ) {

						this._cost.set( edge.to, G );

						this._searchFrontier.set( edge.to, edge );

						pQueue.push( {
							cost: F,
							index: edge.to
						} );

					}

				}

			}

			this.found = false;

			return this;

		}

		getPath() {

			// array of node indices that comprise the shortest path from the source to the target

			const path = new Array();

			// just return an empty path if no path to target found or if no target has been specified

			if ( this.found === false || this.target === - 1 ) return path;

			// start with the target of the path

			let currentNode = this.target;

			path.push( currentNode );

			// while the current node is not the source node keep processing

			while ( currentNode !== this.source ) {

				// determine the parent of the current node

				currentNode = this._shortestPathTree.get( currentNode ).from;

				// push the new current node at the beginning of the array

				path.unshift( currentNode );

			}

			return path;

		}

		getSearchTree() {

			return [ ...this._shortestPathTree.values() ];

		}

		clear() {

			this.found = false;

			this._cost.clear();
			this._shortestPathTree.clear();
			this._searchFrontier.clear();

		}

	}


	function compare( a, b ) {

		return ( a.cost < b.cost ) ? - 1 : ( a.cost > b.cost ) ? 1 : 0;

	}

	/**
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	class Node {

		constructor( index = - 1 ) {

			this.index = index;

		}

	}

	/**
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	class NavNode extends Node {

		constructor( index = - 1, position = new Vector3(), userData = {} ) {

			super( index );

			this.position = position;
			this.userData = userData;

		}

	}

	/**
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	class Edge {

		constructor( from = - 1, to = - 1, cost = 0 ) {

			this.from = from;
			this.to = to;
			this.cost = cost;

		}

		copy( source ) {

			this.from = source.from;
			this.to = source.to;
			this.cost = source.cost;

			return this;

		}

		clone() {

			return new this.constructor().copy( this );

		}

	}

	/**
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	class NavEdge extends Edge {

		constructor( from = - 1, to = - 1, cost = 0 ) {

			super( from, to, cost );

		}

	}

	/**
	 * @author Mugen87 / https://github.com/Mugen87
	 *
	 * Reference: https://github.com/mrdoob/three.js/blob/master/src/math/Line3.js
	 *
	 */

	const p1 = new Vector3();
	const p2 = new Vector3();

	class LineSegment {

		constructor( from = new Vector3(), to = new Vector3() ) {

			this.from = from;
			this.to = to;

		}

		set( from, to ) {

			this.from = from;
			this.to = to;

			return this;

		}

		copy( lineSegment ) {

			this.from.copy( lineSegment.from );
			this.to.copy( lineSegment.to );

			return this;

		}

		clone() {

			return new this.constructor().copy( this );

		}

		delta( result ) {

			return result.subVectors( this.to, this.from );

		}

		at( t, result ) {

			return this.delta( result ).multiplyScalar( t ).add( this.from );

		}

		closestPointToPoint( point, clampToLine, result ) {

			const t = this.closestPointToPointParameter( point, clampToLine );

			return this.at( t, result );

		}

		closestPointToPointParameter( point, clampToLine = true ) {

			p1.subVectors( point, this.from );
			p2.subVectors( this.to, this.from );

			const dotP2P2 = p2.dot( p2 );
			const dotP2P1 = p2.dot( p1 );

			let t = dotP2P1 / dotP2P2;

			if ( clampToLine ) t = _Math.clamp( t, 0, 1 );

			return t;

		}

		equals( lineSegment ) {

			return lineSegment.from.equals( this.from ) && lineSegment.to.equals( this.to );

		}

	}

	/**
	 * @author robp94 / https://github.com/robp94
	 * @author Mugen87 / https://github.com/Mugen8
	 *
	 * Reference: https://github.com/donmccurdy/three-pathfinding/blob/master/src/Channel.js
	 *
	 */

	class Corridor {

		constructor() {

			this.portalEdges = new Array();

		}

		push( left, right ) {

			this.portalEdges.push( {
				left: left,
				right: right
			} );

		}

		generate() {

			const portalEdges = this.portalEdges;
			const path = new Array();

			// init scan state

			let portalApex, portalLeft, portalRight;
			let apexIndex = 0, leftIndex = 0, rightIndex = 0;

			portalApex = portalEdges[ 0 ].left;
			portalLeft = portalEdges[ 0 ].left;
			portalRight = portalEdges[ 0 ].right;

			// add start point

			path.push( portalApex );

			for ( let i = 1, l = portalEdges.length; i < l; i ++ ) {

				const left = portalEdges[ i ].left;
				const right = portalEdges[ i ].right;

				// update right vertex

				if ( _Math.area( portalApex, portalRight, right ) <= 0.0 ) {

					if ( portalApex === portalRight || _Math.area( portalApex, portalLeft, right ) > 0.0 ) {

						// tighten the funnel

						portalRight = right;
						rightIndex = i;

					} else {

						// right over left, insert left to path and restart scan from portal left point

						path.push( portalLeft );

						// make current left the new apex

						portalApex = portalLeft;
						apexIndex = leftIndex;

						// review eset portal

						portalLeft = portalApex;
						portalRight = portalApex;
						leftIndex = apexIndex;
						rightIndex = apexIndex;

						// restart scan

						i = apexIndex;

						continue;

					}

				}

				// update left vertex

				if ( _Math.area( portalApex, portalLeft, left ) >= 0.0 ) {

					if ( portalApex === portalLeft || _Math.area( portalApex, portalRight, left ) < 0.0 ) {

						// tighten the funnel

						portalLeft = left;
						leftIndex = i;

					} else {

						// left over right, insert right to path and restart scan from portal right point

						path.push( portalRight );

						// make current right the new apex

						portalApex = portalRight;
						apexIndex = rightIndex;

						// reset portal

						portalLeft = portalApex;
						portalRight = portalApex;
						leftIndex = apexIndex;
						rightIndex = apexIndex;

						// restart scan

						i = apexIndex;

						continue;

					}

				}

			}

			if ( ( path.length === 0 ) || ( path[ path.length - 1 ] !== portalEdges[ portalEdges.length - 1 ].left ) ) {

				// append last point to path

				path.push( portalEdges[ portalEdges.length - 1 ].left );

			}

			return path;

		}

	}

	/**
	 * @author Mugen87 / https://github.com/Mugen87
	 * @author robp94 / https://github.com/robp94
	 */

	const pointOnLineSegment = new Vector3();
	const closestPoint = new Vector3();
	const edgeDirection = new Vector3();
	const movementDirection = new Vector3();
	const newPosition = new Vector3();
	const lineSegment = new LineSegment();

	class NavMesh {

		constructor() {

			this.graph = new Graph();
			this.graph.digraph = true;

			this.regions = new Array();
			this.spatialIndex = null;

			this.epsilonCoplanarTest = 1e-3;
			this.epsilonContainsTest = 1;

		}

		fromPolygons( polygons ) {

			this.clear();

			//

			const initialEdgeList = new Array();
			const sortedEdgeList = new Array();

			// setup list with all edges

			for ( let i = 0, l = polygons.length; i < l; i ++ ) {

				const polygon = polygons[ i ];

				let edge = polygon.edge;

				do {

					initialEdgeList.push( edge );

					edge = edge.next;

				} while ( edge !== polygon.edge );

				//

				this.regions.push( polygon );

			}

			// setup twin references and sorted list of edges

			for ( let i = 0, il = initialEdgeList.length; i < il; i ++ ) {

				let edge0 = initialEdgeList[ i ];

				if ( edge0.twin !== null ) continue;

				for ( let j = i + 1, jl = initialEdgeList.length; j < jl; j ++ ) {

					let edge1 = initialEdgeList[ j ];

					if ( edge0.from().equals( edge1.to() ) && edge0.to().equals( edge1.from() ) ) {

						// twin found, set references

						edge0.twin = edge1;
						edge1.twin = edge0;

						// add edge to list

						const cost = edge0.squaredLength();

						sortedEdgeList.push( {
							cost: cost,
							edge: edge0
						} );

						// there can only be a single twin

						break;

					}

				}

			}

			sortedEdgeList.sort( descending );

			// hald-edge data structure is now complete, begin build of convex regions

			this._buildRegions( sortedEdgeList );

			// ensure unique node indices for all twin edges

			this._buildNodeIndices();

			// now build the navigation graph

			this._buildGraph();

			return this;

		}

		clear() {

			this.graph.clear();
			this.regions.length = 0;
			this.spatialIndex = null;

			return this;

		}

		getClosestRegion( point ) {

			const regions = this.regions;
			let closesRegion = null;
			let minDistance = Infinity;

			for ( let i = 0, l = regions.length; i < l; i ++ ) {

				const region = regions[ i ];

				const distance = point.squaredDistanceTo( region.centroid );

				if ( distance < minDistance ) {

					minDistance = distance;

					closesRegion = region;

				}

			}

			return closesRegion;

		}

		getRandomRegion() {

			const regions = this.regions;

			let index = Math.floor( Math.random() * ( regions.length ) );

			if ( index === regions.length ) index = regions.length - 1;

			return regions[ index ];

		}

		getRegionForPoint( point, epsilon = 1e-3 ) {

			let regions;

			if ( this.spatialIndex !== null ) {

				const index = this.spatialIndex.getIndexForPosition( point );
				regions = this.spatialIndex.cells[ index ].entries;

			} else {

				regions = this.regions;

			}

			//

			for ( let i = 0, l = regions.length; i < l; i ++ ) {

				const region = regions[ i ];

				if ( region.contains( point, epsilon ) === true ) {

					return region;

				}

			}

			return null;

		}

		findPath( from, to ) {

			const graph = this.graph;
			const path = new Array();

			let fromRegion = this.getRegionForPoint( from, this.epsilonContainsTest );
			let toRegion = this.getRegionForPoint( to, this.epsilonContainsTest );

			if ( fromRegion === null || toRegion === null ) {

				// if source or target are outside the navmesh, choose the nearest convex region

				if ( fromRegion === null ) fromRegion = this.getClosestRegion( from );
				if ( toRegion === null ) toRegion = this.getClosestRegion( to );

			}

			// check if both convex region are identical

			if ( fromRegion === toRegion ) {

				// no search necessary, directly create the path

				path.push( new Vector3().copy( from ) );
				path.push( new Vector3().copy( to ) );
				return path;

			} else {

				// source and target are not in same region, peform search

				const source = this.regions.indexOf( fromRegion );
				const target = this.regions.indexOf( toRegion );

				const astar = new AStar( graph, source, target );
				astar.search();

				if ( astar.found === true ) {

					const polygonPath = astar.getPath();

					const corridor = new Corridor();
					corridor.push( from, from );

					// push sequence of portal edges to corridor

					const portalEdge = { left: null, right: null };

					for ( let i = 0, l = ( polygonPath.length - 1 ); i < l; i ++ ) {

						const region = this.regions[ polygonPath[ i ] ];
						const nextRegion = this.regions[ polygonPath[ i + 1 ] ];

						region.getPortalEdgeTo( nextRegion, portalEdge );

						corridor.push( portalEdge.left, portalEdge.right );

					}

					corridor.push( to, to );

					path.push( ...corridor.generate() );

				}

				return path;

			}

		}

		findPaths( f ) {

			const array = new Array();
			for ( let i = 0, l = f.length; i < l; i += 7 ) {

				array.push( f[ i ] ); // requestId
				const from = new Vector3( f[ i + 1 ], f[ i + 2 ], f[ i + 3 ] );
				const to = new Vector3( f[ i + 4 ], f[ i + 5 ], f[ i + 6 ] );

				const path = this.findPath( from, to );

				array.push( path.length * 3 );
				for ( let j = 0, jl = path.length; j < jl; j ++ ) {

					array.push( path[ j ].x );
					array.push( path[ j ].y );
					array.push( path[ j ].z );


				}

			}
			return array;

		}

		clampMovement( currentRegion, startPosition, endPosition, clampPosition ) {

			let newRegion = this.getRegionForPoint( endPosition, this.epsilonContainsTest );

			// endPosition lies outside navMesh

			if ( newRegion === null ) {

				if ( currentRegion === null ) throw new Error( 'YUKA.NavMesh.clampMovement(): No current region available.' );

				// determine closest edge in current convex region

				let closestEdge = null;
				let minDistance = Infinity;

				let edge = currentRegion.edge;

				do {

					// only consider border edges

					if ( edge.twin === null ) {

						lineSegment.set( edge.vertex, edge.next.vertex );
						const t = lineSegment.closestPointToPointParameter( startPosition );
						lineSegment.at( t, pointOnLineSegment );

						const distance = pointOnLineSegment.squaredDistanceTo( startPosition );

						if ( distance < minDistance ) {

							minDistance = distance;

							closestEdge = edge;
							closestPoint.copy( pointOnLineSegment );

						}

					}

					edge = edge.next;

				} while ( edge !== currentRegion.edge );

				// calculate movement and edge direction

				edgeDirection.subVectors( closestEdge.next.vertex, closestEdge.vertex ).normalize();
				const length = movementDirection.subVectors( endPosition, startPosition ).length();
				movementDirection.divideScalar( length );

				// this value influences the speed at which the entity moves along the edge

				const f = edgeDirection.dot( movementDirection );

				// calculate new position on the edge

				newPosition.copy( closestPoint ).add( edgeDirection.multiplyScalar( f * length ) );

				// the following value "t" tells us if the point exceeds the line segment

				lineSegment.set( closestEdge.vertex, closestEdge.next.vertex );
				const t = lineSegment.closestPointToPointParameter( newPosition, false );

				//

				if ( t >= 0 && t <= 1 ) {

					// point is within line segment, we can safely use the new position

					clampPosition.copy( newPosition );

				} else {

					// check, if the new point lies outside the navMesh

					newRegion = this.getRegionForPoint( newPosition, this.epsilonContainsTest );

					if ( newRegion !== null ) {

						// if not, everything is fine

						clampPosition.copy( newPosition );
						return newRegion;

					}

					// otherwise prevent movement

					clampPosition.copy( startPosition );

				}

				return currentRegion;

			} else {

				// return the new region

				return newRegion;

			}

		}

		updateSpatialIndex() {

			if ( this.spatialIndex !== null ) {

				this.spatialIndex.makeEmpty();

				const regions = this.regions;

				for ( let i = 0, l = regions.length; i < l; i ++ ) {

					const region = regions[ i ];

					this.spatialIndex.addPolygon( region );

				}

			}

			return this;

		}

		_buildRegions( edgeList ) {

			const regions = this.regions;

			const cache = {
				leftPrev: null,
				leftNext: null,
				rightPrev: null,
				rightNext: null
			};

			// process edges from longest to shortest

			for ( let i = 0, l = edgeList.length; i < l; i ++ ) {

				const entry = edgeList[ i ];

				let candidate = entry.edge;

				// cache current references for possible restore

				cache.prev = candidate.prev;
				cache.next = candidate.next;
				cache.prevTwin = candidate.twin.prev;
				cache.nextTwin = candidate.twin.next;

				// temporarily change the first polygon in order to represent both polygons

				candidate.prev.next = candidate.twin.next;
				candidate.next.prev = candidate.twin.prev;
				candidate.twin.prev.next = candidate.next;
				candidate.twin.next.prev = candidate.prev;

				const polygon = candidate.polygon;
				polygon.edge = candidate.prev;

				if ( polygon.convex() === true && polygon.coplanar( this.epsilonCoplanarTest ) === true ) {

					// correct polygon reference of all edges

					let edge = polygon.edge;

					do {

						edge.polygon = polygon;

						edge = edge.next;

					} while ( edge !== polygon.edge );

					// delete obsolete polygon

					const index = regions.indexOf( entry.edge.twin.polygon );
					regions.splice( index, 1 );

				} else {

					// restore

					cache.prev.next = candidate;
					cache.next.prev = candidate;
					cache.prevTwin.next = candidate.twin;
					cache.nextTwin.prev = candidate.twin;

					polygon.edge = candidate;

				}

			}

			//

			for ( let i = 0, l = regions.length; i < l; i ++ ) {

				const region = regions[ i ];

				region.computeCentroid();

			}

		}

		_buildNodeIndices() {

			const regions = this.regions;

			const indicesMap = new Map();
			let nextNodeIndex = 0;

			for ( let i = 0, l = regions.length; i < l; i ++ ) {

				const region = regions[ i ];

				let edge = region.edge;

				do {

					// only edges with a twin reference needs to be considered

					if ( edge.twin !== null && edge.nodeIndex === null ) {

						let nodeIndex = - 1;
						const position = edge.from();

						// check all existing entries

						for ( const [ index, pos ] of indicesMap.entries() ) {

							if ( position.equals( pos ) === true ) {

								// found, use the existing index

								nodeIndex = index;
								break;

							}

						}

						// if no suitable index was found, create a new one

						if ( nodeIndex === - 1 ) {

							nodeIndex = nextNodeIndex ++;
							indicesMap.set( nodeIndex, position );

						}

						// assign unique node index to edge

						edge.nodeIndex = nodeIndex;
						edge.twin.next.nodeIndex = nodeIndex;

					}

					edge = edge.next;

				} while ( edge !== region.edge );

			}

		}

		_buildGraph() {

			const graph = this.graph;
			const regions = this.regions;

			// for each region, the code creates an array of directly accessible node indices

			const regionNeighbourhood = new Array();

			for ( let i = 0, l = regions.length; i < l; i ++ ) {

				const region = regions[ i ];

				const regionIndices = new Array();
				regionNeighbourhood.push( regionIndices );

				let edge = region.edge;
				do {

					if ( edge.twin !== null ) {

						regionIndices.push( this.regions.indexOf( edge.twin.polygon ) );

						// add node to graph if necessary

						if ( graph.hasNode( this.regions.indexOf( edge.polygon ) ) === false ) {

							graph.addNode( new NavNode( this.regions.indexOf( edge.polygon ), edge.polygon.centroid ) );

						}

					}

					edge = edge.next;

				} while ( edge !== region.edge );

			}

			// add navigation edges

			for ( let i = 0, il = regionNeighbourhood.length; i < il; i ++ ) {

				const indices = regionNeighbourhood[ i ];
				const from = i;

				for ( let j = 0, jl = indices.length; j < jl; j ++ ) {

					const to = indices[ j ];

					if ( from !== to ) {

						if ( graph.hasEdge( from, to ) === false ) {

							const nodeFrom = graph.getNode( from );
							const nodeTo = graph.getNode( to );

							const cost = nodeFrom.position.distanceTo( nodeTo.position );

							graph.addEdge( new NavEdge( from, to, cost ) );

						}

					}

				}

			}

			return this;

		}

	}

	//

	function descending( a, b ) {

		return ( a.cost < b.cost ) ? 1 : ( a.cost > b.cost ) ? - 1 : 0;

	}

	/**
	 * @author Mugen87 / https://github.com/Mugen87
	 *
	 * Reference: https://github.com/mrdoob/three.js/blob/master/src/math/Box3.js
	 *
	 */

	const vector = new Vector3();

	class AABB {

		constructor( min = new Vector3( Infinity, Infinity, Infinity ), max = new Vector3( - Infinity, - Infinity, - Infinity ) ) {

			this.min = min;
			this.max = max;

		}

		set( min, max ) {

			this.min = min;
			this.max = max;

			return this;

		}

		copy( aabb ) {

			this.min.copy( aabb.min );
			this.max.copy( aabb.max );

			return this;

		}

		clone() {

			return new this.constructor().copy( this );

		}

		clampPoint( point, result ) {

			result.copy( point ).clamp( this.min, this.max );

			return this;

		}

		containsPoint( point ) {

			return point.x < this.min.x || point.x > this.max.x ||
				point.y < this.min.y || point.y > this.max.y ||
				point.z < this.min.z || point.z > this.max.z ? false : true;

		}

		expand( point ) {

			this.min.min( point );
			this.max.max( point );

			return this;

		}

		intersectsAABB( aabb ) {

			return aabb.max.x < this.min.x || aabb.min.x > this.max.x ||
				aabb.max.y < this.min.y || aabb.min.y > this.max.y ||
				aabb.max.z < this.min.z || aabb.min.z > this.max.z ? false : true;

		}

		intersectsBoundingSphere( sphere ) {

			// find the point on the AABB closest to the sphere center

			this.clampPoint( sphere.center, vector );

			// if that point is inside the sphere, the AABB and sphere intersect.

			return vector.squaredDistanceTo( sphere.center ) <= ( sphere.radius * sphere.radius );

		}

		fromCenterAndSize( center, size ) {

			vector.copy( size ).multiplyScalar( 0.5 ); // compute half size

			this.min.copy( center ).sub( vector );
			this.max.copy( center ).add( vector );

			return this;

		}

		fromPoints( points ) {

			this.min.set( Infinity, Infinity, Infinity );
			this.max.set( - Infinity, - Infinity, - Infinity );

			for ( let i = 0, l = points.length; i < l; i ++ ) {

				this.expand( points[ i ] );

			}

			return this;

		}

		equals( aabb ) {

			return ( aabb.min.equals( this.min ) ) && ( aabb.max.equals( this.max ) );

		}

	}

	/**
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	class Cell {

		constructor( aabb = new AABB() ) {

			this.aabb = aabb;
			this.entries = new Array();

		}

		add( entry ) {

			this.entries.push( entry );

			return this;

		}

		remove( entry ) {

			const index = this.entries.indexOf( entry );
			this.entries.splice( index, 1 );

			return this;

		}

		makeEmpty() {

			this.entries.length = 0;

			return this;

		}

		empty() {

			return this.entries.length === 0;

		}

		intersects( aabb ) {

			return this.aabb.intersectsAABB( aabb );

		}

	}

	/**
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	const clampedPosition = new Vector3();
	const aabb = new AABB();
	const contour = new Array();

	class CellSpacePartitioning {

		constructor( width, height, depth, cellsX, cellsY, cellsZ ) {

			this.cells = new Array();

			this.width = width;
			this.height = height;
			this.depth = depth;

			this.halfWidth = width / 2;
			this.halfHeight = height / 2;
			this.halfDepth = depth / 2;

			this.min = new Vector3( - this.halfWidth, - this.halfHeight, - this.halfDepth );
			this.max = new Vector3( this.halfWidth, this.halfHeight, this.halfDepth );

			this.cellsX = cellsX;
			this.cellsY = cellsY;
			this.cellsZ = cellsZ;

			//

			const cellSizeX = width / cellsX;
			const cellSizeY = height / cellsY;
			const cellSizeZ = depth / cellsZ;

			for ( let i = 0; i < cellsX; i ++ ) {

				const x = ( i * cellSizeX ) - this.halfWidth;

				for ( let j = 0; j < cellsY; j ++ ) {

					const y = ( j * cellSizeY ) - this.halfHeight;

					for ( let k = 0; k < cellsZ; k ++ ) {

						const z = ( k * cellSizeZ ) - this.halfDepth;

						const min = new Vector3();
						const max = new Vector3();

						min.set( x, y, z );

						max.x = min.x + cellSizeX;
						max.y = min.y + cellSizeY;
						max.z = min.z + cellSizeZ;

						const aabb = new AABB( min, max );
						const cell = new Cell( aabb );

						this.cells.push( cell );

					}

				}

			}

		}

		updateEntity( entity, currentIndex = - 1 ) {

			const newIndex = this.getIndexForPosition( entity.position );

			if ( currentIndex !== newIndex ) {

				this.addEntityToPartition( entity, newIndex );

				if ( currentIndex !== - 1 ) {

					this.removeEntityFromPartition( entity, currentIndex );

				}

			}

			return newIndex;

		}

		addEntityToPartition( entity, index ) {

			const cell = this.cells[ index ];
			cell.add( entity );

			return this;

		}

		removeEntityFromPartition( entity, index ) {

			const cell = this.cells[ index ];
			cell.remove( entity );

			return this;

		}

		getIndexForPosition( position ) {

			clampedPosition.copy( position ).clamp( this.min, this.max );

			let indexX = Math.abs( Math.floor( ( this.cellsX * ( clampedPosition.x + this.halfWidth ) ) / this.width ) );
			let indexY = Math.abs( Math.floor( ( this.cellsY * ( clampedPosition.y + this.halfHeight ) ) / this.height ) );
			let indexZ = Math.abs( Math.floor( ( this.cellsZ * ( clampedPosition.z + this.halfDepth ) ) / this.depth ) );

			// handle index overflow

			if ( indexX === this.cellsX ) indexX = this.cellsX - 1;
			if ( indexY === this.cellsY ) indexY = this.cellsY - 1;
			if ( indexZ === this.cellsZ ) indexZ = this.cellsZ - 1;

			// calculate final index

			return ( indexX * this.cellsY * this.cellsZ ) + ( indexY * this.cellsZ ) + indexZ;

		}

		query( position, radius, result ) {

			const cells = this.cells;

			result.length = 0;

			// approximate range with an AABB which allows fast intersection test

			aabb.min.copy( position ).subScalar( radius );
			aabb.max.copy( position ).addScalar( radius );

			// test all non-empty cells for an intersection

			for ( let i = 0, l = cells.length; i < l; i ++ ) {

				const cell = cells[ i ];

				if ( cell.empty() === false && cell.intersects( aabb ) === true ) {

					result.push( ...cell.entries );

				}

			}

			return result;

		}

		makeEmpty() {

			const cells = this.cells;

			for ( let i = 0, l = cells.length; i < l; i ++ ) {

				cells[ i ].makeEmpty();

			}

			return this;

		}

		addPolygon( polygon ) {

			const cells = this.cells;

			polygon.getContour( contour );

			aabb.fromPoints( contour );

			for ( let i = 0, l = cells.length; i < l; i ++ ) {

				const cell = cells[ i ];

				if ( cell.intersects( aabb ) === true ) {

					cell.add( polygon );

				}

			}

			return this;

		}

	}

	/**
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	/* istanbul ignore next */

	class Logger {

		static setLevel( level ) {

			currentLevel = level;

		}

		static log( ...args ) {

			if ( currentLevel <= Logger.LEVEL.LOG ) console.log( ...args );

		}

		static warn( ...args ) {

			if ( currentLevel <= Logger.LEVEL.WARN ) console.warn( ...args );

		}

		static error( ...args ) {

			if ( currentLevel <= Logger.LEVEL.ERROR ) console.error( ...args );

		}

	}

	Logger.LEVEL = Object.freeze( {
		LOG: 0,
		WARN: 1,
		ERROR: 2,
		SILENT: 3
	} );

	let currentLevel = Logger.LEVEL.WARN;

	/**
	 * @author Mugen87 / https://github.com/Mugen87
	 *
	 * https://en.wikipedia.org/wiki/Doubly_connected_edge_list
	 *
	 */

	class HalfEdge {

		constructor( vertex = new Vector3() ) {

			this.vertex = vertex;
			this.next = null;
			this.prev = null;
			this.twin = null;
			this.polygon = null;

			this.nodeIndex = - 1;

		}

		from() {

			return this.vertex;

		}

		to() {

			return this.next ? this.next.vertex : null;

		}

		length() {

			const from = this.from();
			const to = this.to();

			if ( to !== null ) {

				return from.distanceTo( to );

			}

			return - 1;

		}

		squaredLength() {

			const from = this.from();
			const to = this.to();

			if ( to !== null ) {

				return from.squaredDistanceTo( to );

			}

			return - 1;

		}

	}

	/**
	 * @author Mugen87 / https://github.com/Mugen87
	 *
	 * Reference: https://github.com/mrdoob/three.js/blob/master/src/math/Plane.js
	 *
	 */

	const v1 = new Vector3();
	const v2 = new Vector3();

	class Plane {

		constructor( normal = new Vector3( 0, 0, 1 ), constant = 0 ) {

			this.normal = normal;
			this.constant = constant;

		}

		set( normal, constant ) {

			this.normal = normal;
			this.constant = constant;

			return this;

		}

		copy( plane ) {

			this.normal.copy( plane.normal );
			this.constant = plane.constant;

			return this;

		}

		clone() {

			return new this.constructor().copy( this );

		}

		distanceToPoint( point ) {

			return this.normal.dot( point ) + this.constant;

		}

		fromNormalAndCoplanarPoint( normal, point ) {

			this.normal.copy( normal );
			this.constant = - point.dot( this.normal );

			return this;

		}

		fromCoplanarPoints( a, b, c ) {

			v1.subVectors( c, b ).cross( v2.subVectors( a, b ) ).normalize();

			this.fromNormalAndCoplanarPoint( v1, a );

			return this;

		}

		equals( plane ) {

			return plane.normal.equals( this.normal ) && plane.constant === this.constant;

		}

	}

	/**
	 * @author Mugen87 / https://github.com/Mugen87
	 * @author robp94 / https://github.com/robp94
	 */

	class Polygon {

		constructor() {

			this.centroid = new Vector3();
			this.edge = null;
			this.plane = new Plane();

		}

		fromContour( points ) {

			// create edges from points (assuming CCW order)

			const edges = new Array();

			if ( points.length < 3 ) {

				Logger.error( 'YUKA.Polygon: Unable to create polygon from contour. It needs at least three points.' );
				return this;

			}

			for ( let i = 0, l = points.length; i < l; i ++ ) {

				const edge = new HalfEdge( points[ i ] );
				edges.push( edge );

			}

			// link edges

			for ( let i = 0, l = edges.length; i < l; i ++ ) {

				let current, prev, next;

				if ( i === 0 ) {

					current = edges[ i ];
					prev = edges[ l - 1 ];
				 	next = edges[ i + 1 ];

				} else if ( i === ( l - 1 ) ) {

					current = edges[ i ];
				 	prev = edges[ i - 1 ];
					next = edges[ 0 ];

				} else {

				 	current = edges[ i ];
					prev = edges[ i - 1 ];
					next = edges[ i + 1 ];

				}

				current.prev = prev;
				current.next = next;
				current.polygon = this;

			}

			//

			this.edge = edges[ 0 ];

			//

			this.plane.fromCoplanarPoints( points[ 0 ], points[ 1 ], points[ 2 ] );

			return this;

		}

		computeCentroid() {

			const centroid = this.centroid;
			let edge = this.edge;
			let count = 0;

			centroid.set( 0, 0, 0 );

			do {

				centroid.add( edge.from() );

				count ++;

				edge = edge.next;

			} while ( edge !== this.edge );

			centroid.divideScalar( count );

			return this;

		}

		contains( point, epsilon = 1e-3 ) {

			const plane = this.plane;
			let edge = this.edge;

			// convex test

			do {

				const v1 = edge.from();
				const v2 = edge.to();

				if ( leftOn( v1, v2, point ) === false ) {

					return false;

				}

				edge = edge.next;

			} while ( edge !== this.edge );

			// ensure the given point lies within a defined tolerance range

			const distance = plane.distanceToPoint( point );

			if ( Math.abs( distance ) > epsilon ) {

				return false;

			}

			return true;

		}

		convex() {

			let edge = this.edge;

			do {

				const v1 = edge.from();
				const v2 = edge.to();
				const v3 = edge.next.to();

				if ( leftOn( v1, v2, v3 ) === false ) {

					return false;

				}

				edge = edge.next;

			} while ( edge !== this.edge );

			return true;

		}

		coplanar( epsilon = 1e-3 ) {

			const plane = this.plane;
			let edge = this.edge;

			do {

				const distance = plane.distanceToPoint( edge.from() );

				if ( Math.abs( distance ) > epsilon ) {

					return false;

				}

				edge = edge.next;

			} while ( edge !== this.edge );

			return true;

		}

		getContour( result ) {

			let edge = this.edge;

			result.length = 0;

			do {

				result.push( edge.vertex );

				edge = edge.next;

			} while ( edge !== this.edge );

			return result;

		}

		getPortalEdgeTo( polygon, portalEdge ) {

			let edge = this.edge;

			do {

				if ( edge.twin !== null ) {

					if ( edge.twin.polygon === polygon ) {

						portalEdge.left = edge.vertex;
						portalEdge.right = edge.next.vertex;
						return portalEdge;

					}

				}

				edge = edge.next;

			} while ( edge !== this.edge );

			portalEdge.left = null;
			portalEdge.right = null;

			return portalEdge;

		}

	}

	// from the book "Computational Geometry in C, Joseph O'Rourke"

	function leftOn( a, b, c ) {

		return _Math.area( a, b, c ) >= 0;

	}

	/**
	 * @author Mugen87 / https://github.com/Mugen87
	 */

	class NavMeshLoader {

		load( url, options ) {

			return new Promise( ( resolve, reject ) => {

				fetch( url )

					.then( response => {

						if ( response.status >= 200 && response.status < 300 ) {

							return response.arrayBuffer();

						} else {

							const error = new Error( response.statusText || response.status );
							error.response = response;
							return Promise.reject( error );

						}

					} )

					.then( ( arrayBuffer ) => {

						const parser = new Parser();
						const decoder = new TextDecoder();
						let data;

						const magic = decoder.decode( new Uint8Array( arrayBuffer, 0, 4 ) );

						if ( magic === BINARY_EXTENSION_HEADER_MAGIC ) {

							parser.parseBinary( arrayBuffer );

							data = parser.extensions.get( 'BINARY' ).content;

						} else {

							data = decoder.decode( new Uint8Array( arrayBuffer ) );

						}

						const json = JSON.parse( data );

						if ( json.asset === undefined || json.asset.version[ 0 ] < 2 ) {

							throw new Error( 'YUKA.NavMeshLoader: Unsupported asset version.' );

						} else {

							const path = extractUrlBase( url );

							return parser.parse( json, path, options );

						}

					} )

					.then( ( data ) => {

						resolve( data );

					} )

					.catch( ( error ) => {

						Logger.error( 'YUKA.NavMeshLoader: Unable to load navigation mesh.', error );

						reject( error );

					} );

			} );

		}

	}

	class Parser {

		constructor() {

			this.json = null;
			this.path = null;
			this.cache = new Map();
			this.extensions = new Map();

		}

		parse( json, path, options ) {

			this.json = json;
			this.path = path;

			// read the first mesh in the glTF file

			return this.getDependency( 'mesh', 0 ).then( ( data ) => {

				// parse the raw geometry data into a bunch of polygons

				const polygons = this.parseGeometry( data );

				// create and config navMesh

				const navMesh = new NavMesh();

				if ( options ) {

					if ( options.epsilonCoplanarTest ) navMesh.epsilonCoplanarTest = options.epsilonCoplanarTest;

				}

				// use polygons to setup the nav mesh

				return navMesh.fromPolygons( polygons );

			} );

		}

		parseGeometry( data ) {

			const index = data.index;
			const position = data.position;

			const vertices = new Array();
			const polygons = new Array();

			// vertices

			for ( let i = 0, l = position.length; i < l; i += 3 ) {

				const v = new Vector3();

				v.x = position[ i + 0 ];
				v.y = position[ i + 1 ];
				v.z = position[ i + 2 ];

				vertices.push( v );

			}

			// polygons

			if ( index ) {

				// indexed geometry

				for ( let i = 0, l = index.length; i < l; i += 3 ) {

					const a = index[ i + 0 ];
					const b = index[ i + 1 ];
					const c = index[ i + 2 ];

					const contour = [ vertices[ a ], vertices[ b ], vertices[ c ] ];

					const polygon = new Polygon().fromContour( contour );

					polygons.push( polygon );

				}

			} else {

				// non-indexed geometry

				for ( let i = 0, l = vertices.length; i < l; i += 3 ) {

					const contour = [ vertices[ i + 0 ], vertices[ i + 1 ], vertices[ i + 2 ] ];

					const polygon = new Polygon().fromContour( contour );

					polygons.push( polygon );

				}

			}

			return polygons;

		}

		getDependencies( type ) {

			const cache = this.cache;

			let dependencies = cache.get( type );

			if ( ! dependencies ) {

				const definitions = this.json[ type + ( type === 'mesh' ? 'es' : 's' ) ] || [];

				dependencies = Promise.all( definitions.map( ( definition, index ) => {

					return this.getDependency( type, index );

				} ) );

				cache.set( type, dependencies );

			}

			return dependencies;

		}

		getDependency( type, index ) {

			const cache = this.cache;
			const key = type + ':' + index;

			let dependency = cache.get( key );

			if ( dependency === undefined ) {

				switch ( type ) {

					case 'accessor':
						dependency = this.loadAccessor( index );
						break;

					case 'buffer':
						dependency = this.loadBuffer( index );
						break;

					case 'bufferView':
						dependency = this.loadBufferView( index );
						break;

					case 'mesh':
						dependency = this.loadMesh( index );
						break;

					default:
						throw new Error( 'Unknown type: ' + type );

				}

				cache.set( key, dependency );

			}

			return dependency;

		}

		loadBuffer( index ) {

			const json = this.json;
			const definition = json.buffers[ index ];

			if ( definition.uri === undefined && index === 0 ) {

				return Promise.resolve( this.extensions.get( 'BINARY' ).body );

			}

			return new Promise( ( resolve, reject ) => {

				const url = resolveURI( definition.uri, this.path );

				fetch( url )

					.then( response => {

						return response.arrayBuffer();

					} )

					.then( ( arrayBuffer ) => {

						resolve( arrayBuffer );

					} ).catch( ( error ) => {

						Logger.error( 'YUKA.NavMeshLoader: Unable to load buffer.', error );

						reject( error );

					} );

			} );

		}

		loadBufferView( index ) {

			const json = this.json;

			const definition = json.bufferViews[ index ];

			return this.getDependency( 'buffer', definition.buffer ).then( ( buffer ) => {

				const byteLength = definition.byteLength || 0;
				const byteOffset = definition.byteOffset || 0;
				return buffer.slice( byteOffset, byteOffset + byteLength );

			} );

		}

		loadAccessor( index ) {

			const json = this.json;
			const definition = json.accessors[ index ];

			return this.getDependency( 'bufferView', definition.bufferView ).then( ( bufferView ) => {

				const itemSize = WEBGL_TYPE_SIZES[ definition.type ];
				const TypedArray = WEBGL_COMPONENT_TYPES[ definition.componentType ];
				const byteOffset = definition.byteOffset || 0;

				return new TypedArray( bufferView, byteOffset, definition.count * itemSize );

			} );

		}

		loadMesh( index ) {

			const json = this.json;
			const definition = json.meshes[ index ];

			return this.getDependencies( 'accessor' ).then( ( accessors ) => {

				// assuming a single primitve

				const primitive = definition.primitives[ 0 ];

				if ( primitive.mode !== 4 ) {

					throw new Error( 'YUKA.NavMeshLoader: Invalid geometry format. Please ensure to represent your geometry as triangles.' );

				}

				return {
					index: accessors[ primitive.indices ],
					position: accessors[ primitive.attributes.POSITION ],
					normal: accessors[ primitive.attributes.NORMAL ]
				};

			} );

		}

		parseBinary( data ) {

			const chunkView = new DataView( data, BINARY_EXTENSION_HEADER_LENGTH );
			let chunkIndex = 0;

			const decoder = new TextDecoder();
			let content = null;
			let body = null;

			while ( chunkIndex < chunkView.byteLength ) {

				const chunkLength = chunkView.getUint32( chunkIndex, true );
				chunkIndex += 4;

				const chunkType = chunkView.getUint32( chunkIndex, true );
				chunkIndex += 4;

				if ( chunkType === BINARY_EXTENSION_CHUNK_TYPES.JSON ) {

					const contentArray = new Uint8Array( data, BINARY_EXTENSION_HEADER_LENGTH + chunkIndex, chunkLength );
					content = decoder.decode( contentArray );

				} else if ( chunkType === BINARY_EXTENSION_CHUNK_TYPES.BIN ) {

					const byteOffset = BINARY_EXTENSION_HEADER_LENGTH + chunkIndex;
					body = data.slice( byteOffset, byteOffset + chunkLength );

				}

				chunkIndex += chunkLength;

			}

			this.extensions.set( 'BINARY', { content: content, body: body } );

		}

	}

	// helper functions

	function extractUrlBase( url ) {

		const index = url.lastIndexOf( '/' );

		if ( index === - 1 ) return './';

		return url.substr( 0, index + 1 );

	}

	function resolveURI( uri, path ) {

		if ( typeof uri !== 'string' || uri === '' ) return '';

		if ( /^(https?:)?\/\//i.test( uri ) ) return uri;

		if ( /^data:.*,.*$/i.test( uri ) ) return uri;

		if ( /^blob:.*$/i.test( uri ) ) return uri;

		return path + uri;

	}

	//

	const WEBGL_TYPE_SIZES = {
		'SCALAR': 1,
		'VEC2': 2,
		'VEC3': 3,
		'VEC4': 4,
		'MAT2': 4,
		'MAT3': 9,
		'MAT4': 16
	};

	const WEBGL_COMPONENT_TYPES = {
		5120: Int8Array,
		5121: Uint8Array,
		5122: Int16Array,
		5123: Uint16Array,
		5125: Uint32Array,
		5126: Float32Array
	};

	const BINARY_EXTENSION_HEADER_MAGIC = 'glTF';
	const BINARY_EXTENSION_HEADER_LENGTH = 12;
	const BINARY_EXTENSION_CHUNK_TYPES = { JSON: 0x4E4F534A, BIN: 0x004E4942 };

	/**
	 * @author Mugen87 / https://github.com/Mugen87
	 */


	self.navMesh = null;
	self.bufferSize = 100;

	self.addEventListener( 'message', ( event ) => {

		switch ( event.data.op ) {

			case 'init':
				const loader = new NavMeshLoader();

				loader.load( '../examples/graph/common/navmeshes/complex/navmesh.glb' ).then( ( navigationMesh ) => {



					// setup spatial index

					const width = 100, height = 40, depth = 75;
					const cellsX = 20, cellsY = 5, cellsZ = 20;

					navigationMesh.spatialIndex = new CellSpacePartitioning( width, height, depth, cellsX, cellsY, cellsZ );
					navigationMesh.updateSpatialIndex();
					self.navMesh = navigationMesh;



				} );
				break;
			/*case 'search':

				const f = new Float32Array( event.data.from );
				const t = new Float32Array( event.data.to );

				const from = new Vector3( f[ 0 ], f[ 1 ], f[ 2 ] );
				const to = new Vector3( t[ 0 ], t[ 1 ], t[ 2 ] );

				const path = self.navMesh.findPath( from, to );

				const f32Array = new Float32Array( path.length * 3 );
				for ( let i = 0, l = path.length; i < l; i ++ ) {

					f32Array[ i * 3 ] = path[ i ].x;
					f32Array[ i * 3 + 1 ] = path[ i ].y;
					f32Array[ i * 3 + 2 ] = path[ i ].z;


				}
				const buffer = f32Array.buffer;

				self.postMessage( { buffer: buffer, requestId: event.data.requestId }, [ buffer ] );
				break;*/
			case 'searches':
				console.time( 'worker' );
				const f = new Float32Array( event.data.buffer );
				const array = self.navMesh.findPaths( f );

				const buffer = new Float32Array( array ).buffer;

				self.postMessage( { buffer: buffer }, [ buffer ] );
				console.timeEnd( 'worker' );
				break;

		}

	} );

}());
