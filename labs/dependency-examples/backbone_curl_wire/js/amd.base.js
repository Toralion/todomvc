// Config options for the app
curl( {

	baseUrl: 'js/',

	urlArgs: 'bust=' + ( new Date() ).getTime(), // Pop that cache

	paths: {
		text: 'lib/curl/text',
		'wire/domReady': 'lib/curl/domReady'
	},
	
	packages: [
		{ name: 'backbone',   location: 'lib/backbone',   main: 'backbone' },
		{ name: 'underscore', location: 'lib/underscore', main: 'underscore' },
		{ name: 'jquery',     location: 'lib/jquery',     main: 'jquery' },
		{ name: 'wire',       location: 'lib/wire',       main: 'wire' },
		{ name: 'when',       location: 'lib/when',       main: 'when' },
		{ name: 'aop',        location: 'lib/aop',        main: 'aop' }
	]

} );