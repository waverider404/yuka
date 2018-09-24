/**
 * @author Mugen87 / https://github.com/Mugen87
 */

import { Vector3 } from "./math/Vector3.js";
import { NavMesh } from "./navigation/navmesh/NavMesh";
import { CellSpacePartitioning } from "./partitioning/CellSpacePartitioning";
import { NavMeshLoader } from "./navigation/navmesh/NavMeshLoader";


self.navMesh = null;

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
		case 'search':

			const f = new Float32Array( event.data.from );
			const t = new Float32Array( event.data.to );

			const from = new Vector3( f[ 0 ], f[ 1 ], f[ 2 ] );
			const to = new Vector3( t[ 0 ], t[ 1 ], t[ 2 ] );

			const path = self.navMesh.findPath( from, to );

			const f32Array = new Float32Array( path.length * 3 );
			for ( let i = 0, l = path.length; i < l; i ++ ) {

				f32Array[ i * 3 ] = path[ i ].x;
				f32Array[ i * 3 + 1 ] = path[ i ].y;
				f32Array[ i * 3 + 2 ] = path[ i ].z;


			}
			const buffer = f32Array.buffer;

			self.postMessage( { buffer: buffer, requestId: event.data.requestId }, [ buffer ] );
			break;

	}

} );
