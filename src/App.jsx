import { useState } from "react";
import reactLogo from "./assets/react.svg";
import cardFront from "./assets/images/bg-card-front.png";
import cardBack from "./assets/images/bg-card-back.png";
import cardLogo from "./assets/images/card-logo.svg";

import "./App.css";

function App() {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "000000000000",
    holderName: "JANE APPLESEED",
    mm: "",
    yy: "",
    cvv: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) =>
    setCardDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  return (
    <div className="App">
      <div className="card-images">
        <div className="card-front">
          <img src={cardFront} alt="" />
          <img src={cardLogo} alt="" className="card-logo" />
          <div className="card-details">
            <p className="card-number">{cardDetails.cardNumber}</p>
            <p>
              <span>{cardDetails.holderName}</span>
              <span>{cardDetails.expiry}</span>
            </p>
          </div>
        </div>
        <img src={cardBack} alt="" className="card-back" />
      </div>
      <div className="form-card">
        <form action="" onSubmit={handleSubmit}>
          <div>
            <p> CARDHOLDER NAME</p>
            <input
              type="text"
              name="holderName"
              placeholder="e.g. Jane Appleseed"
              onChange={handleChange}
            />
          </div>
          <div>
            <p> CARD NUMBER</p>
            <input
              type="text"
              name="cardNumber"
              placeholder="e.g. 1234 5678 9123 0000 "
              onChange={handleChange}
            />
          </div>
          <div className="bottom-fieldset">
            <span className="expiry">
              <p>EXP. DATE (MM/YY)</p>
              <input type="text" name="month" placeholder="MM" />
              <input type="text" name="year" placeholder="YY" />
            </span>
            <span className="cvc">
              <p>CVC</p>
              <input type="text" name="cvv" placeholder="e.g. 123 " />
            </span>
          </div>
          <p>
            <input type="submit" value="Confirm" className="submit-button" />
          </p>
        </form>
      </div>
    </div>
  );
}

export default App;
