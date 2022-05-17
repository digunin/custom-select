import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import Select from './Select'
import { checkSelected } from '../app/App.test'

describe('<Select /> render test', () => {
  let selectElement
  const options = [
    { value: 0, text: '1' },
    { value: 1, text: '2' },
    { value: 2, text: '3' },
    { value: 3, text: '4' },
    { value: 4, text: '5' },
  ]
  const selectedValues = [0, 1, 2]

  beforeEach(() => {
    cleanup()
    render(
      <Select
        options={options}
        selectedValues={selectedValues}
        onchange={() => {
          return
        }}
      />
    )
    selectElement = null
  })

  test('renders <Option />', () => {
    selectElement = screen.queryByTestId('select-testid')
    expect(selectElement).toBeInTheDocument()
    let allOptions = screen.queryAllByTestId('single-option')
    expect(allOptions.length).toBe(5)
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
    checkSelected([1, 2, 3, 4], [5])

    cleanup()
    render(
      <Select
        options={options}
        selectedValues={selectedValues}
        multiple={false}
        onchange={() => {
          return
        }}
      />
    )
    fireEvent.click(screen.getByText('4'))
    checkSelected([4], [1, 2, 3, 5])

    fireEvent.click(screen.getByText('1'))
    checkSelected([1], [2, 3, 4, 5])
  })

  test('chek "disabled" mode', () => {
    cleanup()
    render(
      <Select
        options={options}
        selectedValues={selectedValues}
        multiple={false}
        disabled={true}
        onchange={() => {
          return
        }}
      />
    )
    expect(screen.getByTestId('select-testid')).toHaveClass('select-disabled')
    fireEvent.click(screen.getByText('1'))
    checkSelected([1, 2, 3], [4, 5])

    fireEvent.click(screen.getByText('5'))
    checkSelected([1, 2, 3], [4, 5])
  })
})
