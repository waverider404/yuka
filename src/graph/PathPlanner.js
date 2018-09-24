/**
 * @author Mugen87 / https://github.com/Mugen87
 */

import { Config } from '../core/Config.js';
import { Vector3 } from '../math/Vector3.js';

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

			const path = new Array();

			for ( let i = 0, l = f32Array.length; i < l; i += 3 ) {

				const v = new Vector3( f32Array[ i ], f32Array[ i + 1 ], f32Array[ i + 2 ] );
				path.push( v );

			}

			callback( undefined, path );

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
			const f = new Float32Array( [ from.x, from.y, from.z ] ).buffer;
			const t = new Float32Array( [ to.x, to.y, to.z ] ).buffer;

			this.worker.postMessage( { op: 'search', requestId: requestId, from: f, to: t } );

		} );

		return promise;

	}

}


export { PathPlanner };
