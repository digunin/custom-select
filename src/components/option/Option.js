import { memo } from 'react'

function Option({ value, text, className }) {
  console.log('render')
  return (
    <div className={className} data-testid="single-option" value={value}>
      {text}
    </div>
  )
}

export default memo(Option, (prev, next) => {
  return (
    prev.value === next.value &&
    prev.text === next.text &&
    prev.className === next.className
  )
})
