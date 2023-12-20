//Servidor express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //Http Server
        this.server = http.createServer( this.app );

        //Configuraciones de sockets
        this.io = socketio(this.server, {/* Configuraciones */});

    }

    middlewares(){
        //Desplegar directorio publico
        this.app.use( express.static( path.resolve(__dirname, '../public')));

        //Habilitar Cors
        this.app.use(cors());
    }

    configurarSockets(){
        new Sockets(this.io);
    }

    execute(){
        this.middlewares();
        this.configurarSockets();
        this.server.listen(this.port, () => {
            console.log('Server corriendo en el puerto:', this.port);
        });
    }
}

module.exports = Server;