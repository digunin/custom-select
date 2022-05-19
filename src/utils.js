export const mockOptions = [
  { value: 0, text: '1' },
  { value: 1, text: '2' },
  { value: 2, text: '3' },
  { value: 3, text: '4' },
  { value: 4, text: '5' },
  { value: 5, text: '6' },
  { value: 6, text: '7' },
  { value: 7, text: '8' },
  { value: 8, text: '9' },
  { value: 9, text: '10' },
]

export function toggleValue(arr, value) {
  let index = arr.indexOf(value)
  if (index === -1) {
    arr = insertSubarray(arr, [value])
  } else {
    arr.splice(index, 1)
  }
  return arr
}

export function insertSubarray(arr, sub) {
  let [left, right] = [0, 0]
  let [start, end] = [sub[0], sub[sub.length - 1]]
  if (arr.length > 0) {
    for (let i = 0; i < arr.length; i++) {
      if (start > arr[i]) {
        left = i + 1
      }
      if (end >= arr[i]) {
        right = i + 1
      }
    }
  }

  arr.splice(left, right - left, ...sub)
  return arr
}
