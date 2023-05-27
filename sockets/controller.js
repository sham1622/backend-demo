const mongoose = require('mongoose');
const { crearMessage, listarMessages } = require('../Controllers/Message.js');
const usuarios = [];

const socketController = (socket, io) => {
  usuarios.push(socket.id);
  console.log('Nuevo cliente Conectado', socket.id);
  io.emit('usuarios-activos', usuarios);

  socket.on('disconnect', () => {
    usuarios.splice(usuarios.indexOf(socket.id), 1);
    console.log('Cliente Desconectado', socket.id);
  });

  socket.on('broadcast-message', (msg) => {
    console.log(`${socket.id}, ${msg}`);
    crearMessage(msg);
    io.emit('broadcast-message', msg);
  });

  socket.on('mensaje-de-cliente', (payload, callback) => {
    callback('TU mensaje fue recibido!!');
    payload.from = 'desde el server';
    socket.broadcast.emit('mensaje-de-server', payload);
  });

  socket.on('enviar-mensaje', ({ to, from, mensaje }) => {
    if (to) socket.to(to).emit('recibir-mensaje', { to, from, mensaje });
    else io.emit('recibir-mensaje', { from, mensaje });
  });
};

module.exports = { socketController };
