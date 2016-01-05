/**
 * @author mrdoob / http://mrdoob.com/
 */

function AudioBuffer ( context ) {
	this.isAudioBuffer = true;

	this.context = context;
	this.ready = false;
	this.readyCallbacks = [];

};

AudioBuffer.prototype.load = function ( file ) {

	var scope = this;

	var request = new XMLHttpRequest();
	request.open( 'GET', file, true );
	request.responseType = 'arraybuffer';
	request.onload = function ( e ) {

		scope.context.decodeAudioData( this.response, function ( buffer ) {

			scope.buffer = buffer;
			scope.ready = true;

			for ( var i = 0; i < scope.readyCallbacks.length; i ++ ) {

				scope.readyCallbacks[ i ]( scope.buffer );

			}

			scope.readyCallbacks = [];

		} );

	};
	request.send();

	return this;

};

AudioBuffer.prototype.onReady = function ( callback ) {

	if ( this.ready ) {

		callback( this.buffer );

	} else {

		this.readyCallbacks.push( callback );

	}

};


export { AudioBuffer };