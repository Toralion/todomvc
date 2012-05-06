//
// Application Specification
//

define( {

	plugins: [
		{ module: 'wire/debug', trace: { pointcut: /^((?!(model$|constructor$|template|_)).*)$/ } }, // Stop constructor, model or anything beginning with _ being wrapped by the debugger
		{ module: 'wire/jquery/dom' }
	],


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
	collection_todos: {},

	// Application router
	// Changes the state of the application based on url routes
	router_app: {}

} );