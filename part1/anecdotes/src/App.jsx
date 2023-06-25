import { useState } from 'react'

const getRand = () => {
  return Math.floor(Math.random() * 8);
}

const VoteQuote = (props) => {
  const { points, selected, setPoints } = props;

  const handleVoteClick = () => {
    const updatedPoints = [...points];
    updatedPoints[selected] += 1;
    setPoints(updatedPoints);
  };

  return (
    <div>
      <button onClick={handleVoteClick}>Vote +1</button>
    </div>
  )
}

const ChangeQuote = (props) => {
  return (
    <>
      <button onClick={() => props.setSelected(getRand())}>Next anecdote</button>
    </>
  )
}

const DisplayMostVotes = (props) => {
  const { anecdotes, points } = props;
  const max = Math.max(...points);
  const index = points.indexOf(max);

  return (
    <div>
      <h2>Anecdote with the most votes</h2>
      {anecdotes[index]}
      <p>{max} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);
  // fill an array with zeroes
  const [points, setPoints] = useState(Array(8).fill(0));
  console.log(points);
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <VoteQuote selected={selected} points={points} setPoints={setPoints} />
      <ChangeQuote setSelected={setSelected} />
      <DisplayMostVotes anecdotes={anecdotes} points={points} />
    </div>
  )
}

export default App