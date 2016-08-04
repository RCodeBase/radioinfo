var gulp = require('gulp'); 
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');



var client = {};
client.css = {};
client.css.bower = ['../client/bower_components/bootstrap/dist/css/bootstrap.css',
			 		'../client/bower_components/ng-dialog/css/ngDialog.css',
			 		'../client/bower_components/ng-dialog/css/ngDialog-theme-default.css',
			 		'../client/bower_components/flexslider/flexslider.css',
			 		'../client/bower_components/angular-ticker/release/ticker.css',
			 		]
client.css.custom = ['../client/css/custom.css'];

client.js = {};
client.js.bower = ['../client/bower_components/jquery/dist/jquery.js',
				    '../client/bower_components/bootstrap/dist/js/bootstrap.js',
				    '../client/bower_components/angular/angular.js',
				    '../client/bower_components/angular-sanitize/angular-sanitize.js',
				    '../client/bower_components/ng-dialog/js/ngDialog.js',
				    '../client/bower_components/angular-ui-router/release/angular-ui-router.js',
				    '../client/bower_components/underscore/underscore.js',
				    '../client/bower_components/localStorageService/src/storageprovider.js',
				    '../client/bower_components/ng-ckeditor/libs/ckeditor/ckeditor.js',
				    '../client/bower_components/ng-ckeditor/ng-ckeditor.min.js',
				    '../client/bower_components/angular-recaptcha/release/angular-recaptcha.js',
				    '../client/bower_components/flexslider/jquery.flexslider.js',
				    '../client/bower_components/angular-flexslider/angular-flexslider.js',
				    '../client/bower_components/angular-ticker/release/ticker.js',
				]



var admin = {};
admin.css = {};

admin.css.bower = [ 
					'../admin/bower_components/bootstrap/dist/css/bootstrap.css',
					'../admin/bower_components/angular-ui-grid/ui-grid.min.css',
					'../admin/bower_components/ng-dialog/css/ngDialog.css',
					'../admin/bower_components/ng-dialog/css/ngDialog-theme-default.css',
					'../admin/bower_components/angular-tree-dnd/dist/ng-tree-dnd.min.css',
					'../admin/bower_components/ng-ckeditor/ng-ckeditor.css',
					'../admin/bower_components/ng-tags-input/ng-tags-input.css',
				]

admin.css.custom = [ 
						'../admin/theme/css/sb-admin.css',
						'../admin/theme/css/style.css'
					]
admin.js ={};
admin.js.bower=[
					"../admin/bower_components/jquery/dist/jquery.js",
					"../admin/bower_components/bootstrap/dist/js/bootstrap.js",
					"../admin/bower_components/angular/angular.js",
					"../admin/bower_components/angular-sanitize/angular-sanitize.js",
					"../admin/bower_components/ng-dialog/js/ngDialog.js",
					"../admin/bower_components/angular-ui-grid/ui-grid.js",
					"../admin/bower_components/ng-file-upload/ng-file-upload-shim.js",
					"../admin/bower_components/ng-file-upload/ng-file-upload.js",
					"../admin/bower_components/angular-ui-router/release/angular-ui-router.js",
					"../admin/bower_components/angular-tree-dnd/dist/ng-tree-dnd.min.js",
					"../admin/bower_components/underscore/underscore.js",
					"../admin/bower_components/localStorageService/src/storageprovider.js",
					"../admin/bower_components/ng-ckeditor/libs/ckeditor/ckeditor.js",
					"../admin/bower_components/ng-ckeditor/ng-ckeditor.min.js",
					"../admin/bower_components/ng-tags-input/ng-tags-input.js",
					"../admin/bower_components/ui-grid-draggable-rows/js/draggable-rows.js"
				]


//admin realted tasks
gulp.task('admin_bower_css', function() {
   return gulp.src(admin.css.bower)
       .pipe(concat('all-bower.css'))
       .pipe(minifyCSS({keepBreaks: true}))
       .pipe(gulp.dest('../admin/gulp'));
});


gulp.task('admin_custom_css', function() {
   return gulp.src(admin.css.custom)
       .pipe(concat('all-custom.css'))
       .pipe(minifyCSS({keepBreaks: true}))
       .pipe(gulp.dest('../admin/gulp'));
});

gulp.task('admin_bower_js', function() {
   return gulp.src(admin.js.bower)
       .pipe(concat('all-bower.js'))
       .pipe(gulp.dest('../admin/gulp'));
});

gulp.task('admin_custom_js', function() {
   return gulp.src(['../admin/js/**/*.js','../admin/screens/**/*.js'])
       .pipe(concat('all-custom.js'))
       .pipe(gulp.dest('../admin/gulp'));
});



//client related tasks
gulp.task('client_bower_css', function() {
   return gulp.src(client.css.bower)
       .pipe(concat('all-bower.css'))
       .pipe(minifyCSS({keepBreaks: true}))
       .pipe(gulp.dest('../client/gulp'));
});


gulp.task('client_custom_css', function() {
   return gulp.src(client.css.custom)
       .pipe(concat('all-custom.css'))
       .pipe(minifyCSS({keepBreaks: true}))
       .pipe(gulp.dest('../client/gulp'));
});

gulp.task('client_bower_js', function() {
   return gulp.src(client.js.bower)
       .pipe(concat('all-bower.js'))
       .pipe(gulp.dest('../client/gulp'));
});

gulp.task('client_custom_js', function() {
   return gulp.src(['../client/js/**/*.js','../client/screens/**/*.js'])
       .pipe(concat('all-custom.js'))
       .pipe(gulp.dest('../client/gulp'));
});

// Default Task
gulp.task('default', ['client_bower_css','client_custom_css','client_bower_js','client_custom_js','admin_bower_css','admin_custom_css','admin_custom_js','admin_bower_js']);