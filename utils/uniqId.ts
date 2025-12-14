export function generateUniqId() {
  const TIME_BASE = 1652976000000 // time base 2022-05-20 00:00:00

  const timestamp = Date.now() - TIME_BASE
  const timestampBits = timestamp.toString(2).padStart(41, "0")

  const workerId = Math.floor(Math.random() * 1024)
    .toString(2)
    .padStart(10, "0")
  const processId = Math.floor(Math.random() * 32)
    .toString(2)
    .padStart(5, "0")

  const snowflake = timestampBits + workerId + processId

  const decimalSnowflake = parseInt(snowflake, 2).toString()

  const sequenceId = Math.floor(Math.random() * 1024)
    .toString(2)
    .padStart(10, "0")

  return decimalSnowflake + parseInt(sequenceId, 2)
}
