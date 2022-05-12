import { render, screen } from '@testing-library/react'
import App from './App'

describe('App render test', () => {
  let appElement
  beforeEach(() => {
    render(<App />)
    appElement = null
  })
  test('renders App (by text)', () => {
    appElement = screen.getByText(/react/i)
    expect(appElement).toBeInTheDocument()
  })
  test('renders App (by test id)', () => {
    appElement = screen.queryByTestId('app-id')
    expect(appElement).toBeInTheDocument()
  })
})
