import React, { useState, useEffect } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allReviews, setAllReviews] = useState([]);
  const [average, setAverage] = useState(0);

  useEffect(() => {
    if (allReviews.length !== 0) calcAverage(allReviews);
  });

  const calcAverage = (arr) => {
    const average = arr.reduce((a, b) => a + b) / arr.length;
    setAverage(average);
  };

  const handleGoodClick = () => {
    setGood(good + 1);
    setAllReviews((allReviews) => [...allReviews, 1]);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setAllReviews((allReviews) => [...allReviews, 0]);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
    setAllReviews((allReviews) => [...allReviews, -1]);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {allReviews.length}</p>
      <p>average {average}%</p>
    </div>
  );
};

export default App;
