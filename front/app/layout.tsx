import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="page">
      <div className="nose">
        <head>
          <h3 style={{ color: "yellow" }}>VAMOS CON TODA!</h3>
          <h1>
            Prueba freelance <br></br> Fullsatck
          </h1>
          <script src="https://cdn.tailwindcss.com" defer></script>
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
            rel="stylesheet"
          />
        </head>
        <body>
          <header>
            <div className="containerBotones">
              <h5>Typescript</h5>
              <h5>SQL</h5>
              <h5>Node JS</h5>
              <h5>React JS</h5>
              <h5>Next JS</h5>
              <h5>Strapi</h5>
            </div>
          </header>
          <main>{children}</main>
          <footer>
            <p>© 2024 Mi Aplicación</p>
          </footer>
        </body>
      </div>
    </html>
  );
}
