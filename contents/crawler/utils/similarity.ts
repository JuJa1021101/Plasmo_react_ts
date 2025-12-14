function levenshteinDistance(a, b) {
  const matrix = []

  if (a.length == 0) {
    return b.length
  }

  if (b.length == 0) {
    return a.length
  }

  // 初始化矩阵
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  // 计算编辑距离
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // 替换
          matrix[i - 1][j] + 1, // 删除
          matrix[i][j - 1] + 1 // 插入
        )
      }
    }
  }

  return matrix[b.length][a.length]
}

export default function similarity(a, b) {
  const distance = levenshteinDistance(a, b)
  const maxLength = Math.max(a.length, b.length)
  return (maxLength - distance) / maxLength
}
