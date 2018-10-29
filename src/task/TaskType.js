import { Config } from "../core/Config";

/**
 * @author robp94 / https://github.com/robp94
 */



class TaskType {

	constructor( taskQueue, path = null ) {

		this.activeRequest = new Map();
		this.nextId = 0;

		this.newRequests = new Array();

		this.taskQueue = taskQueue;

		if ( path === null ) {


			this.worker = null;

		} else {

			this.worker = new Worker( path );

		}
		this.useWorker = false;

	}

	init() {

		//init worker set eventlistner
		this.worker.addEventListener( 'message', ( event ) => {

			const f32Array = new Float32Array( event.data.buffer );
			this.resolvePromises( f32Array );
			//todo use window.requestIdleCallback

		} );

		this.worker.postMessage( { op: 'init' } );

	}

	post( array ) {
		//send data to worker
	}

	terminate() {

		this.worker.terminate();

	}

	createPromise( ) {

		const promise = new Promise( ( resolve, reject ) => {

			const requestId = this.nextId ++;

			this.activeRequest.set( requestId, ( error, result ) => {

				if ( error ) {

					reject( error );

				} else {

					resolve( result );

				}

			} );

		} );
		return promise;

	}

	resolvePromise( requestId, data ) {

		const callback = this.activeRequest.get( requestId );
		callback( undefined, data );
		this.activeRequest.delete( requestId );

	}

	resolvePromises( f32Array ) {
		//resolvePromises used for worker
	}

	tasksToData( tasks ) {

		const dataArray = new Array();
		const l = tasks.length;
		for ( let i = 0; i < l; i ++ ) {

			const task = tasks[ i ];
			dataArray.push( task.requestId, task.from.x, task.from.y, task.from.z, task.to.x, task.to.y, task.to.z );

		}

		return dataArray;

	}


}
export { TaskType };
