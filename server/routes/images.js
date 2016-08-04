var fs = require('fs');
var Busboy = require('busboy');
var domains = require('../config/domains');

module.exports =function(app,basepath){
	app.post("/upload/:path",function(req,res){

		if(!req.params.path || req.params.path == 'undefined' ){
			return res.status(200).send('Folder name requried');
		}
	  var folderpath = basepath + "/public/"+req.params.path;
	  if (!fs.existsSync(folderpath)){
	      fs.mkdirSync(folderpath);
	  }
	  var busboy = new Busboy({ headers: req.headers });
	      var filepath="";
	      busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

	      	filename = filename.replace(/ /g,"_").toLowerCase();
    		filename = filename.replace(/[^a-z0-9_.]/g, '');
            if (fs.existsSync(basepath + "/public/"+req.params.path+"/"+filename)){
   	      	  var timestamp = Date.now();
	      	  filename =  filename.split('.');
	      	  filename[filename.length-2] = filename[filename.length-2] + timestamp;
	      	  filename =  filename.join('.');	
            }
	        filepath= "/"+req.params.path+"/"+filename;
	        var saveTo = basepath + "/public/"+req.params.path+"/"+filename;
	        file.pipe(fs.createWriteStream(saveTo));
	      });

	      busboy.on('finish', function() {
	      	console.log('comes to end');
	        res.writeHead(200, { 'Connection': 'close' });
	        if(req.headers.host == domains.admin){
		        funcNum = req.query.CKEditorFuncNum;
			    message = "File uploaded";
				filepath = "http://"+ domains.server+ filepath; 
				var script = "<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction('"+funcNum+"', '"+filepath+"', '"+message+"');</script>"
		        return res.end(script);
		    }else{
		        return res.end(filepath);
		    }
	      });
	      return req.pipe(busboy);
	})

	// List all files in a directory in Node.js recursively in a synchronous fashion
	app.get('/ckeditor/paths',function(req,res){
	var walkSync = function(dir, filelist) {
	  var fs = fs || require('fs'),
	      files = fs.readdirSync(dir);
	  filelist = filelist || [];
	  files.forEach(function(file) {
	    if (fs.statSync(dir + '/' + file).isDirectory()) {
	      filelist = walkSync(dir + '/' + file, filelist);
	    }
	    else {

	      var path = dir.replace('public/','');
	      path = 'http://localhost:3000/'+ path+"/";
	      var foldername =  dir.split('/')[dir.split('/').length -1];
	      	var ImageExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
	      	var extension = file.substr((file.lastIndexOf('.') + 1)).toLowerCase();
	      	if(ImageExtension.indexOf(extension) > -1){
		        var imagejson =   {
		            "image": path + file ,
		            "thumb": path + file ,
		            "folder": foldername
		          };

			      filelist.push(imagejson);
	      	}

	    }
	  });
	  return filelist;
	};
	res.json(walkSync('public'));
	})


}
