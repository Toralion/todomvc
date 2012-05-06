//
// Todo Specification
//

define( {

	plugins: [
		{ module: 'wire/debug', trace: { pointcut: /^((?!(model$|constructor$|template|_)).*)$/ } }, // Stop constructor, model or anything beginning with _ being wrapped by the debugger
		{ module: 'wire/jquery/dom' }
	],


	//
	// Backbone modules
	//

	// Application view
	// Controls the interface elements for an individual todo
	view_todo: {},

	// Application collection
	// Holds the state for this todo
	model_todo: {}

} );