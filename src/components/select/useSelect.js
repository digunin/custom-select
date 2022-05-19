import { useState } from 'react'
import { toggleValue, insertSubarray } from '../../utils'

function useSelect(selectedValues, onchange, multiple, disabled) {
  const [lastValue, setLastValue] = useState(false)

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
      for (let i = start; i <= end; i++) acc.push(i)

      setLastValue(false)
      onchange(insertSubarray(selectedValues, acc))
    } else {
      setLastValue(value)
      onchange(toggleValue(selectedValues, value))
    }
  }

  return { onclick }
}

export default useSelect
