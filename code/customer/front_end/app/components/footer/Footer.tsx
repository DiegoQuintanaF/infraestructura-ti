export const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container grid grid-cols-1 gap-4 py-4 md:grid-cols-3">
        <div>
          <h3 className="pb-4 text-xl font-bold">Contacto</h3>
          <p className="text-sm">Calle: 123</p>
          <p className="text-sm">Tel: 123456789</p>
          <p className="text-sm">Email: contacto@emovie.com</p>
        </div>
        <div>
          <h3 className="pb-4 text-xl font-bold">Redes Sociales</h3>
          <p className="text-sm">Facebook</p>
          <p className="text-sm">Instagram</p>
          <p className="text-sm">Twitter</p>
        </div>
        <div>
          <h3 className="pb-4 text-xl font-bold">Acerca de nosotros</h3>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
            dolorem.
          </p>
        </div>
      </div>
    </footer>
  )
}
