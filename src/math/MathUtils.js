/**
* Class with various math helpers.
*
* @author {@link https://github.com/Mugen87|Mugen87}
*/
class MathUtils {

	/**
	* Ensures the given scalar value is within a given min/max range.
	*
	* @param {Number} value - The value to clamp.
	* @param {min} value - The min value.
	* @param {max} value - The max value.
	* @return {Number} The clamped value.
	*/
	static clamp( value, min, max ) {

		return Math.max( min, Math.min( max, value ) );

	}

	/**
	* Computes a random integer value within a given min/max range.
	*
	* @param {min} value - The min value.
	* @param {max} value - The max value.
	* @return {Number} The random integer value.
	*/
	static randInt( min, max ) {

		return min + Math.floor( Math.random() * ( max - min + 1 ) );

	}

	/**
	* Computes a random float value within a given min/max range.
	*
	* @param {min} value - The min value.
	* @param {max} value - The max value.
	* @return {Number} The random float value.
	*/
	static randFloat( min, max ) {

		return min + Math.random() * ( max - min );

	}

	/**
	* Computes the signed area of a rectangle defined by three points.
	* This method can also be used to calculate the area of a triangle.
	*
	* @param {Vector3} a - The first point in 3D space.
	* @param {Vector3} b - The second point in 3D space.
	* @param {Vector3} c - The third point in 3D space.
	* @return {Number} The signed area.
	*/
	static area( a, b, c ) {

		return ( ( c.x - a.x ) * ( b.z - a.z ) ) - ( ( b.x - a.x ) * ( c.z - a.z ) );

	}

}

export { MathUtils };
