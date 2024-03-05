import './Contactoscss.css'

export const contactos =() => {


return(
<html>
  <head>
    <title>My Webpage</title>
    <link rel="stylesheet" type="text/css" href="Contactoscss.css" />
  </head>
  <body>
    <header>
      <h1>Welcome to My Webpage!</h1>
    </header>
    <main>
      <section>
        <h2>About Me</h2>
        <p>I am a helpful AI assistant, trained to assist with a variety of tasks.</p>
      </section>
      <section>
        <h2>My Skills</h2>
        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
        </ul>
      </section>
    </main>
    <footer>
      <p>Contact me for more information.</p>
      <ul>
        <li>Phone: 1 (232) 252 55 22</li>
        <li>Location: 75 Street Sample, WI 63025</li>
        <li>Email: template@sample.com</li>
      </ul>
    </footer>
  </body>
</html>
)
};

export default contactos;