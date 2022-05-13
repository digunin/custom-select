import {
  cleanup,
  queryAllByTestId,
  render,
  screen,
} from '@testing-library/react'
import Select from './Select'
describe('<Select /> render test', () => {
  let selectElement
  const options = [
    { value: 0, text: '1' },
    { value: 1, text: '2' },
    { value: 2, text: '3' },
    { value: 3, text: '4' },
    { value: 4, text: '5' },
  ]
  const selectedValues = [1, 2, 3]
  beforeEach(() => {
    cleanup()
    render(<Select options={options} selectedValues={selectedValues} />)
    selectElement = null
  })
  test('renders <Option />', () => {
    selectElement = screen.queryByTestId('select-testid')
    expect(selectElement).toBeInTheDocument()
    let allOptions = screen.queryAllByTestId('single-option')
    expect(allOptions.length).toBe(5)
  })
})
