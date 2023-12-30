import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineCameraswitch } from "react-icons/md";
import { retrieveDataById } from "./firebaseuttils";
import QrReader from "react-qr-reader";
import "./App.css";

const Scanner = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(null);
  const [showDialog, setDialog] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [precScan, setPrecScan] = useState("");
  const [selected, setSelected] = useState("environment");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleScan = async (scanData) => {
    if (scanData && scanData !== "" && !showDialog && !processing) {
      console.log(`loaded >>>`, scanData);
      setSelected("");
      setPrecScan(scanData);

      try {
        const data = await retrieveDataById(scanData);
        if (data && data !== null) {
          navigate(`/details/${scanData}`, { state: { data } });
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
    setSelected(selected === "rear" ? "user" : "environment");
  };

  return (
    <div className="App">
      <h2 className="custom-logo-head">
        ARLUMIGU THANDAYUTHAPANI KOVIL
      </h2>
      <h2 className="custom-logo-head">அருள்மிகு தண்டாயுதபாணி கோவில்</h2>

      <div className="camerabox">
        {!showDialog && !processing && (
          <QrReader
          style={{ width: "300px" }}

            facingMode={selected}
            delay={500}
            onError={handleError}
            onScan={handleScan}
          />
        )}
        <button onClick={toggleCamera} className="camera-toggle-button">
          <MdOutlineCameraswitch />
        </button>
      </div>
    </div>
  );
};

export default Scanner;
