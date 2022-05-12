import { render, screen } from '@testing-library/react'
import App from './App'

describe('render test', () => {
  let appElement
  beforeEach(() => {
    appElement = null
  })
  test('renders  App (by text)', () => {
    render(<App />)
    appElement = screen.getByText(/react/i)
    expect(appElement).toBeInTheDocument()
  })
})
