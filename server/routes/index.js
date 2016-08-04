module.exports = function(app) {
	app.use('/api/install' , require('./install'));
	app.use('/api/users' , require('./users'));
	app.use('/api/roles' , require('./roles'));
	app.use('/api/menus' , require('./menus'));
	app.use('/api/taxonomy' , require('./taxonomy'));
	app.use('/api/contenttype' , require('./contenttype'));
	app.use('/api/content' , require('./content'));
	app.use('/api/node_weight' , require('./node_weight'));
	app.use('/api/import' , require('./import'));
	app.use('/api' , require('./airplay_charts'));
}