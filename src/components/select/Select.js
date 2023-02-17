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
      onClick={(e) => {
        if (e.target.attributes.value) {
          onclick(e.target.attributes.value.value, e.shiftKey)
        }
      }}
    >
      {options.map((option, i) => {
        let [value, text] = Array.isArray(option) ? option : [option, option]
        let className = selectedValues.includes(value)
          ? 'option-element option-selected'
          : 'option-element'
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
