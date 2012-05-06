define( [ 'wire!context/app', 'when' ],
function( context_app, when ) {
	'use strict';

	// When all items in the context are ready
	when( context_app ).then( function( context ) {

		// Start routing
		context[ 'router_app' ].startRouting();

	} );

} );