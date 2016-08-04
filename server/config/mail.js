var nodemailer = require("nodemailer");

smtpTransport = nodemailer.createTransport("SMTP",{
  service: "Gmail",
  auth: {
    user: "monika.sachdev@daffodilsw.com",
    pass: "sandeep16"
  }
});

var mailfunctions={};
mailfunctions.welcomemail = function(token,username,email){
  var path = "http://lr.com:5000/#/user/verify/"+token+"/"+email;
  var html = 'Hey '+username+' ,<br><br>Welcome to register with us. Please <a href='+path+'>Click here</a> to verify.';
  var subject = "Welcome Mail";
  mailfunctions.sendmail(email, subject,html);
}
mailfunctions.sendmail = function(to,subject,html ){
	mailOptions={
	  from: 'lr <monika.sachdev@daffodilsw.com>',
	  to : to,
	  subject : subject,
	  html : html
	};
	smtpTransport.sendMail(mailOptions, function(error, response){
		if(error){
			console.log("error",error);
		}else{
			console.log("mail response", response);
		}
	})
}
module.exports = mailfunctions;