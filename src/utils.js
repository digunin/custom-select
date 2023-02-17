export const mockOptions = [
  ['V-1', '1'],
  ['V-2', '2'],
  ['V-3', '3'],
  ['V-4', '4'],
  ['V-5', '5'],
  ['V-6', '6'],
  ['V-7', '7'],
  ['V-8', '8'],
  ['V-9', '9'],
  ['V10', '10'],
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
