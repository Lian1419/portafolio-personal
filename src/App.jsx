
import { useState } from 'react'
import './App.css'

function App() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    mensaje: ''
  })

  const [estado, setEstado] = useState('')

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    })
  }

  const enviarMensaje = async (e) => {
    e.preventDefault()
    setEstado('Enviando...')

    try {
      const respuesta = await fetch('/api/mensajes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formulario)
      })

      const datos = await respuesta.json()

      if (!respuesta.ok) {
        throw new Error(datos.mensaje)
      }

      setEstado('¡Mensaje enviado correctamente!')
      setFormulario({
        nombre: '',
        correo: '',
        mensaje: ''
      })
    } catch (error) {
      setEstado('No se pudo enviar el mensaje. Intenta nuevamente.')
      console.error(error)
    }
  }

  return (
    <main className="portfolio">
      <nav className="navbar">
        <h2 className="logo">K<span>.</span></h2>

        <div className="nav-links">
          <a href="#inicio">Inicio</a>
          <a href="#sobre-mi">Sobre mí</a>
          <a href="#proyectos">Proyectos</a>
          <a href="#contacto">Contacto</a>
        </div>
      </nav>

      <section className="hero" id="inicio">
        <div className="hero-content">
          <p className="greeting">HOLA, SOY</p>
          <h1>Soy Kail Cordero, <span>estudiante de Ingeniería de Sistemas</span></h1>
          <h2>Desarrollador en formación</h2>

          <p className="description">
            Me interesa la tecnología, el desarrollo de software
            y la creación de soluciones mediante la programación.
          </p>

          <div className="hero-buttons">
            <a href="#proyectos" className="btn-primary">
              Ver proyectos
            </a>
            <a href="#contacto" className="btn-secondary">
              Contactarme
            </a>
          </div>
        </div>

        <div className="hero-card">
          <div className="code-icon">&lt;/&gt;</div>
          <h3>Desarrollando ideas</h3>
          <p>Transformando conocimientos en proyectos.</p>
        </div>
      </section>

      <section className="section" id="sobre-mi">
        <p className="section-label">CONÓCEME</p>
        <h2>Sobre mí</h2>
        <p>
          Soy estudiante de Ingeniería de Sistemas.
          Me encuentro desarrollando habilidades en programación,
          desarrollo web, bases de datos y tecnologías digitales.
        </p>
      </section>

      <section className="section" id="proyectos">
        <p className="section-label">MI TRABAJO</p>
        <h2>Proyectos</h2>

        <div className="project-card">
          <h3>Portafolio personal</h3>
          <p>Desarrollo de una página web personal utilizando React.</p>
          <span>React · JavaScript · CSS</span>
        </div>
      </section>

      <section className="section contact" id="contacto">
        <p className="section-label">HABLEMOS</p>
        <h2>Contacto</h2>
        <p>Si deseas comunicarte conmigo, puedes enviarme un mensaje.</p>

        <form className="contact-form" onSubmit={enviarMensaje}>
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
            required
          />

          <input
            type="email"
            name="correo"
            placeholder="Tu correo electrónico"
            value={formulario.correo}
            onChange={manejarCambio}
            required
          />

          <textarea
            name="mensaje"
            placeholder="Escribe tu mensaje"
            value={formulario.mensaje}
            onChange={manejarCambio}
            required
          />

          <button type="submit" className="btn-primary">
            Enviar mensaje
          </button>

          {estado && <p>{estado}</p>}
        </form>
      </section>

      <footer>
        © 2026 Kail Cordero. Todos los derechos reservados.
      </footer>
    </main>
  )
}

export default App
