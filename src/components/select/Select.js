import Option from '../option/Option'
import useSelect from './useSelect'

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
      className={disabled ? 'select-input select-disabled' : 'select-input'}
      data-testid="select-testid"
    >
      {options.map(({ value, text }, i) => {
        let className = selectedValues.includes(value)
          ? 'option-element option-selected'
          : 'option-element'
        return (
          <Option
            key={`${i}-${value}`}
            value={value}
            text={text}
            onclick={onclick}
            className={className}
          />
        )
      })}
    </div>
  )
}

export default Select
