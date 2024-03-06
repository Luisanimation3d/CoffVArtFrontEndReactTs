import './Contactoscss.css'

export const contactos =() => {


return(
<html>
  <head>
    <title>My Webpage</title>
    <link rel="stylesheet" type="text/css" href="Contactoscss.css" />
    <script src="https://kit.fontawesome.com/b408879b64.js" crossOrigin="anonymous"></script>
  </head>
  <body className="custom-background">
    <div className="container">
        <div className="box-info">
            <h1>CONTÁCTATE CON NOSOTROS</h1>
            <div className="data">
                <p><i className="fas fa-phone"></i> +1 408 224 4587</p>
                <p><i className="fas fa-envelope"></i> livingcodedev@gmail.com</p>
                <p><i className="fa-solid fa-location-dot"></i> 30 Grant Ave San Francisco CA 94108-5834. USA</p>
            </div>
            <div className="links">
                <a href="https://www.facebook.com/people/Burdeo-caf%C3%A9/100086170725696/"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="https://www.instagram.com/burdeocafe/"><i className="fa-brands fa-instagram"></i></a>
                <a href="https://l.instagram.com/?u=https%3A%2F%2Fwa.me%2Fmessage%2FLISQXIUU5YHBB1&e=AT1_a6OowHZMFyHk-oQAb4OrrYPxrGr8DeEZYDCV9mBk6rPeOE9Aqf5ETEv2zA8jiv_LKdwVCyQIJBktLnd0uTaDhY05FbI3qMnOY_qwdiiIx5Dh"><i className="fab fa-whatsapp"></i></a>
            </div>
        </div>
        <form>
                <div className="input-box">
                  <input type="text" placeholder="Nombre y apellido" required></input>
                  <i className="fa-solid fa-user"></i>
                </div>
                <div className="input-box">
                  <input type="email" required placeholder="Correo electrónico" />
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="input-box">
                  <input type="text" placeholder="Asunto" />
                  <i className="fa-solid fa-pen-to-square"></i>
                </div>
                <div className="input-box">
                  <textarea placeholder="Escribe tu mensaje..."></textarea>
                </div>
                <button type="submit">Enviar mensaje</button>
              </form>
            </div>
</body>
</html>
)
};

export default contactos;