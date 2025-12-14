// function calculateLevenshteinDistance(a: string, b: string): number {
//   const matrix: number[][] = []

//   for (let i = 0; i <= a.length; i++) {
//     matrix[i] = [i]
//   }

//   for (let j = 1; j <= b.length; j++) {
//     matrix[0][j] = j
//   }

//   for (let i = 1; i <= a.length; i++) {
//     for (let j = 1; j <= b.length; j++) {
//       if (a[i - 1] === b[j - 1]) {
//         matrix[i][j] = matrix[i - 1][j - 1]
//       } else {
//         matrix[i][j] = Math.min(
//           matrix[i - 1][j] + 1,
//           matrix[i][j - 1] + 1,
//           matrix[i - 1][j - 1] + 1
//         )
//       }
//     }
//   }

//   return matrix[a.length][b.length]
// }

// export function findClosestMatch(
//   options: HTMLElement[],
//   target: string
// ): HTMLElement | null {
//   let minDistance = Infinity
//   let closestMatch = null

//   for (const option of options) {
//     const str = option?.innerText.trim().toLowerCase()
//     const distance = calculateLevenshteinDistance(str, target)

//     if (distance < minDistance) {
//       minDistance = distance
//       closestMatch = option
//     }
//   }

//   return closestMatch
// }

function removeSpecialCharsAndSpaces(str) {
  return str.replace(/[^a-zA-Z0-9]/g, "")
}

function getMatchScore(option: string, input: string): number {
  option = removeSpecialCharsAndSpaces(option)
  input = removeSpecialCharsAndSpaces(input)

  if (option === input) return 100
  if (option.includes(input)) return 75
  if (input.includes(option)) return 50
  return 0
}

export function findMatchOption(options: HTMLElement[], target: string = "") {
  let bestMatch: HTMLElement | null = null
  let bestMatchScore = 0

  if (!target) return bestMatch

  const inputText = target.toLowerCase().trim()
  options.forEach((option) => {
    const optionText = option.textContent?.toLowerCase().trim() || ""

    const score = getMatchScore(optionText, inputText)

    if (score > bestMatchScore) {
      bestMatch = option
      bestMatchScore = score
    }
  })

  return bestMatch
}
