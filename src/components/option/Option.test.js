import { render, screen } from '@testing-library/react'
import Option from './Option'

describe('render test', () => {
  let optionElement
  const handleClick = jest.fn()
  beforeEach(() => {
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
})
