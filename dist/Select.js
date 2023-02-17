import { React, memo, useState } from 'react'

function NoMemoOption({ value, text, className }) {
  return (
    <div className={className} data-testid="single-option" value={value}>
      {text}
    </div>
  )
}

const Option = memo(NoMemoOption, (prev, next) => {
  return (
    prev.value === next.value &&
    prev.text === next.text &&
    prev.className === next.className
  )
})

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

function toggleValue(arr, value) {
  let index = arr.indexOf(value)
  if (index === -1) {
    arr = insertSubarray(arr, [value])
  } else {
    arr.splice(index, 1)
  }
  return arr
}

function insertSubarray(arr, sub) {
  let [left, right] = [0, 0]
  let [start, end] = [sub[0], sub[sub.length - 1]]
  if (arr.length > 0) {
    for (let i = 0; i < arr.length; i++) {
      if (start > arr[i]) {
        left = i + 1
      }
      if (end >= arr[i]) {
        right = i + 1
      }
    }
  }

  arr.splice(left, right - left, ...sub)
  return arr
}

function Select({
  options = [],
  selectedValues = [],
  size = 10,
  multiple = true,
  disabled = false,
  onchange,
}) {
  const { onclick } = useSelect(
    options,
    selectedValues,
    onchange,
    multiple,
    disabled
  )
  return (
    <div
      style={{
        height: `calc(${size} * var(--option-height)`,
        overflowY: 'auto',
      }}
      className={
        disabled
          ? 'select-input-id-65818f3f-4ba2-4353-a7ef-c011773edde2 select-disabled-id-65818f3f-4ba2-4353-a7ef-c011773edde2'
          : 'select-input-id-65818f3f-4ba2-4353-a7ef-c011773edde2'
      }
      onClick={(e) => {
        if (e.target.attributes.value) {
          onclick(e.target.attributes.value.value, e.shiftKey)
        }
      }}
    >
      {options.map((option, i) => {
        let [value, text] = Array.isArray(option) ? option : [option, option]
        let className = selectedValues.includes(value)
          ? 'option-element-id-65818f3f-4ba2-4353-a7ef-c011773edde2 option-selected-id-65818f3f-4ba2-4353-a7ef-c011773edde2'
          : 'option-element-id-65818f3f-4ba2-4353-a7ef-c011773edde2'
        return (
          <Option
            key={`${i}-${value}`}
            value={value}
            text={text || value}
            className={className}
          />
        )
      })}
    </div>
  )
}

export default Select
