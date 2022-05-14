import { cleanup, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import App from './App'

describe('App render test', () => {
  let appElement
  beforeEach(() => {
    cleanup()
    render(<App />)
    appElement = null
  })
  test('renders <App /> (by text)', () => {
    appElement = screen.getByText(/react/i)
    expect(appElement).toBeInTheDocument()
  })
  test('renders <App /> (by test id)', () => {
    appElement = screen.queryByTestId('app-id')
    expect(appElement).toBeInTheDocument()
  })
  test('<App /> check child', () => {
    let selectElement = screen.queryByTestId('select-testid')
    expect(selectElement).toBeInTheDocument()
    let optionElements = screen.queryAllByTestId('single-option')
    expect(optionElements.length).toBe(10)
  })
  test('<App /> test click by option', () => {
    let values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    values.forEach((value) => {
      if (['1', '2', '3', '6', '7', '8'].includes(value))
        expect(screen.queryByText(value)).toHaveClass('option-selected')
    })

    let optionElements = screen.queryByText('1')
    act(() => {
      optionElements.click()
    })
    optionElements = screen.queryByText('1')
    expect(optionElements).not.toHaveClass('option-selected')
    optionElements = screen.queryByText('4')
    act(() => {
      optionElements.click()
    })
    expect(optionElements).toHaveClass('option-selected')
  })
})
