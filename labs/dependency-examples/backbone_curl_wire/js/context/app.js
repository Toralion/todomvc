//
// Application Specification
//

define( {

	plugins: [
		{ module: 'wire/debug', trace: { pointcut: /^((?!(model$|constructor$|template|localstorage|_)).*)$/ } }, // Stop constructor, model or anything beginning with _, template or localstorage being wrapped by the debugger
		{ module: 'wire/jquery/dom' }
	],

	//
	// Data Modules
	//

	// Local storage adapter
	localstorage_todos: {
		create: {
			module: 'backbone/localstorage',
			args: [
				// Local storage name space
				'todos-backbone-curl-wire'
			]
		}
	},


	//
	// Template Modules
	//

	// Individual todo template
	template_todo: {},

	// Todos statistics template
	template_stats: {},


	//
	// Backbone modules
	//

	// Application view
	// Controls the base interface elements
	view_app: {},

	// Application collection
	// Holds all todos
	collection_todos: {

		create: {
			module: 'collection/todos',
			args: []
		},

		init: {
			fetch: []
		},

		properties: {

			// Sub context creator function
			createContext: { $ref: 'context_todo' },

			// Add our local storage adapter to the collection
			localStorage: { $ref: 'localstorage_todos' }
		}

	},

	// Application router
	// Changes the state of the application based on url routes
	router_app: {},


	//
	// Children Contexts
	//

	// An individual todo context specification
	context_todo: { wire: { spec: 'context/todo', defer: true, waitParent: true } }

} );