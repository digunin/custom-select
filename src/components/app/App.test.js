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
    let selected_text = ['1', '2', '3', '6', '7', '8']
    let not_selected_text = ['4', '5', '9', '10']

    selected_text.forEach((value) => {
      expect(screen.queryByText(value)).toHaveClass('option-selected')
    })

    not_selected_text.forEach((value) => {
      expect(screen.queryByText(value)).not.toHaveClass('option-selected')
    })

    selected_text.forEach((value) => {
      let optionElements = screen.queryByText(value)
      act(() => {
        optionElements.click()
      })
      optionElements = screen.queryByText(value)
      expect(optionElements).not.toHaveClass('option-selected')
    })

    not_selected_text.forEach((value) => {
      let optionElements = screen.queryByText(value)
      act(() => {
        optionElements.click()
      })
      optionElements = screen.queryByText(value)
      expect(optionElements).toHaveClass('option-selected')
    })
  })
})
