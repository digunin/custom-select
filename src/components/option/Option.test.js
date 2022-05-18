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
})
