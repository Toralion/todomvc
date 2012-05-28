//
// Todos collection
//

define( [ 'backbone/wire_collection' ], function( Collection ) {

	// Extend from the backbone wire collection adapter so
	// we can take advantage of its wire context creation methods.
	return Collection.extend( {

		//
		// Setup Functions
		//

		setupStatsUpdates: function() {
			var self = this,
				onChange, last_data;

			onChange = function() {
				var data, completed;

				completed = self.where( { completed: true } ).length;

				data = {
					all: self.length,
					completed: completed,
					active: self.length - completed
				};

				// Only trigger event if change is new
				if ( data !== last_data ) {
					last_data = data;
					self.trigger( 'updateStats', data );
				}
			};

			self.on( 'change', onChange );
			self.on( 'add',    onChange );
			self.on( 'remove', onChange );
		},

		//
		// General functions
		//

		update: function( data, options ) {
			var self = this;

			self.invoke( 'save', data, options );
		}

	} );
	
} );