var xmpp = require('simple-xmpp');


function Gtalk( objGtalk ) {
	var gtalk = objGtalk,
		to = objGtalk.to;


	function xmppGtalk () {
		xmpp.connect({
			jid: gtalk.jid,
			password: gtalk.password,
			host: gtalk.host,
			port: gtalk.port
		});

		xmpp.on('online', function ( data ) {
			console.log('Conectado no Gtalk usuario ' + gtalk.jid);
			console.log('Envie as mensagens...:)\n');
		});

		xmpp.on('error', function ( err ) {
			console.log('Erro na comunicação ' + err );
		});

		xmpp.on('chat', function ( from, message ) {
			console.log('From: ' + from + ' : ' + message  );
			if ( message === 'fim') {
				console.log('Chat finalizado\n');
				process.exit();

			}
		});
		
		xmpp.on('close', function() {
    		console.log('connection has been closed!');
		});


		process.stdin.on('readable', function() {
		    var chunk = process.stdin.read();
        	if (chunk !== null) {  
        		console.log('Tamanho string '+ chunk.length);
        		if (chunk !== 'fim\n') {
            		xmpp.send(to, chunk);
            	} else {            	
            		console.log('Chat Finalizado');
            		process.exit(0);
            	}
        	}
		});
	};

	Gtalk.prototype.init = function( ) {
		process.stdin.setEncoding('utf8');
		console.log('\n\tAguarde iniciando conexão com Gtalk\n\n');		
		xmppGtalk();
	};
}

module.exports = function( objGtalk ) {
	return new Gtalk( objGtalk );
}

