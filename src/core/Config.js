/**
 * @author Mugen87 / https://github.com/Mugen87
 */

class Config {

	static setWorkerPath( path ) {

		currentWorkerPath = path;

	}

	static getWorkerPath() {

		return currentWorkerPath;

	}

}

let currentWorkerPath = null;


export { Config };
