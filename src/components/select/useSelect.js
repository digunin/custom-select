import { useState } from 'react'
import { toggleValue, insertSubarray } from '../../utils'

function useSelect(options, selectedValues, onchange, multiple, disabled) {
  const [lastValue, setLastValue] = useState(false)

  let valuesIndexes = {}
  options.forEach((option, i) => {
    let key = Array.isArray(option) ? option[0] : option
    valuesIndexes[key] = i
  })

  let selectedIndexes = selectedValues.map((value) => valuesIndexes[value])

  function getNewValues(newIndexes) {
    return Object.entries(valuesIndexes)
      .filter(([_, index]) => newIndexes.includes(index))
      .map(([value, _]) => value)
  }

  function onclick(value, shiftKey) {
    if (disabled) {
      return
    }

    if (!multiple) {
      console.log(value)
      onchange([value])
      return
    }

    if (shiftKey && lastValue !== false) {
      let start = valuesIndexes[lastValue]
      let end = valuesIndexes[value]

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
      for (let i = start; i <= end; i++) acc.push(i)

      setLastValue(false)
      let newSelectedIndexes = insertSubarray(selectedIndexes, acc)
      onchange(getNewValues(newSelectedIndexes))
    } else {
      setLastValue(value)
      let newSelectedIndexes = toggleValue(
        selectedIndexes,
        valuesIndexes[value]
      )
      onchange(getNewValues(newSelectedIndexes))
    }
  }

  return { onclick }
}

export default useSelect
