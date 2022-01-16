const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3050;
const app = express();

app.use(cors());
app.use(bodyParser.json());

// MySQL
const connection = mysql.createConnection({
  host: "uleam.mysql.database.azure.com",
  user: "Dbaque",
  password: "Alexander98",
  database: "uleam"
  //port:3306
  //ssl:{ca:fs.readFileSync("{ca-cert filename}")}
});

// RUTAS PARA EL USO DE LA API

// 0. Raiz
app.get('/', (req, res) => {
  res.send('Bienvenidos a la API para el Sistema de Procesos de Solicitud y Validación de Documentos para Promociones y Recategorizaciones')
})

// 1. Lista de Usuarios
app.get('/usuarios', (req, res) => {
  const sql = "SELECT * FROM usuarios"
  connection.query(sql, (error, resultado)=>{
    if (error) throw error;
    if (resultado.length > 0){
      res.json(resultado)
    }else{
      res.send("No hay usuarios registrados")
    }
  })
})

// 2. Crear Usuario
app.post('/add', (req, res) => {
  const sql = "INSERT INTO usuarios SET ?"  
  const usuarioObj = {
    nombre: req.body.nombre,
    usuario: req.body.usuario,
    telefono: req.body.telefono,
    email: req.body.email,
    clave: req.body.clave
  }
  connection.query(sql, usuarioObj, error => {
    if (error) throw error;
    res.send("Usuario creado exitosamente")
  })
})

// 3. Actualizar Usuario
app.put('/update/:id', (req, res) => {
  const {id } = req.params
  const { nombre,usuario,telefono,email,clave } = req.body
  const sql = `UPDATE usuarios SET nombre='${nombre}', usuario='${usuario}', telefono='${telefono}', email='${email}', clave='${clave}' WHERE id = ${id}`
  connection.query(sql, error => {
    if (error) throw error;
    res.send("Usuario actualizado exitosamente")
  })
})

// 4. Eliminar Usuario
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params
  const sql = `DELETE FROM usuarios WHERE id = ${id}`
  connection.query(sql, error => {
    if (error) throw error;
    res.send("Usuario eliminado exitosamente")
  })
})

// 5. Buscar usuario por ID
app.get('/usuario/:id', (req, res) => {
  const {id} = req.params
  const sql = `SELECT * FROM usuarios WHERE id = ${id}`
  connection.query(sql, (error, resultado)=>{
    if (error) throw error;
    if (resultado.length > 0){
      res.json(resultado)
    }else{
      res.send("No existe ese usuario")
    }
  })
})

// 6. LOGIN con parametros de correo y clave 
app.post('/login', (req, res) => {
  const {email,clave} = req.body
  const sql = `SELECT * FROM usuarios WHERE email = '${email}' AND clave = '${clave}'`
  connection.query(sql, (error, resultado)=>{
    if (error) throw error;
    if (resultado.length > 0){
      res.json(resultado)
    }else{      
      res.send("vacio")
    }
  })
})

// 7. Crear Formulario para promociones
app.post('/formularioPromociones', (req, res) => {
  const sql = "INSERT INTO promociones SET ?"  
  const formularioObj = {
    nombreCompleto: req.body.nombreCompleto,
    cedula: req.body.cedula,
    senecyt: req.body.senecyt,
    telefono: req.body.telefono,
    email: req.body.email,
    cargoActual: req.body.cargoActual,
    cargoPostula: req.body.cargoPostula,
    fechaRegistro: req.body.fechaRegistro,
    documentos: req.body.documentos,
    titulos: req.body.titulos,
    certificados: req.body.certificados
  }
  connection.query(sql, formularioObj, error => {
    if (error) throw error;
    res.send("Formulario guardado exitosamente")
  })
})

// 8. Crear Formulario para recategorizacion
app.post('/formularioRecategorizacion', (req, res) => {
  const sql = "INSERT INTO recategorizaciones SET ?"  
  const formularioObj = {
    nombreCompleto: req.body.nombreCompleto,
    cedula: req.body.cedula,
    senecyt: req.body.senecyt,
    telefono: req.body.telefono,
    email: req.body.email,
    cargoActual: req.body.cargoActual,
    fechaRegistro: req.body.fechaRegistro,
    documentos: req.body.documentos,
    titulos: req.body.titulos,
    certificados: req.body.certificados
  }
  connection.query(sql, formularioObj, error => {
    if (error) throw error;
    res.send("Formulario guardado exitosamente")
  })
})

// 9. Lista de Formularios de Promociones
app.get('/promociones', (req, res) => {
  const sql = "SELECT * FROM promociones"
  connection.query(sql, (error, resultado)=>{
    if (error) throw error;
    if (resultado.length > 0){
      res.json(resultado)
    }else{
      res.send("vacio")
    }
  })
})

// 10. Lista de Formularios de Recategorizaciones
app.get('/recategorizaciones', (req, res) => {
  const sql = "SELECT * FROM recategorizaciones"
  connection.query(sql, (error, resultado)=>{
    if (error) throw error;
    if (resultado.length > 0){
      res.json(resultado)
    }else{
      res.send("vacio")
    }
  })
})

// 11. Crear nuevo contactanos
app.post('/contactanos', (req, res) => {
  const sql = "INSERT INTO contactanos SET ?"  
  const formularioObj = {
    nombre: req.body.nombre,
    email: req.body.email,
    asunto: req.body.asunto,
    mensaje: req.body.mensaje
  }
  connection.query(sql, formularioObj, error => {
    if (error) throw error;
    res.send("Formulario guardado exitosamente")
  })
})

connection.connect(error => {
  if(error) throw error;
  console.log("Conexion exitosa a la base de datos")
})

app.listen(PORT, () => console.log(`El servidor esta funcionando en el puerto ${PORT}`))