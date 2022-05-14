import { useState } from 'react'
import Select from '../select/Select'
import { mockOptions } from '../../utils'

function App() {
  const [selectedValues, setSelectedValues] = useState([0, 1, 2, 5, 6, 7])

  const handleClick = (arr) => {}
  return (
    <div data-testid="app-id" className="App">
      <Select
        options={mockOptions}
        selectedValues={selectedValues}
        onchange={handleClick}
      />
      React
    </div>
  )
}

export default App
