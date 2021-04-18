import React, { useState, useEffect } from "react";

const Statistics = (props) => {
  console.log();
  return (
    <div>
      <h1>statistics</h1>
      {Object.keys(props.stats).map((key, index) => {
        if (key === "total" && props.stats.total.length !== 0) {
          return (
            <p key={index}>
              {key} {props.stats[key].length}
            </p>
          );
        } else {
          return (
            <p key={index}>
              {key} {props.stats[key]}
            </p>
          );
        }
      })}
    </div>
  );
};

const App = () => {
  const [stats, setStats] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total: [],
    average: 0,
    positive: 0,
  });

  useEffect(() => calcPercentages(), [stats.total]);

  const calcPercentages = () => {
    if (stats.total.length !== 0) {
      const average = stats.total.reduce((a, b) => a + b) / stats.total.length;
      const percentPositive =
        (stats.total.filter((score) => score === 1).reduce((a, b) => a + b) /
          stats.total.length) *
        100;
      setStats({ ...stats, average: average, positive: percentPositive });
    }
  };

  const handleGoodClick = () => {
    setStats({
      ...stats,
      good: stats.good + 1,
      total: [...stats.total, 1],
    });
  };

  const handleNeutralClick = () => {
    setStats({
      ...stats,
      neutral: stats.neutral + 1,
      total: [...stats.total, 0],
    });
  };

  const handleBadClick = () => {
    setStats({
      ...stats,
      bad: stats.bad + 1,
      total: [...stats.total, -1],
    });
  };

  let feedback = <p>No feedback given</p>;

  if (stats.total.length !== 0) {
    feedback = <Statistics stats={stats} />;
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      {feedback}
    </div>
  );
};

export default App;
