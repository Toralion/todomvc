//
// Wire collection adapter
//

define( [ 'backbone', 'underscore', 'when' ], function( Backbone, _, when ) {

	// Module
	return Backbone.Collection.extend( {

		createContext: false,


		//
		// Backbone functions
		//

		add: function( models_data, options ) {
			var self = this,
				models_deferred;

			models_data = _.isArray( models_data ) ? models_data.slice() : [ models_data ];

			models_deferred = _( models_data || [] ).map( function( model ) {
				return self._prepareContextModel( model, options );
			} );

			return when.all( models_deferred ).then( function( models ) {
				return Backbone.Collection.prototype.add.apply( self, [ models, options ] );
			} );

		},

		create: function( model_data, options ) {
			var self = this;

			return when( self._prepareContextModel( model_data, options ) ).then( function( model ) {
				return Backbone.Collection.prototype.create.apply( self, [ model, options ] );
			} );
		},

		push: function( model_data, options ) {
			var self = this;

			return when( self._prepareContextModel( model_data, options ) ).then( function( model ) {
				return Backbone.Collection.prototype.push.apply( self, [ model, options ] );
			} );
		},

		unshift: function( model_data, options ) {
			var self = this;

			return when( self._prepareContextModel( model_data, options ) ).then( function( model ) {
				return Backbone.Collection.prototype.unshift.apply( self, [ model, options ] );
			} );
		},


		//
		// Creation functions
		//

		// Prepare the context, but just return the model
		// Useful for mocking basic collection functions that expect models
		_prepareContextModel: function( model, options ) {
			var self = this;

			if ( model instanceof Backbone.Model ) {
				return model;
			} else {
				return when( self._prepareContext( model, options ) ).then( function( context ) {
					return context[ context.name_model ];
				} );
			}

		},

		// Override Backbone's default create method so we can take advantage of wire.js's creation methods
		// Creates our todo Model and View, then saves it and passes it to the collection
		_prepareContext: function( data, options ) {
			var self = this,
				attributes, createContext;

			// Defaults
			options = options || {};
			data = data || {};
			attributes = options.attributes || {};
			createContext = options.createContext || self.createContext;

			if ( !attributes[ 'model_data' ] ) attributes[ 'model_data' ] = data;

			// We need a context creator
			if ( !_.isFunction( createContext ) ) throw new Error( "Invalid or no context creator defined" );

			// Run the function created in our wiring spec, to create necessary objects
			// Pass in our attributes so they can be used in the creation of the model
			// BEWARE: Wire does magic here!
			return createContext( attributes ).then( function( context ) {

				if ( self._onPrepareContext ) {
					self._onPrepareContext.apply( self, [ context, data, options ] );
				}

			} );
			
		},
		
		// Should only be called by the `_prepareContext` fn
		_onPrepareContext: function( context, data, options ) {
			var self = this,
				model = context[ context.name_model ];

			self.onReadyContext( context, options );

			// When the model is destroyed kill the whole context
			model.on( 'destroy', function() {
				context.destroy();
			} );

		},

		onReadyContext: function( context, options ) {}

	} );

} );