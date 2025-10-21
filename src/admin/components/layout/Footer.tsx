const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-center">
            {currentYear} © <span className="footer-text">VZ Juspol Admin Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
