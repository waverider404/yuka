/**
 * @author robp94 / https://github.com/robp94
 */
class TaskQueue {

	constructor() {

		this.tasks = new Array();
		this.active = false;
		this.handler = runTaskQueue.bind( this );
		this.taskHandle = 0;
		this.types = new Array();

	}

	addType( type ) {

		this.types.push( type );

	}

	enqueue( task ) {

		this.tasks.push( task );

	}

	update() {

		if ( this.tasks.length > 0 && this.active === false ) {

			this.active = true;
			window.requestIdleCallback( this.handler );

		} else {

			this.active = false;

		}

	}

	bundel( taskType ) {

		const l = this.tasks.length;
		const positions = new Array();
		const bundledTasks = new Array();
		for ( let i = 0; i < l; i ++ ) {

			if ( this.tasks[ i ].taskType instanceof taskType.constructor ) {

				positions.push( i );
				bundledTasks.push( this.tasks[ i ] );

			}

		}
		/*
		Optimize add rest to an other array
		don't use push create array with length and set length afterwards
		 */

		const l2 = positions.length;
		positions.reverse();
		for ( let i = 0; i < l2; i ++ ) {

			this.tasks.splice( positions[ i ], 1 );

		}

		return bundledTasks;

	}

}

function runTaskQueue( deadline ) {

	const tasks = this.tasks;

	while ( ( deadline.timeRemaining() > 0 || deadline.didTimeout ) && tasks.length > 0 ) {

		const task = tasks[ 0 ];

		if ( task.taskType.useWorker ) {

			task.executeWorker( this.bundel( task.taskType ) );

		} else {

			task.execute();

			tasks.shift();

		}



	}

	if ( tasks.length > 0 ) {

		this.taskHandle = requestIdleCallback( this.handler );
		this.active = true;

	} else {

		this.taskHandle = 0;
		this.active = false;

	}

}

export { TaskQueue };
