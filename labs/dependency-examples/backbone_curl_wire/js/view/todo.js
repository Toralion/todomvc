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

		// Override from the wire specification
		template_todo: false,
		class_completed: '',


		//
		// Setup functions
		//


		//
		// General API
		//
		render: function( model ) {
			var self = this;

			self.$el.html( self.template_todo( model.templateJSON() ) );

			if ( model.get( 'completed' ) ) self.$el.addClass( self.class_completed );

			return self;
		},


		//
		// Dom events
		//
		events: {
			
		}

	} );
} );