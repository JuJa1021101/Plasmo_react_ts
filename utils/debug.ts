/**
 * Debug utility for browser extension development
 * Provides structured logging and debugging tools
 */

// Configuration
let DEBUG_MODE = true
const DEBUG_PREFIX = "[JobRight Debug]"
const LOG_LEVELS = {
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
  DEBUG: "DEBUG"
}

// Color coding for different log levels
const LOG_COLORS = {
  [LOG_LEVELS.INFO]: "#4CAF50", // Green
  [LOG_LEVELS.WARN]: "#FF9800", // Orange
  [LOG_LEVELS.ERROR]: "#F44336", // Red
  [LOG_LEVELS.DEBUG]: "#2196F3" // Blue
}

// Enable or disable debug mode
export function setDebugMode(enabled: boolean): void {
  DEBUG_MODE = enabled
}

// Check if debug mode is enabled
export function isDebugMode(): boolean {
  return DEBUG_MODE
}

// Main logging function
export function log(level: string, ...args: any[]): void {
  if (!DEBUG_MODE && level !== LOG_LEVELS.ERROR) return

  const color = LOG_COLORS[level] || "#000000"
  const timestamp = new Date().toISOString().split("T")[1].split(".")[0]

  console.log(
    `%c${DEBUG_PREFIX} [${timestamp}] [${level}]`,
    `color: ${color}; font-weight: bold`,
    ...args
  )
}

// Convenience methods for different log levels
export function info(...args: any[]): void {
  log(LOG_LEVELS.INFO, ...args)
}

export function warn(...args: any[]): void {
  log(LOG_LEVELS.WARN, ...args)
}

export function error(...args: any[]): void {
  log(LOG_LEVELS.ERROR, ...args)
}

export function debug(...args: any[]): void {
  log(LOG_LEVELS.DEBUG, ...args)
}

// Function execution timer
export function timeFunction<T>(fn: () => T, label: string): T {
  if (!DEBUG_MODE) return fn()

  const start = performance.now()
  const result = fn()
  const end = performance.now()

  debug(`${label} took ${(end - start).toFixed(2)}ms to execute`)
  return result
}

// Async function execution timer
export async function timeAsyncFunction<T>(
  fn: () => Promise<T>,
  label: string
): Promise<T> {
  if (!DEBUG_MODE) return fn()

  const start = performance.now()
  const result = await fn()
  const end = performance.now()

  debug(`${label} took ${(end - start).toFixed(2)}ms to execute`)
  return result
}

// Create a group in the console for related logs
export function group(label: string, fn: () => void): void {
  if (!DEBUG_MODE) {
    fn()
    return
  }

  console.group(`${DEBUG_PREFIX} ${label}`)
  fn()
  console.groupEnd()
}

// Expose a global debug object for console access
if (typeof window !== "undefined") {
  ;(window as any).__jobrightDebug = {
    setDebugMode,
    isDebugMode,
    log,
    info,
    warn,
    error,
    debug,
    timeFunction,
    timeAsyncFunction,
    group
  }
}

export default {
  setDebugMode,
  isDebugMode,
  log,
  info,
  warn,
  error,
  debug,
  timeFunction,
  timeAsyncFunction,
  group
}
