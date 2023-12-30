import React from "react";
import { useState } from "react";
import QrScanner from "react-qr-scanner";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { MdOutlineCameraswitch } from "react-icons/md";
import { retrieveDataById } from "./firebaseuttils";
const Scanner = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(null);
  const [showDialog, setDiaglog] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [precScan, setPrecScan] = useState("");
  const [selected, setSelected] = useState("rear");
  const [errorMessage, setErrorMessage] = useState(null);

  // const handleScan = async (scanData) => {
  //   console.log(`loaded data data`, scanData);

  //   if (scanData && scanData !== "" && !showDialog && !processing) {
  //     console.log(`loaded >>>`, scanData.text);
  //     setSelected("");
  //     setPrecScan(scanData.text);
  //   }
  // };
  const handleScan = async (scanData) => {

    if (scanData && scanData !== "" && !showDialog && !processing) {
      console.log(`loaded >>>`, scanData.text);
      setSelected("");
      setPrecScan(scanData.text);

      try {
        const data = await retrieveDataById(scanData.text);
        if (data && data !== null) {
          navigate(`/details/${scanData.text}`, { state: { data } });

        }
        console.log("Data retrieved from Firestore:", data);
      } catch (error) {
        console.error("Error retrieving data from Firestore:", error);
      }
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  const toggleCamera = () => {
    setSelected((prevSelected) => (prevSelected === "rear" ? "front" : "rear"));
  };

  return (
    <div className="App">
      <h2 className="custom-logo-head">ARLUMIGU THANDAYUTHAPANI KOVIL</h2>
      <h2 className="custom-logo-head">அருள்மிகு தண்டாயுதபாணி கோவில்</h2>
      <h2>Last Scan:{precScan} {selected}</h2>



      <div className="camerabox">
        {!showDialog && !processing && (
          <QrScanner
            facingMode={selected}
            delay={500}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%" }}
            legacyMode={false}
          />
        )}
        <button onClick={toggleCamera} className="camera-toggle-button">
          {selected === "rear" ? <MdOutlineCameraswitch /> : <MdOutlineCameraswitch />}
        </button>
      </div>

    </div>
  );
};

export default Scanner;
