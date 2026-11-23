
const request = require('supertest')
const app = require('../server')
const pool = require('../db')

describe('Pruebas de integración con PostgreSQL', () => {
  const correoPrueba = 'integracion@prueba.com'

  beforeAll(async () => {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS mensajes (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        correo VARCHAR(150) NOT NULL,
        mensaje TEXT NOT NULL,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await pool.query(
      'DELETE FROM mensajes WHERE correo = $1',
      [correoPrueba]
    )
  })

  afterAll(async () => {
    await pool.query(
      'DELETE FROM mensajes WHERE correo = $1',
      [correoPrueba]
    )

    await pool.end()
  })

  test('Debe conectar correctamente con PostgreSQL', async () => {
    const respuesta = await request(app).get('/api/database')

    expect(respuesta.statusCode).toBe(200)
    expect(respuesta.body.mensaje).toBe(
      'Conexión con PostgreSQL exitosa'
    )
  })

  test('Debe guardar un mensaje en PostgreSQL', async () => {
    const respuesta = await request(app)
      .post('/api/mensajes')
      .send({
        nombre: 'Prueba Integración',
        correo: correoPrueba,
        mensaje: 'Mensaje de prueba automatizada'
      })

    expect(respuesta.statusCode).toBe(201)
    expect(respuesta.body.datos.correo).toBe(correoPrueba)
  })

  test('Debe consultar el mensaje guardado en PostgreSQL', async () => {
    const respuesta = await request(app).get('/api/mensajes')

    expect(respuesta.statusCode).toBe(200)

    const mensajeEncontrado = respuesta.body.find(
      mensaje => mensaje.correo === correoPrueba
    )

    expect(mensajeEncontrado).toBeDefined()
    expect(mensajeEncontrado.nombre).toBe('Prueba Integración')
  })
})
