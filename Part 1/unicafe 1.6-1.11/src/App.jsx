import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)


const App = () => {
  const [valueGood, setValueGood] = useState(0)
  const [valueNeutral, setValueNeutral] = useState(0)
  const [valueBad, setValueBad] = useState(0)
  const [all, setAll] = useState(0)
  
  const handleValueGood = () => {
    setValueGood(valueGood + 1)
    setAll(all+1)
  }

  const handleValueNeutral = () => {
    setValueNeutral(valueNeutral + 1)
    setAll(all+1)
  }

  const handleValueBad = () => {
    setValueBad(valueBad + 1)
    setAll(all+1)
  }

  const average = all === 0 ? 0 : (valueGood - valueBad) / all
  const positive = valueGood === 0 ? 0 : (valueGood / all *100)
  
  if (all === 0) {
    
    return (
       <div>
        <h1 style={{ fontWeight: 'bold', fontSize: '32px' }}>
          Give FeedBack
        </h1>

        <button onClick={handleValueGood}>Good</button>
        <button onClick={handleValueNeutral}>Neutral</button>
        <button onClick={handleValueBad}>Bad</button>

        <h1 style={{ fontWeight: 'bold', fontSize: '32px' }}>
          Statistics
        </h1>
        <p>No feedback given</p> 
      </div>
    )

  } else { 

    return (
      <div>

        <h1 style={{ fontWeight: 'bold', fontSize: '32px' }}>
          Give FeedBack
        </h1>

        <button onClick={handleValueGood}>Good</button>
        <button onClick={handleValueNeutral}>Neutral</button>
        <button onClick={handleValueBad}>Bad</button>

        <h1 style={{ fontWeight: 'bold', fontSize: '32px' }}>
          Statistics
        </h1>

  
        <table>
        <tbody>
            <StatisticLine text="Good" value={valueGood} />
            <StatisticLine text="Neutral" value={valueNeutral} />
            <StatisticLine text="Bad" value={valueBad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={average.toFixed(2)} />
            <StatisticLine text="positive" value={positive.toFixed(2) + " %"} />
          </tbody>
        </table>
      
      </div>
    )
  }
}

export default App