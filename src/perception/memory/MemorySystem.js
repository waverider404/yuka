import { MemoryRecord } from './MemoryRecord.js';

/**
* Class for representing the memory system of a game entity. It is used for managing,
* filtering, and remembering sensory input.
*
* @author {@link https://github.com/Mugen87|Mugen87}
*/
class MemorySystem {

	/**
	* Constructs a new memory system.
	*
	* @param {GameEntity} owner - The game entity that owns this memory system.
	*/
	constructor( owner = null ) {

		/**
		* The game entity that owns this memory system.
		* @type GameEntity
		*/
		this.owner = owner;

		/**
		* Used to simulate memory of sensory events. It contains {@link MemoryRecord memory record}
		* of all relevant game entities in the environment. The records are usually update by
		* the owner of the memory system.
		* @type Array
		*/
		this.records = new Array();

		/**
		* Same as {@link MemorySystem#records} but used for fast access via the ID
		* of the game entity.
		* @type Map
		*/
		this.recordsMap = new Map();

		/**
		* Represents the duration of the game entities short term memory in seconds.
		* When a bot requests a list of all recently sensed game entities, this value
		* is used to determine if the bot is able to remember a game entity or not.
		* @type Number
		* @default 1
		*/
		this.memorySpan = 1;

	}

	/**
	* Returns the memory record of the given game entity.
	*
	* @param {GameEntity} entity - The game entity.
	* @return {MemoryRecord} The memory record for this game entity.
	*/
	getRecord( entity ) {

		return this.recordsMap.get( entity.id );

	}

	/**
	* Creates a memory record for the given game entity.
	*
	* @param {GameEntity} entity - The game entity.
	* @return {MemorySystem} A reference to this memory system.
	*/
	createRecord( entity ) {

		const record = new MemoryRecord( entity );

		this.records.push( record );
		this.recordsMap.set( entity.id, record );

		return this;

	}

	/**
	* Deletes the memory record for the given game entity.
	*
	* @param {GameEntity} entity - The game entity.
	* @return {MemorySystem} A reference to this memory system.
	*/
	deleteRecord( entity ) {

		const record = this.getRecord( entity );
		const index = this.records.indexOf( record );

		this.records.splice( index, 1 );
		this.recordsMap.delete( entity.id );

		return this;

	}

	/**
	* Returns true if there is a memory record for the given game entity.
	*
	* @param {GameEntity} entity - The game entity.
	* @return {Boolean} Whether the game entity has a memory record or not.
	*/
	hasRecord( entity ) {

		return this.recordsMap.has( entity.id );

	}

	/**
	* Removes all memory records from the memory system.
	*
	* @return {MemorySystem} A reference to this memory system.
	*/
	clear() {

		this.records.length = 0;
		this.recordsMap.clear();

		return this;

	}

	/**
	* Determines all valid memory record and stores the result in the given array.
	*
	* @param {Number} currentTime - The current elapsed time.
	* @param {Array} result - The result array.
	* @return {Array} The result array.
	*/
	getValidMemoryRecords( currentTime, result ) {

		const records = this.records;

		result.length = 0;

		for ( let i = 0, l = records.length; i < l; i ++ ) {

			const record = records[ i ];

			if ( ( currentTime - record.timeLastSensed ) <= this.memorySpan ) {

				result.push( record );

			}

		}

		return result;

	}

}

export { MemorySystem };
