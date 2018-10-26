import { Config } from "../core/Config";

/**
 * @author robp94 / https://github.com/robp94
 */



class TaskType {

	constructor( taskQueue, path = null ) {

		this.activeRequest = new Map();
		this.nextId = 0;

		this.worker = new Worker( path );

		this.newRequests = new Array();

		this.taskQueue = taskQueue;

		if ( path === null ) {


			this.worker = null;

		} else {

			this.worker = new Worker( path );

		}
		this.useWorker = false;
		this.init();//???

	}

	init() {

		//init worker set eventlistner
		this.worker.addEventListener( 'message', ( event ) => {

			const f32Array = new Float32Array( event.data.buffer );
			this.resolvePromises( f32Array );

		} );

		this.worker.postMessage( { op: 'init' } );

	}

	post() {
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

	resolvePromises() {
		//resolvePromises used for worker
	}

}
export { TaskType };
