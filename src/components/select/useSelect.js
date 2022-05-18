import { useEffect, useState } from 'react'

function useSelect(selectedValues, onchange, multiple, disabled) {
  const [lastValue, setLastValue] = useState(false)

  function toggleValue(value) {
    let index = selectedValues.indexOf(value)
    if (index === -1) {
      selectedValues.push(value)
      onchange([...selectedValues])
    } else {
      selectedValues.splice(index, 1)
      onchange([...selectedValues])
    }
  }

  // useEffect(() => {
  //   setLastValue(false)
  // }, [JSON.stringify(selectedValues)])

  function onclick(value, shiftKey) {
    if (disabled) {
      return
    }
    if (!multiple) {
      onchange([value])
      return
    }
    if (shiftKey && lastValue !== false) {
      let start = lastValue
      let end = value
      if (!selectedValues.includes(lastValue)) {
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
        if (!selectedValues.includes(i)) {
          acc.push(i)
        }
      }
      setLastValue(false)
      onchange([...selectedValues, ...acc])
    } else {
      setLastValue(value)
      toggleValue(value)
    }
  }

  return { onclick }
}

export default useSelect
