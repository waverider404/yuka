/**
 * @author robp94 / https://github.com/robp94
 */
import { Task } from "./Task";

class TaskPathPlanner extends Task {

	constructor( requestId, from, to, taskType ) {

		super( taskType );
		this.requestId = requestId;
		this.from = from;
		this.to = to;
		this.path = null;

	}

	execute() {

		this.path = this.taskType.findPathX( this.requestId, this.from, this.to );

		this.resolve();

	}


	resolve() {

		this.taskType.resolvePromise( this.requestId, this.path );

	}

}

export { TaskPathPlanner };
