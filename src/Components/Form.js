import React, { useState } from "react";
import { Button, Form, Alert, Card } from "react-bootstrap";

// const randomNumber = Math.floor(Math.random() * 100);

function NumberGusessForm() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [tries, setTries] = useState(10);
  const [show, setShow] = useState(false);
  const [numbers, setNumbers] = useState("");
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 100)
  );
  const [variant, setVariant] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };
  const insertNum = (e) => {
    e.preventDefault();
    if (message === "GAME OVER!") {
      return;
    }
    setTries(tries - 1);
    setNumbers((numbers) => numbers + input + ", ");
    if (input > randomNumber) {
      setMessage("UPS! The last guess was too high!");
      setVariant("danger");
      if (tries === 1) {
        setMessage("GAME OVER!");
        setVariant("warning");
        setShow(true);
      }
    } else if (input < randomNumber) {
      setMessage("UPS! The last guess was too low!");
      setVariant("info");
      if (tries === 1) {
        setMessage("GAME OVER!");
        setVariant("warning");
        setShow(true);
      }
    } else {

      setMessage("Congratulations! You got it right!");
      setVariant("success");
      setShow(true);
    }
    setInput("");
  };
  const restart = () => {
    setTries(10);
    setMessage("");
    setInput("");
    setVariant("");
    setNumbers("");
    setShow(false);
  };
  const clear = () => {
    setInput("");
  };

  const startNewGame = () => {
    setTries(10);
    setMessage("");
    setInput("");
    setNumbers("");
    setVariant("");
    setShow(false);
    setRandomNumber(Math.floor(Math.random() * 100));
  };
  return (
    <div className="center">
      <Card style={{ width: "36rem" }}>
        <form onSubmit={insertNum} onReset={restart}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Enter a number: </Form.Label>
            <Form.Control
              type="number"
              value={input}
              onChange={handleChange}
              required
              min={0}
              max={100}
            />
          </Form.Group>
          <div className="buttons">
            <div id="btn-left">
              <Button type="submit" variant="primary">
                Submit number
            </Button>{" "}

              <Button
                variant="primary"
                type="button"
                onClick={() => clear()}>
                Clear
            </Button>{" "}

              <Button variant="primary" type="reset">
                Reset
            </Button>{" "}
            </div>
            <hr />
            <div className="remain">
              <Alert variant="primary">Remaining attempts: {tries}</Alert>
            </div>
            <div className="guesses" >Previous guesses: {numbers}
            </div>
            <div className="ups">
              <Alert variant={variant}>{message}</Alert></div>
            <div className="newgame">
              {show ? (
                <Button onClick={startNewGame} variant="primary">
                  Start new game
                </Button>
              ) : null}
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default NumberGusessForm;