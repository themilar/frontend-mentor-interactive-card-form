import {
  useEffect,
  useState,
  useRef,
  SyntheticEvent,
  FormEvent,
  ChangeEvent,
} from "react";
import cardFront from "./assets/images/bg-card-front.png";
import cardBack from "./assets/images/bg-card-back.png";
import cardLogo from "./assets/images/card-logo.svg";
import iconComplete from "./assets/images/icon-complete.svg";
import "./App.css";

interface InputType {
  name: string;
  value: string;
}
function App() {
  const cardInput = useRef<HTMLInputElement>(null);
  const initialCardState = {
    cardNumber: "0000000000000000",
    holderName: "JANE APPLESEED",
    month: "00",
    year: "00",
    cvv: "000",
  };
  const initialErrorState = {
    numbersOnly: true,
    blankNumericField: { month: false, year: false, cvv: false },
  };

  const [cardDetails, setCardDetails] = useState(initialCardState);
  const [confirmed, setConfirmed] = useState(false);
  const [inputErrors, setInputErrors] = useState(initialErrorState);

  const validateNumericValues = (value: string) =>
    /^\d+$/.test(value)
      ? setInputErrors((prev) => ({ ...prev, numbersOnly: true }))
      : setInputErrors((prev) => ({ ...prev, numbersOnly: false }));

  const validateBlankFields = (field: InputType) =>
    /\d+/.test(field.value)
      ? setInputErrors((prev) => ({
          ...prev,
          blankNumericField: {
            ...prev.blankNumericField,
            [field.name]: false,
          },
        }))
      : setInputErrors((prev) => ({
          ...prev,
          blankNumericField: { ...prev.blankNumericField, [field.name]: true },
        }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setConfirmed(!confirmed);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCardDetails((prev) => ({
      ...prev,

      [e.target.name]: e.target.value.toUpperCase(),
    }));
  const handleClick = (e: SyntheticEvent) => {
    setCardDetails(initialCardState), setConfirmed(!confirmed);
  };
  const handleBlur = (e: SyntheticEvent): void => {
    const target = e.target as typeof e.target & InputType;
    validateBlankFields(target);
  };
  useEffect(() => {
    validateNumericValues(cardDetails.cardNumber);
  }, [cardDetails.cardNumber]);

  useEffect(() => {
    cardInput.current?.focus();
    return () => {
      setInputErrors(initialErrorState);
    };
  }, [confirmed, cardInput]);

  return (
    <div className="App">
      <div className="card-images">
        <div className="card-front">
          <img src={cardFront} alt="front of the ATM card" />
          <img src={cardLogo} alt="ATM card logo" className="card-logo" />
          <div className="card-details">
            <p className="card-number">
              {cardDetails.cardNumber.replace(/\d{4}(?=.)/g, "$& ")}
            </p>
            <p>
              <span>{cardDetails.holderName}</span>
              <span>
                {cardDetails.month}/{cardDetails.year}
              </span>
            </p>
          </div>
        </div>
        <div className="card-back">
          <img src={cardBack} alt="back of the ATM card" />
          <p>{cardDetails.cvv}</p>
        </div>
      </div>
      {confirmed ? (
        <div className="confirmation">
          <img src={iconComplete} alt="completion icon" />
          <p>THANK YOU</p>
          <p>We've added your card details</p>
          <button onClick={handleClick}>Continue</button>
        </div>
      ) : (
        <div className="form-card">
          <form action="" onSubmit={handleSubmit}>
            <div>
              <p> CARDHOLDER NAME</p>
              <input
                type="text"
                name="holderName"
                placeholder="e.g. Jane Appleseed"
                onChange={handleChange}
                maxLength={24}
                ref={cardInput}
                required
              />
            </div>
            <div
              title="16 numeric characters are required"
              data-error={
                !inputErrors.numbersOnly ? "Wrong format. Numbers only" : ""
              }
            >
              <p> CARD NUMBER</p>
              <input
                type="text"
                name="cardNumber"
                placeholder="e.g. 1234 5678 9123 0000 "
                onChange={handleChange}
                pattern="[0-9]+"
                minLength={16}
                maxLength={16}
                data-error-border={!inputErrors.numbersOnly}
                inputMode="numeric"
                required
                // value={cardDetails.cardNumber}
              />
            </div>
            <div className="bottom-fieldset">
              <span className="expiry">
                <p>EXP. DATE (MM/YY)</p>
                <div
                  className="expiry"
                  data-error={
                    inputErrors.blankNumericField.month ||
                    inputErrors.blankNumericField.year
                      ? "Can't be blank"
                      : ""
                  }
                >
                  <input
                    type="text"
                    name="month"
                    placeholder="MM"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    pattern="[0-9]{2}"
                    maxLength={2}
                    data-error-border={inputErrors.blankNumericField.month}
                    inputMode="numeric"
                    required
                  />

                  <input
                    type="text"
                    name="year"
                    placeholder="YY"
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    pattern="[0-9]{2}"
                    maxLength={2}
                    data-error-border={inputErrors.blankNumericField.year}
                    inputMode="numeric"
                    required
                  />
                </div>
              </span>
              <span className="cvc">
                <div
                  data-error={
                    inputErrors.blankNumericField.cvv ? "Can't be blank" : ""
                  }
                >
                  <p>CVC</p>
                  <input
                    type="text"
                    name="cvv"
                    placeholder="e.g. 123 "
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    pattern="[0-9]{3}"
                    maxLength={3}
                    data-error-border={inputErrors.blankNumericField.cvv}
                    inputMode="numeric"
                    required
                  />
                </div>
              </span>
            </div>
            <p>
              <input type="submit" value="Confirm" className="submit-button" />
            </p>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
