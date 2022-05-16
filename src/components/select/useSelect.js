import { useEffect, useState } from 'react'

function useSelect(selectedValues, onchange, multiple) {
  const [selectedOptions, setSelectedOptions] = useState([])
  const [lastValue, setLastValue] = useState(false)

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

  function onclick(value, text, shiftKey) {
    if (!multiple) {
      setSelectedOptions([value])
      onchange([value])
      return
    }
    if (shiftKey && lastValue !== false) {
      let start = lastValue
      let end = value
      if (!selectedOptions.includes(lastValue)) {
        if (start < end) {
          start++
        } else if (start > end) {
          start--
        }
      }
      if (end < start) {
        ;[start, end] = [end, start]
      }
      let acc = []
      for (let i = start; i <= end; i++) {
        if (!selectedOptions.includes(i)) {
          acc.push(i)
        }
      }
      setLastValue(false)
      setSelectedOptions([...selectedOptions, ...acc])
      onchange([...selectedOptions, ...acc])
    } else {
      setLastValue(value)
      toggleValue(value)
      onchange([...selectedOptions])
    }
  }

  return { onclick, selectedOptions }
}

export default useSelect
