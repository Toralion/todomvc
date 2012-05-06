//
// Application View
//

define( [ 'backbone', 'underscore', 'jquery' ], function( Backbone, _, $ ) {

	// View logic
	return Backbone.View.extend( {

		//
		// Properties
		//
		CREATE_KEYS: [
			13 // Enter
		],

		// Override from the wire specification
		el_input: false,
		el_todos: false,


		//
		// Setup functions
		//



		//
		// General API
		//
		getInputValue: function() {
			var self = this;

			return $.trim( $( self.el_input ).val() || '' );
		},

		addTodo: function( context, options ) {
			var self = this;

			$( self.el_todos ).append( context[ context[ 'name_view' ] ].el );
		},


		//
		// Dom events
		//
		events: {
			'keypress #new-todo': 'createOnKey'
		},

		createOnKey: function( e ) {
			var self = this,
				val;

			// Only proceed in key is found
			if ( !_( self.CREATE_KEYS ).include( e.which ) ) return;

			// Get value and trigger event
			val = self.getInputValue();
			if ( val ) self.trigger( 'createTodo', {
				title: val
			} );

			$( self.el_input ).val( '' );

		}

	} );
} );