/**
 * @author Mugen87 / https://github.com/Mugen87
 */

import { Graph } from './graph/core/Graph.js';

self.onmessage = function ( event ) {

	if ( event.data.op === 'search' ) {

		const graph = new Graph();
		console.log( graph );

		const f32Array = new Float32Array( [ 1.2, 0.2, 4, - 5.01 ] );
		const buffer = f32Array.buffer;

		self.postMessage( { buffer: buffer }, [ buffer ] );

	}

};
