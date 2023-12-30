import React from 'react'
import Logo from './Assests/lord-murugan-clipart-png.png'
import "./Home.css"
import { Link } from 'react-router-dom'
import Button from "@mui/material/Button";



const Home = () => {
  return (
    <div className="backimg">
      <h2 className="custom-logo-head">ARLUMIGU THANDAYUTHAPANI KOVIL</h2>
      <h2 className="custom-logo-head">அருள்மிகு தண்டாயுதபாணி கோவில்</h2>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "16px" }}>
        <img src={Logo} alt="murugan" style={{ width: '180px', height: '230px' }} />
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <Link to="/scanner">
          <Button variant="contained" color="primary" style={{ marginTop: "16px", width: "300px" }}>
            Scan
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Home