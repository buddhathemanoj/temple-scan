import React from "react";
import LOogo from '../Assests/lord-murugan-clipart-png.png'

const Navbar = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'fixed', width: '100%', background: '#E9B824', zIndex: 1000 }}>
      <img src={LOogo} alt="logo" style={{ height: "70px", width: '60px' }} />
      <h2 className="custom-logo-head-navav">ARLUMIGU THANDAYUTHAPANI KOVIL</h2>
    </div>
  );
};

export default Navbar;
