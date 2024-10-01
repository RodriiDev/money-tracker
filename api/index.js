const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Transaccion = require('./Models/transaccion.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());
app.get('/api/test', (req ,res) => {
    res.json({body: 'test ok'});
});

app.post('/api/transaccion', async (req,res) => {
    await mongoose.connect(process.env.MONGO_URL)
    const {nombre,descripcion,datetime,precio} = req.body;
    const transaccion = await Transaccion.create({nombre,descripcion,datetime,precio})
    res.json(transaccion);
})

app.get('/api/transacciones', async (req,res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const transacciones = await Transaccion.find();
    res.json(transacciones);
})

app.listen({port: 4040})
