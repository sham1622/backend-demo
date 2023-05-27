const express = require('express');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
const { dbConnection } = require('../database/config');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { socketController } = require('../sockets/controller');
const { swaggerDocs: v1SwaggerDocs } = require('../swagger');

class BackendServer {
  constructor() {
    this.headers = {
      cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      },
    };
    //Crear Express APP
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.server = http.createServer(this.app);
    this.io = new Server(this.server, this.headers);
    // this.io = new Server(this.server);
    this.paths = {
      auth: '/api/auth',
      doc: '/',
      task: '/api/task',
    };

    this.connectToDB();
    this.sockets();
    this.addMiddlewares();
    this.setRoutes();
  }

  //Base Datos
  async connectToDB() {
    await dbConnection();
  }

  addMiddlewares() {
    // CORS
    this.app.use(cors());
    // Lectura y parseo del body
    this.app.use(express.json());
    // public folder
    this.app.use("/static", express.static('public'));
  }

  setRoutes() {
    //Rutas
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.doc, require('../routes/doc'));
    this.app.use(this.paths.task, require('../routes/task'));
  }

  sockets() {
    this.io.on('connection', (socket) => {
      console.log('conexion detectada');
      socketController(socket, this.io);
    });
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Servidor corriendo en http://localhost:${this.port}`);
      v1SwaggerDocs(this.app, this.port);
    });
  }
}

module.exports = BackendServer;
