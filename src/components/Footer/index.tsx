function Footer() {
  return (
    <>
      <div className="container">
        <div className="row">
          <p className="text-center mb-2">
            Copyright &copy;
            {new Date().getFullYear()} JH Hair & Beauty Studio, Gadhinglaj. All Rights
            Reserved.
          </p>
          <p className="text-center text-sm">
            Designed & Developed by <a href="tel:+918484844401">Saquib Aowte</a>
            <span> & </span> <a href="tel:+919588623393">Akshay Sutar</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
