app.filter('htmlToPlaintext', function(){
	return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
})
app.filter('trim', function(){
	return function(text,length) {
      return  text ? String(text).substr(0,length) : '';
    };
})