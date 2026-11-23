const express = require('express')
const cors = require('cors')
require('dotenv').config()


const pool = require('./db')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    mensaje: 'Servidor de Kail Cordero funcionando correctamente',
    estado: 'OK'
  })
})

app.get('/api/saludo', (req, res) => {
  res.json({
    mensaje: 'Bienvenido a mi portafolio personal'
  })
})

// Comprobar conexión con PostgreSQL
app.get('/api/database', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT NOW()')

    res.json({
      mensaje: 'Conexión con PostgreSQL exitosa',
      fecha: resultado.rows[0].now
    })
  } catch (error) {
    console.error('ERROR COMPLETO:', error)

    res.status(500).json({
      mensaje: 'Error al conectar con PostgreSQL',
      detalle: error.message,
      codigo: error.code
    })
  }
})
// Guardar mensajes del formulario de contacto
app.post('/api/mensajes', async (req, res) => {
  try {
    const { nombre, correo, mensaje } = req.body

    if (!nombre || !correo || !mensaje) {
      return res.status(400).json({
        mensaje: 'Todos los campos son obligatorios'
      })
    }

    const resultado = await pool.query(
      `INSERT INTO mensajes (nombre, correo, mensaje)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [nombre, correo, mensaje]
    )

    res.status(201).json({
      mensaje: 'Mensaje guardado correctamente',
      datos: resultado.rows[0]
    })
  } catch (error) {
    console.error('Error al guardar mensaje:', error.message)

    res.status(500).json({
      mensaje: 'Error al guardar el mensaje'
    })
  }
})
// Consultar mensajes guardados
app.get('/api/mensajes', async (req, res) => {
  try {
    const resultado = await pool.query(
      'SELECT * FROM mensajes ORDER BY fecha DESC'
    )

    res.json(resultado.rows)
  } catch (error) {
    console.error('Error al consultar mensajes:', error.message)

    res.status(500).json({
      mensaje: 'Error al consultar los mensajes'
    })
  }
})
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor backend funcionando en http://localhost:${PORT}`)
  })
}

module.exports = app