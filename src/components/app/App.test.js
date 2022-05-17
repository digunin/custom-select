import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import App from './App'

export function checkSelected(selected = [], unSelected = []) {
  selected.forEach((i) => {
    expect(screen.getByText(`${i}`)).toHaveClass('option-selected')
  })
  unSelected.forEach((i) => {
    expect(screen.getByText(`${i}`)).not.toHaveClass('option-selected')
  })
}

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

  beforeEach(() => {
    cleanup()
    render(<App />)
    appElement = null
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
  })

  test('<App /> click with shift - test some ranges', () => {
    renderAndResetSelected()
    checkDiapason(2, 5)
    renderAndResetSelected()
    checkDiapason(1, 10)
    renderAndResetSelected()
    checkDiapason(1, 6)
    renderAndResetSelected()
    checkDiapason(6, 3)
    renderAndResetSelected()
    checkDiapason(7, 1)
    renderAndResetSelected()
    checkDiapason(4, 10)
  })

  test('<App /> test more then one diapason selection', () => {
    renderAndResetSelected()
    checkDiapason(5, 1)
    checkDiapason(9, 7)
    checkSelected([1, 2, 3, 4, 5, 7, 8, 9], [6, 10])

    cleanup()
    render(<App />)
    fireEvent.click(screen.getByText('3'))
    fireEvent.click(screen.getByText('5'), { shiftKey: true })
    checkSelected([1, 2, 4, 5, 6, 7, 8], [3, 9, 10])

    cleanup()
    render(<App />)
    fireEvent.click(screen.getByText('5'))
    fireEvent.click(screen.getByText('3'), { shiftKey: true })
    checkSelected([1, 2, 3, 4, 5, 6, 7, 8], [9, 10])

    cleanup()
    render(<App />)
    fireEvent.click(screen.getByText('9'), { shiftKey: true })
    fireEvent.click(screen.getByText('1'), { shiftKey: true })
    checkSelected([1, 2, 3, 4, 5, 6, 7, 8, 9], [10])

    cleanup()
    render(<App />)
    fireEvent.click(screen.getByText('1'), { shiftKey: true })
    fireEvent.click(screen.getByText('9'), { shiftKey: true })
    checkSelected([2, 3, 4, 5, 6, 7, 8, 9], [1, 10])

    cleanup()
    render(<App />)
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('6'))
    fireEvent.click(screen.getByText('1'), { shiftKey: true })
    checkSelected([1, 2, 3, 4, 5, 7, 8], [6, 9, 10])

    cleanup()
    render(<App />)
    fireEvent.click(screen.getByText('3'))
    fireEvent.click(screen.getByText('4'), { shiftKey: true })
    checkSelected([1, 2, 4, 6, 7, 8], [3, 5, 9, 10])

    cleanup()
    render(<App />)
    fireEvent.click(screen.getByText('3'))
    fireEvent.click(screen.getByText('3'), { shiftKey: true })
    checkSelected([1, 2, 3, 6, 7, 8], [4, 5, 9, 10])
  })

  test('<Select /> check selected', () => {
    let optionElement = screen.queryByText('1')
    expect(optionElement).toHaveClass('option-selected')
    optionElement = screen.queryByText('2')
    expect(optionElement).toHaveClass('option-selected')
    optionElement = screen.queryByText('3')
    expect(optionElement).toHaveClass('option-selected')
    optionElement = screen.queryByText('4')
    expect(optionElement).not.toHaveClass('option-selected')
    optionElement = screen.queryByText('5')
    expect(optionElement).not.toHaveClass('option-selected')
  })

  test('check single selection', () => {
    fireEvent.click(screen.getByText('4'))
    checkSelected([1, 2, 3, 4, 6, 7, 8], [5, 9, 10])

    cleanup()
    render(<App multiple={false} />)
    fireEvent.click(screen.getByText('4'))
    checkSelected([4], [1, 2, 3, 5, 6, 7, 8, 9, 10])

    fireEvent.click(screen.getByText('1'))
    checkSelected([1], [2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  test('chek "disabled" mode', () => {
    cleanup()
    render(<App disabled={true} />)
    expect(screen.getByTestId('select-testid')).toHaveClass('select-disabled')
    checkSelected([1, 2, 3, 6, 7, 8], [4, 5, 9, 10])

    fireEvent.click(screen.getByText('1'))
    checkSelected([1, 2, 3, 6, 7, 8], [4, 5, 9, 10])

    fireEvent.click(screen.getByText('5'))
    checkSelected([1, 2, 3, 6, 7, 8], [4, 5, 9, 10])
  })
})
