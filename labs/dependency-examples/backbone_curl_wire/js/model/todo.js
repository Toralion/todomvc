//
// Todo Model
//

define( [ 'backbone', 'underscore' ], function( Backbone, _ ) {

	// Model logic
	return Backbone.Model.extend( {

		defaults: {
			completed: false
		},

		parse: function( attrs ) {
			var ownAttrs, attr;

			// If a model is parsed into attrs just grab it's attrs
			// The backbone localstorage adapter passes a model as its response, weird huh?
			if ( attrs.attributes ) {
				attrs = attrs.attributes;
			}

			// Remove all properties that aren't directly from this object
			// Wire adds some funky functions onto the prototype
			ownAttrs = {};
			for ( attr in attrs ) {
				if ( attrs.hasOwnProperty( attr ) ) {
					ownAttrs[ attr ] = attrs[ attr ];
				}
			}

			return ownAttrs;
		},

		templateJSON: function() {
			var self = this,
				data = {};

			_.extend( data, self.toJSON() );

			return data;
		}

	} );
} );