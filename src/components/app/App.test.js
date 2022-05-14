import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import App from './App'

describe('App render test', () => {
  let selected_text = ['1', '2', '3', '6', '7', '8']
  let not_selected_text = ['4', '5', '9', '10']
  let appElement
  function renderAndResetSelected() {
    cleanup()
    render(<App />)
    selected_text.forEach((text) => {
      act(() => {
        screen.getByText(text).click()
      })
    })
  }
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
  test('<App /> click with shift', () => {
    selected_text.forEach((text) => {
      let el = screen.getByText(text)
      fireEvent.click(el)
    })
    for (let i = 1; i < 11; i++) {
      let el = screen.getByText(`${i}`)
      expect(el).not.toHaveClass('option-selected')
    }
    function checkDiapason(start, end) {
      let el = screen.getByText(`${start}`)
      fireEvent.click(el)
      el = screen.getByText(`${end}`)
      fireEvent.click(el, { shiftKey: true })
      if (end < start) {
        ;[start, end] = [end, start]
      }
      for (let i = start; i <= end; i++) {
        let el = screen.getByText(`${i}`)
        expect(el).toHaveClass('option-selected')
      }
    }
    checkDiapason(2, 5)
    renderAndResetSelected()
    checkDiapason(1, 10)
    renderAndResetSelected()
    checkDiapason(6, 3)
    renderAndResetSelected()
    checkDiapason(7, 1)
    renderAndResetSelected()
    checkDiapason(1, 5)
    checkDiapason(7, 9)
    ;[(1, 2, 3, 4, 5, 7, 8, 9)].forEach((i) => {
      expect(screen.getByText(`${i}`)).toHaveClass('option-selected')
    })
    expect(screen.getByText('6')).not.toHaveClass('option-selected')
    expect(screen.getByText('10')).not.toHaveClass('option-selected')
  })
})
