export const handleLikeCount = (count: number = 0) => {
  if (count < 1000) {
    return count
  }
  if (count < 10000) {
    const k = (count / 1000).toFixed(0)
    return `${k}k`
  }
  const w = (count / 10000).toFixed(1)
  return `${w}w`
}
