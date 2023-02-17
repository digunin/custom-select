import { useState } from 'react'
import Select from '../select/Select'
import { mockOptions } from '../../utils'

function App({ disabled = false, multiple = true }) {
  const [selectedValues, setSelectedValues] = useState([
    'V-1',
    'V-2',
    'V-3',
    'V-6',
    'V-7',
    'V-8',
  ])
  const [options, setOptions] = useState(mockOptions)

  const handleClick = (arr) => {
    setSelectedValues([...arr])
  }
  return (
    <div data-testid="app-id" className="App">
      <button
        data-testid="set-10-button"
        onClick={() => {
          setOptions(mockOptions)
          setSelectedValues(['V-5', 'V-6', 'V-7', 'V-8'])
        }}
      >{`set 10 old selected`}</button>
      <br />
      <br />
      <button
        data-testid="set-5-button"
        onClick={() => {
          setOptions(mockOptions.slice(0, 5))
          setSelectedValues(['V-2', 'V-3', 'V-5'])
        }}
      >{`set 5 new options`}</button>
      <br />
      <br />
      <Select
        options={options}
        selectedValues={selectedValues}
        onchange={handleClick}
        disabled={disabled}
        multiple={multiple}
      />
      <br />
      <label data-testid="label-id">{`-${selectedValues.join(',')}-`}</label>
    </div>
  )
}

export default App
