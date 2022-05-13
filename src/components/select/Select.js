import Option from '../option/Option'

function Select({ options = [], selectedValues = [] }) {
  return (
    <div className="select-input" data-testid="select-testid">
      {options.map(({ value, text }, i) => {
        let selected = selectedValues.includes(value)
        return (
          <Option
            key={`${i}-${value}`}
            value={value}
            text={text}
            onclick={onclick}
            isSelected={selected}
          />
        )
      })}
    </div>
  )
}

export default Select
