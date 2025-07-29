
import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notifications from './components/Notifications'


const App = () => {

  const [persons, setPersons] = useState([])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')


  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const handleNameChange = (event) => {
  setNewName(event.target.value)
}

  const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}

  const handleFilterChange = (event) => {
  setFilter(event.target.value)
}

    const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Form submitted!')

    const existingPerson = persons.find( p => p.name === newName)

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    

      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber }
     
        
        personsService
          .update(existingPerson.id,updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')

            setMessage(`Changed number of ${newName}`)
            setMessageType('success')
            setTimeout(() => setMessage(null), 5000)

          })


        .catch(error => {
          alert(`Failed to update info for ${newName}. They may have been removed from the server.`)
          console.error(error)
          setMessageType('error')
          
          setMessageType('error')
          setTimeout(() => setMessage(null), 5000)
          setPersons(persons.filter(p => p.id !== existingPerson.id))
        })

      return 
      } else {
        return
      }
    }

    const newPerson = {
    name: newName,
    number: newNumber
}
    console.log('Creating person:', newPerson)
    personsService
      .create(newPerson)
      .then(returnedPerson => {
        console.log('Received from server:', returnedPerson)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')

        setMessage(`Added ${newName}`)
        setMessageType('success')
        setTimeout(() => setMessage(null), 5000)

      })

      .catch(error => {
        console.error('Failed to create person:', error)
  })
  }

  const handleDelete = (id, name) => {
  if (window.confirm(`Delete ${name}?`)) {
    personsService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))

         setMessage(`Deleted ${name}`)
         setMessageType('success')
         setTimeout(() => setMessage(null), 5000)
      })
      .catch(error => {
        setMessage(`Information of ${name} has already been removed from server`)
        setMessageType('error')
        setPersons(persons.filter(p => p.id !== id))
        setTimeout(() => setMessage(null), 5000)
      })
  }
}

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    
     <div>
      <h1>Phonebook</h1>
      <Notifications message={message} type={messageType} />
      <Filter
        filter={filter}
        onFilterChange={handleFilterChange}
      />

      <h2>Add a new</h2>

      <PersonForm
        onSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
       <Persons persons={personsToShow} onDelete={handleDelete}  />
    </div>
  )
}

export default App
