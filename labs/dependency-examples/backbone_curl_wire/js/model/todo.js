//
// Todo Model
//

define( [ 'backbone' ], function( Backbone ) {

	// Model logic
	return Backbone.Model.extend( {

		defaults: {
			done: false
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
		}

	} );
} );