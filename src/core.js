const NANOSECONDS_PER_MICROSECOND = 1_000;
const NANOSECONDS_PER_MILLISECOND = 1_000_000;
const NANOSECONDS_PER_SECOND = 1_000_000_000;
const NANOSECONDS_PER_MINUTE = 60 * NANOSECONDS_PER_SECOND;
const NANOSECONDS_PER_HOUR = 60 * NANOSECONDS_PER_MINUTE;

/**
 * Formats a duration given in nanoseconds into a human-readable string.
 *
 * The format follows OpenTelemetry display conventions:
 * - Values less than 1 microsecond are shown in nanoseconds.
 * - Values less than 1 millisecond are shown in microseconds.
 * - Values less than 1 second are shown in milliseconds.
 * - Values less than 1 minute are shown in seconds.
 * - Values less than 1 hour are shown in minutes and seconds.
 * - Values of 1 hour or more are shown in hours, minutes, and seconds.
 *
 * All components are integers, and leading zero components are omitted
 * (e.g. "1m 5s" rather than "1m 0s 5s").
 *
 * @param {number} nanos - Duration in nanoseconds. Must be a non-negative safe integer.
 * @returns {string} Human-readable duration string.
 * @throws {TypeError} If nanos is not a non-negative safe integer.
 */
export function formatDuration(nanos) {
  if (typeof nanos !== 'number' || !Number.isSafeInteger(nanos) || nanos < 0) {
    throw new TypeError('nanos must be a non-negative safe integer');
  }

  if (nanos < NANOSECONDS_PER_MICROSECOND) {
    return `${nanos}ns`;
  }

  if (nanos < NANOSECONDS_PER_MILLISECOND) {
    const micros = Math.floor(nanos / NANOSECONDS_PER_MICROSECOND);
    return `${micros}µs`;
  }

  if (nanos < NANOSECONDS_PER_SECOND) {
    const millis = Math.floor(nanos / NANOSECONDS_PER_MILLISECOND);
    return `${millis}ms`;
  }

  if (nanos < NANOSECONDS_PER_MINUTE) {
    const seconds = Math.floor(nanos / NANOSECONDS_PER_SECOND);
    return `${seconds}s`;
  }

  if (nanos < NANOSECONDS_PER_HOUR) {
    const totalSeconds = Math.floor(nanos / NANOSECONDS_PER_SECOND);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return seconds === 0 ? `${minutes}m` : `${minutes}m ${seconds}s`;
  }

  const totalSeconds = Math.floor(nanos / NANOSECONDS_PER_SECOND);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [`${hours}h`];
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0) parts.push(`${seconds}s`);
  return parts.join(' ');
}
