const PersonForm = ({
  onSubmit,
  newName,
  newNumber,
  onNameChange,
  onNumberChange
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:
        <input
          value={newName}
          onChange={onNameChange}
        />
      </div>
      <div>
        number:
        <input
          value={newNumber}
          onChange={onNumberChange}
        />
      </div>
      <button className = "large-button" type="submit">add</button>
    </form>
  )
}

export default PersonForm
