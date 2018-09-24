/**
 * @author Mugen87 / https://github.com/Mugen87
 */

import { Config } from '../core/Config.js';

let nextId = 0;

class PathPlanner {

	constructor() {

		const path = Config.getWorkerPath();

		this.activeRequest = new Map();

		this.worker = new Worker( path );

		this.worker.addEventListener( 'message', ( event ) => {

			const requestId = event.data.requestId;
			const activeRequest = this.activeRequest;

			const callback = activeRequest.get( requestId );

			const f32Array = new Float32Array( event.data.buffer );

			callback( undefined, f32Array );

			activeRequest.delete( requestId );

		} );

		this.worker.postMessage( { op: 'init' } );

	}

	run() {

		this.worker.postMessage( { op: 'search' } );

	}

	terminate() {

		this.worker.terminate();

	}

	findPath( from, to ) {

		const promise = new Promise( ( resolve, reject ) => {

			const requestId = nextId ++;

			this.activeRequest.set( requestId, ( error, result ) => {

				if ( error ) {

					reject( error );

				} else {

					resolve( result );

				}

			} );

			this.worker.postMessage( { op: 'search', requestId: requestId } );

		} );

		return promise;

	}

}


export { PathPlanner };
