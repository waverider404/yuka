/**
 * @author Mugen87 / https://github.com/Mugen87
 */

import { Config } from '../core/Config.js';

class PathPlanner {

	constructor() {

		const path = Config.getWorkerPath();

		this.worker = new Worker( path );

		this.worker.onmessage = function ( event ) {

			const buffer = event.data.buffer;
			const f32Array = new Float32Array( buffer );

			console.log( f32Array );

		};

		this.worker.postMessage( { op: 'init' } );

	}

	run() {

		this.worker.postMessage( { op: 'search' } );

	}

	terminate() {

		this.worker.terminate();

	}

}


export { PathPlanner };
