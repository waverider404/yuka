/**
 * @author robp94 / https://github.com/robp94
 */
let id = 0;
let useWorker = false;

class Task {

	constructor( taskType ) {

		this.id = id ++;
		this.taskType = taskType;

	}


	execute() {
	}

	resolve() {
	}

}



export { Task };
