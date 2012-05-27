//
// Todo View
//

define( [ 'backbone', 'underscore', 'jquery' ], function( Backbone, _, $ ) {

	// View logic
	return Backbone.View.extend( {

		//
		// Properties
		//
		tagName: 'li',

		$el_input: false,
		$el_completed: false,

		// Override from the wire specification
		template_todo: false,
		class_completed: '',
		class_editable: '',

		CREATE_KEYS: [],


		//
		// Setup functions
		//


		//
		// General API
		//
		render: function( model ) {
			var self = this;

			self.$el.html( self.template_todo( model.templateJSON() ) );

			self.$el.toggleClass( self.class_completed, model.get( 'completed' ) );

			self.$el_input = self.$( '.edit' );
			self.$el_completed = self.$( '.view .toggle' );

			return self;
		},

		getInputValue: function() {
			var self = this;

			return $.trim( self.$el_input.val() || '' );
		},

		getCompletedValue: function() {
			var self = this;

			return self.$el_completed.is( ':checked' );
		},


		//
		// Dom events
		//
		events: {

			// Input events
			'dblclick .view': 'setEditable',
			'blur .edit': 'finshEditing',
			'keyup .edit': function( e ) { // Check for specific key
				if ( _( this.CREATE_KEYS ).include( e.which ) ) { this.finshEditing( e ); }
			},

			// Completed
			'change .view .toggle': 'toggleCompleted',

			// Remove
			'click .destroy': function() {
				this.trigger( 'destroy' );
			}
		},

		setEditable: function( e ) {
			var self = this;

			self.$el.addClass( self.class_editable );
			self.$el_input.select();
		},

		finshEditing: function( e ) {
			var self = this,
				val;

			self.$el.removeClass( self.class_editable );

			// Get value
			val = self.getInputValue();

			if ( val ) {

				// Has value trigger event
				self.trigger( 'update', {
					title: val
				} );

			} else {
				// No value, delete todo
				self.trigger( 'destroy' );
			}

		},

		toggleCompleted: function( e ) {
			var self = this,
				is_completed;

			is_completed = self.getCompletedValue();

			self.trigger( 'update', {
				completed: is_completed
			} );
		}

	} );
} );