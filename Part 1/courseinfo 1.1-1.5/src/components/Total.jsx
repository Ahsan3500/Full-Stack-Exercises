const Total = ({ parts }) => {
  const total = parts[0].exercises + parts[1].exercises + parts[2].exercises

  return <p><strong>Total {total}</strong></p>
}

export default Total
