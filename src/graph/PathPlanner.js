/**
 * @author Mugen87 / https://github.com/Mugen87
 */

import { Config } from '../core/Config.js';
import { Vector3 } from '../math/Vector3.js';
import { TaskPathPlanner } from "../task/TaskPathPlanner";
import { TaskType } from "../task/TaskType";

class PathPlanner extends TaskType {

	constructor( taskQueue ) {

		super( taskQueue, Config.getWorkerPath() );

		this.navMesh = null;

	}

	findPath( from, to ) {


		const requestId = this.nextId;
		const promise = this.createPromise();

		this.taskQueue.enqueue( new TaskPathPlanner( requestId, from, to, this ) );

		return promise;

	}

	findPathX( requestId, from, to ) {

		return this.navMesh.findPath( from, to );

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

			for ( let j = i + 2; j < length + i + 2; j += 3 ) {

				const v = new Vector3( f32Array[ j ], f32Array[ j + 1 ], f32Array[ j + 2 ] );
				path.push( v );

			}
			this.resolvePromise( requestId, path );
			i += length + 2;

		}

	}


	post( array ) {

		const f = new Float32Array( array );
		const buffer = f.buffer;
		this.worker.postMessage( { op: 'searches', buffer: buffer }, [ buffer ] );




	}

}

export { PathPlanner };
