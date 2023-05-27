const Message = require('../models/MessageScheme');
const mongoose = require('mongoose');

const crearMessage = async (messageContent) => {
  jsonContent = JSON.parse(messageContent);
  const message = new Message(jsonContent);
  try {
    const saved = await message.save();
    console.log(`ok: true, message: ${saved}`);
  } catch (error) {
    console.log(error);
  }
};

// const listarMessages = async (req, res = express.request) => {
//   const mesagges = await Message.find(); //.populate("user", "name");
//   try {
//     res.status(200).json({
//       ok: true,
//       mesagges,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       ok: false,
//       msg: 'Error Interno',
//     });
//   }
// };

module.exports = {
  // listarMessages,
  crearMessage,
};
