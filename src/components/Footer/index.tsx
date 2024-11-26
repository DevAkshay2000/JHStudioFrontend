function Footer() {
  return (
    <>
      <div className="container">
        <div className="row">
          <p className="text-center mb-2 font-serif">
            Copyright &copy;
            {new Date().getFullYear()} JH Hair & Beauty Studio, Gadhinglaj. All Rights
            Reserved.
          </p>
          <p className="text-center text-xs font-mono">
            Designed & Developed by <a href="https://www.linkedin.com/in/saquibaowte" target="_blank">Saquib Aowte</a>
            <span> & </span> <a href="https://www.linkedin.com/in/akshay-sutar-392199210/" target="_blank">Akshay Sutar</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
