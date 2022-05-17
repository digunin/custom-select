import { useState } from 'react'
import Select from '../select/Select'
import { mockOptions } from '../../utils'

function App({ disabled = false, multiple = true }) {
  const [selectedValues, setSelectedValues] = useState([0, 1, 2, 5, 6, 7])

  const handleClick = (arr) => {
    setSelectedValues([...arr])
  }
  return (
    <div data-testid="app-id" className="App">
      <Select
        options={mockOptions}
        selectedValues={selectedValues}
        onchange={handleClick}
        disabled={disabled}
        multiple={multiple}
      />
    </div>
  )
}

export default App
