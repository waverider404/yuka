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

		this.array = new Array();

		this.worker.addEventListener( 'message', ( event ) => {

			const f32Array = new Float32Array( event.data.buffer );
			let i = 0;

			while ( i < f32Array.length ) {

				const requestId = f32Array[ i ];
				const length = f32Array[ i + 1 ];
				const path = new Array();
				const callback = this.activeRequest.get( requestId );

				for ( let j = i + 2; j < length + i + 2; j += 3 ) {

					const v = new Vector3( f32Array[ j ], f32Array[ j + 1 ], f32Array[ j + 2 ] );
					path.push( v );

				}
				callback( undefined, path );
				this.activeRequest.delete( requestId );
				i += length + 2;

			}

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

			this.array.push( requestId, from.x, from.y, from.z, to.x, to.y, to.z );

			//this.worker.postMessage( { op: 'search', requestId: requestId, from: f, to: t } );

		} );

		return promise;

	}

	post() {

		if ( this.array.length > 0 ) {

			const buffer = new Float32Array( this.array ).buffer;
			this.array.length = 0;
			this.worker.postMessage( { op: 'searches', buffer: buffer }, [ buffer ] );

		}

	}

}


export { PathPlanner };
