
const request = require('supertest')
const app = require('../server')

describe('Pruebas del servidor backend', () => {

  test('Debe responder correctamente en la ruta principal', async () => {
    const respuesta = await request(app).get('/')

    expect(respuesta.statusCode).toBe(200)
    expect(respuesta.body.estado).toBe('OK')
  })

  test('Debe mostrar el mensaje de bienvenida', async () => {
    const respuesta = await request(app).get('/api/saludo')

    expect(respuesta.statusCode).toBe(200)
    expect(respuesta.body.mensaje).toBe('Bienvenido a mi portafolio personal')
  })

  test('Debe rechazar mensajes con campos vacíos', async () => {
    const respuesta = await request(app)
      .post('/api/mensajes')
      .send({
        nombre: '',
        correo: '',
        mensaje: ''
      })

    expect(respuesta.statusCode).toBe(400)
    expect(respuesta.body.mensaje).toBe('Todos los campos son obligatorios')
  })

})
