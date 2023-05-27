const socket = io();

const payload = {
  mensaje: 'Hello world',
  uid: 123,
  fecha: 'Oct 27, 2022',
};

socket.on('connect', () => {
  console.log('connected', socket.id);
});

socket.emit('mensaje-de-cliente', payload, (data) => {
  console.log('Respuesta a tu mensaje', data);
});

socket.on('mensaje-de-server', (payload) => {
  console.log(payload);
});

socket.on('disconnect', () => {
  console.log('Disconnect');
});
