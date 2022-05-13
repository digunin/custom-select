import { cleanup, render, screen } from '@testing-library/react'
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
})
