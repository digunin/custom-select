import { useState } from 'react'
import Select from '../select/Select'

function App() {
  const options = [
    { value: 0, text: '1' },
    { value: 1, text: '2' },
    { value: 2, text: '3' },
    { value: 3, text: '4' },
    { value: 4, text: '5' },
  ]

  const [selectedValues, setSelectedValues] = useState([])

  const handleClick = () => {}
  return (
    <div data-testid="app-id" className="App">
      <Select
        options={options}
        selectedValues={selectedValues}
        onclick={handleClick}
      />
      React
    </div>
  )
}

export default App
