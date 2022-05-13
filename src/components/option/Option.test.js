import { cleanup, render, screen } from '@testing-library/react'
import Option from './Option'

describe('<Option /> render test', () => {
  let optionElement
  const handleClick = jest.fn()
  beforeEach(() => {
    cleanup()
    render(<Option text="one" value="0" onclick={handleClick} />)
    optionElement = null
  })
  test('renders <Option />', () => {
    optionElement = screen.queryByTestId('single-option')
    expect(optionElement).toBeInTheDocument()
  })
  test('<Option /> clicked', () => {
    optionElement = screen.queryByTestId('single-option')
    expect(handleClick).not.toBeCalled()
    optionElement.click()
    expect(handleClick).toBeCalled()
    expect(handleClick).toBeCalledTimes(1)
  })
  test('<Option /> class name', () => {
    optionElement = screen.queryByTestId('single-option')
    expect(optionElement).not.toHaveClass('option-selected')
    cleanup()
    render(
      <Option text="two" value="1" onclick={handleClick} isSelected={true} />
    )
    optionElement = screen.queryByTestId('single-option')
    expect(optionElement).toHaveClass('option-selected')
  })
})
