import { useState } from 'react'

const StatisticLine = ({ text, value, percentage }) => {
  return (
    <tr>
      <td>{text}</td> <td>{value} {percentage === true ? "%" : ""} </td>
    </tr>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const weightedScore = (good + bad * -1) / total;
  const amountOfPositive = good / total * 100;

  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} percentage={false} />
          <StatisticLine text="Neutral" value={neutral} percentage={false} />
          <StatisticLine text="Bad" value={bad} percentage={false} />
          <StatisticLine text="In total" value={total} percentage={false} />
          <StatisticLine text="Average" value={weightedScore} percentage={false} />
          <StatisticLine text="Positive" value={amountOfPositive} percentage={true} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGoodByOne = () => setGood(good + 1)
  const decreaseGoodByOne = () => setGood(good - 1)

  const increaseNeutralByOne = () => setNeutral(neutral + 1)
  const decreaseNeutralByOne = () => setNeutral(neutral - 1)

  const increaseBadByOne = () => setBad(bad + 1)
  const decreaseBadByOne = () => setBad(bad - 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button handleClick={increaseGoodByOne} text="Good" />
        <Button handleClick={increaseNeutralByOne} text="Neutral" />
        <Button handleClick={increaseBadByOne} text="Bad" />
      </div>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )

}

export default App
