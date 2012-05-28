//
// Application View
//

define( [ 'backbone', 'underscore', 'jquery' ], function( Backbone, _, $ ) {

	// View logic
	return Backbone.View.extend( {

		//
		// Properties
		//

		// Override from the wire specification
		template_stats: false,

		el_input: false,
		el_todos: false,
		el_completed: false,
		el_footer: false,

		CREATE_KEYS: [],


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

		getAllCompletedValue: function() {
			var self = this;

			return self.el_completed.checked;
		},

		setAllCompletedValue: function( completed ) {
			var self = this;

			return self.el_completed.checked = !!completed;
		},

		addTodo: function( context, options ) {
			var self = this;

			$( self.el_todos ).append( context[ context[ 'name_view' ] ].el );
		},

		updateStats: function( data ) {
			var self = this;

			if ( !data.active || !data.completed ) {
				self.setAllCompletedValue( !data.active );
			}

			self.renderStats( data );
		},

		renderStats: function( data ) {
			var self = this;

			$( self.el_footer ).html( self.template_stats( data ) ).toggle( true );
		},


		//
		// Dom events
		//
		events: {

			// Input
			'keypress #new-todo': 'createOnKey',

			// Completed
			'change #toggle-all': 'toggleAllCompleted',
			'click #clear-completed': 'clearCompleted'

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

		},

		toggleAllCompleted: function( e ) {
			var self = this,
				is_completed;

			is_completed = self.getAllCompletedValue();

			self.trigger( 'updateTodos', {
				completed: is_completed
			} );
		},

		clearCompleted: function( e ) {
			var self = this;

			self.trigger( 'clearCompleted' );
		}

	} );
} );