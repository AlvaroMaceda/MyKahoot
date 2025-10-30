import './NotFound.css'

function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-message">¡Oops! esta página no existe.</p>
        <a className="notfound-home" href="/">Volver a la página principal</a>
      </div>
    </div>
  )
}

export default NotFound
