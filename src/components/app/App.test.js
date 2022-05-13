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
    expect(optionElements.length).toBe(5)
  })
  test('<App /> test click by option', () => {
    expect(screen.queryByText('1')).toHaveClass('option-selected')
    expect(screen.queryByText('2')).toHaveClass('option-selected')
    expect(screen.queryByText('3')).toHaveClass('option-selected')
    expect(screen.queryByText('4')).not.toHaveClass('option-selected')
    expect(screen.queryByText('5')).not.toHaveClass('option-selected')
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
