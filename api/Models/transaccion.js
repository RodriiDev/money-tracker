const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const TransaccionSchema = new Schema( {
    nombre: {type: String, required: true},
    precio: {type: Number, required: true},
    descripcion: {type: String, required:true},
    datetime: {type: Date, required: true},
});

const TransaccionModel = model('Transaccion', TransaccionSchema)

module.exports = TransaccionModel