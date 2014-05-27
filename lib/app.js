var Gtalk = require('./gtalk');

function App() {
	var objetoGtalk = {};


	function validateArgumentsLength( arguments ) {		
		if ( arguments.length < 5 )
			return false;
		else
			return true;
	};

	function help(){
		console.log( '\t###############################################################');
		console.log('\t#                                                             #');
		console.log('\t#                           USAGE:                            #');
		console.log('\t# node app.js user@gmail.com userpasswd userToTalk@gmail.com  #');
		console.log('\t#                                                             #');
		console.log( '\t###############################################################');
	};

	function setInfoUSer ( user, pass, to ) {
		objetoGtalk = {
			jid: user,
			password: pass,
			host: 'talk.google.com',
			port: 5222,			
			to: to
		};
	};

	App.prototype.initApp = function( arguments ) {
		if ( validateArgumentsLength(arguments) ) {
			setInfoUSer(arguments[2], arguments[3], arguments[4]);
			var gtalk = new Gtalk( objetoGtalk );
			gtalk.init();
		} else {
			help();
		}
		
	};
}

function main() {
	var start = new App();
	start.initApp( process.argv );
}

main();