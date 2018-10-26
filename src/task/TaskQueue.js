/**
 * @author robp94 / https://github.com/robp94
 */
class TaskQueue {

	constructor() {

		this.tasks = new Array();
		this.active = false;
		this.handler = runTaskQueue.bind( this );
		this.taskHandle = 0;

	}

	enqueue( task ) {

		this.tasks.push( task );

	}

	update() {

		if ( this.tasks.length > 0 && this.active === false ) {

			this.active = true;
			window.requestIdleCallback( this.handler );

		}

	}

}

function runTaskQueue( deadline ) {

	const tasks = this.tasks;

	while ( ( deadline.timeRemaining() > 0 || deadline.didTimeout ) && tasks.length > 0 ) {

		tasks[ 0 ].execute();
		tasks[ 0 ].resolve();

		tasks.shift();

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
