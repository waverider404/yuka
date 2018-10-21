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

		this.navMesh = null;

		this.worker = new Worker( path );

		this.array = new Array();

		this.useWorker = false;

		this.worker.addEventListener( 'message', ( event ) => {

			const f32Array = new Float32Array( event.data.buffer );
			this.resolvePromises( f32Array );

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

		const f = new Float32Array( this.array );
		const buffer = f.buffer;
		//this.array.length = 0;
		this.worker.postMessage( { op: 'searches', buffer: buffer }, [ buffer ] );
		console.time( 'main' );
		this.findPaths(); //for performance
		console.timeEnd( 'main' );
		this.array.length = 0;

	}

	doWork( count = - 1 ) {

		if ( this.array.length > 0 ) {

			if ( this.useWorker ) {

				this.post();

			} else {

				this.resolvePromises( this.findPaths( count ) );

			}

		}

	}

	findPaths( count = - 1 ) {

		if ( count < 0 ) {

			count = this.array.length;

		}

		const array = this.array.splice( 0, count * 7 );

		const f = new Float32Array( array );

		const resultArray = this.navMesh.findPaths( f );

		const f32Array = new Float32Array( resultArray );

		return f32Array;

	}

	resolvePromises( f32Array ) {

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

	}



}


export { PathPlanner };
