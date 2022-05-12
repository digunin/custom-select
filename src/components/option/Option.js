function Option({ value, text, onclick }) {
  return (
    <div
      onClick={(e) => onclick(value)}
      data-testid="single-option"
      value={value}
    >
      {text}
    </div>
  )
}

export default Option
