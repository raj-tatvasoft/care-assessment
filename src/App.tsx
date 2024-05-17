import { useState } from "react";

function App() {
  const [postCode1, setPostCode1] = useState("");
  const [postCode2, setPostCode2] = useState("");

  const [result, setResult] = useState("");

  const handleCalculateJourney = () => {
    if (postCode1 && postCode2) {
      fetch(
        `https://media.carecontrolsystems.co.uk/Travel/JourneyPlan.aspx?Route=${postCode1},${postCode2}`
      )
        .then((res) => {
          return res.text();
        })
        .then((res) => {
          setResult(res);
        });
    } else {
      alert("Please enter value first.");
    }
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="Enter Postcode 1"
          value={postCode1}
          onChange={(e) => setPostCode1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Postcode 2"
          value={postCode2}
          onChange={(e) => setPostCode2(e.target.value)}
        />
      </div>
      <br />
      <div>
        <button type="button" onClick={handleCalculateJourney}>
          Calculate Journey
        </button>
      </div>
      {result && (
        <ul>
          {result.split(",").map((x, i) => (
            <li key={i}>
              {x.replace(";", "")} &nbsp;
              {i === 0 ? "minutes of travel time" : "miles of travel"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
