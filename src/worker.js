/**
 * @author Mugen87 / https://github.com/Mugen87
 */

import { Vector3 } from "./math/Vector3.js";
import { NavMesh } from "./navigation/navmesh/NavMesh";
import { CellSpacePartitioning } from "./partitioning/CellSpacePartitioning";
import { NavMeshLoader } from "./navigation/navmesh/NavMeshLoader";


self.navMesh = null;
self.bufferSize = 100;

self.addEventListener( 'message', ( event ) => {

	switch ( event.data.op ) {

		case 'init':
			const loader = new NavMeshLoader();

			loader.load( '../examples/graph/common/navmeshes/complex/navmesh.glb' ).then( ( navigationMesh ) => {



				// setup spatial index

				const width = 100, height = 40, depth = 75;
				const cellsX = 20, cellsY = 5, cellsZ = 20;

				navigationMesh.spatialIndex = new CellSpacePartitioning( width, height, depth, cellsX, cellsY, cellsZ );
				navigationMesh.updateSpatialIndex();
				self.navMesh = navigationMesh;



			} );
			break;
		case 'searches':
			console.time( 'worker' );
			const f = new Float32Array( event.data.buffer );
			const array = self.navMesh.findPaths( f );

			const buffer = new Float32Array( array ).buffer;

			self.postMessage( { buffer: buffer }, [ buffer ] );
			console.timeEnd( 'worker' );
			break;

		default:
			console.log( "???" );

	}

} );
