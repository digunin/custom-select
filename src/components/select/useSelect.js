import { useEffect, useState } from 'react'

function useSelect(selectedValues, onchange) {
  const [selectedOptions, setSelectedOptions] = useState([])

  function toggleValue(value) {
    let index = selectedOptions.indexOf(value)
    if (index === -1) {
      selectedOptions.push(value)
      setSelectedOptions([...selectedOptions])
    } else {
      selectedOptions.splice(index, 1)
      setSelectedOptions([...selectedOptions])
    }
  }

  useEffect(() => {
    setSelectedOptions([...selectedValues])
  }, [JSON.stringify(selectedValues)])

  function onclick(value, text) {
    toggleValue(value)
    onchange([...selectedOptions])
  }

  return { onclick, selectedOptions }
}

export default useSelect
