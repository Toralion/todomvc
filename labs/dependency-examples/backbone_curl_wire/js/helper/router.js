//
// Application router
//

define( [ 'backbone' ], function( Backbone ) {
	
	// Router logic
	return Backbone.Router.extend( {

		//
		// Properties
		//
		history_options: {},


		//
		// General API
		//

		// Start the internal backbone router
		startRouting: function() {
			return Backbone.history.start( this.history_options );
		},


		//
		// Routing logic
		//

		// Routing definitions
		routes: {
			''          : 'showAll',
			'active'    : 'showActive',
			'completed' : 'showCompleted',
			'*path'     : 'notFound'
		},

		// Blank route functions
		showAll: function() {},
		showActive: function() {},
		showCompleted: function() {},
		notFound: function( path ) {}

	} );

} );