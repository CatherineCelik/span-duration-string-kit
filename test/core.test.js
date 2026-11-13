import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatDuration } from '../src/index.js';

test('formats nanoseconds for values below one microsecond', () => {
  assert.equal(formatDuration(0), '0ns');
  assert.equal(formatDuration(1), '1ns');
  assert.equal(formatDuration(999), '999ns');
});

test('formats microseconds for values below one millisecond', () => {
  assert.equal(formatDuration(1_000), '1µs');
  assert.equal(formatDuration(1_500), '1µs');
  assert.equal(formatDuration(999_999), '999µs');
});

test('formats milliseconds for values below one second', () => {
  assert.equal(formatDuration(1_000_000), '1ms');
  assert.equal(formatDuration(1_500_000), '1ms');
  assert.equal(formatDuration(999_999_999), '999ms');
});

test('formats seconds for values below one minute', () => {
  assert.equal(formatDuration(1_000_000_000), '1s');
  assert.equal(formatDuration(1_500_000_000), '1s');
  assert.equal(formatDuration(59_999_999_999), '59s');
});

test('formats minutes and seconds for values below one hour', () => {
  assert.equal(formatDuration(60_000_000_000), '1m');
  assert.equal(formatDuration(61_000_000_000), '1m 1s');
  assert.equal(formatDuration(120_000_000_000), '2m');
  assert.equal(formatDuration(3_599_999_999_999), '59m 59s');
});

test('formats hours, minutes, and seconds for values of one hour or more', () => {
  assert.equal(formatDuration(3_600_000_000_000), '1h');
  assert.equal(formatDuration(3_661_000_000_000), '1h 1m 1s');
  assert.equal(formatDuration(7_200_000_000_000), '2h');
  assert.equal(formatDuration(86_400_000_000_000), '24h');
});

test('throws a TypeError for negative values', () => {
  assert.throws(() => formatDuration(-1), TypeError);
});

test('throws a TypeError for non-integer values', () => {
  assert.throws(() => formatDuration(1.5), TypeError);
});

test('throws a TypeError for non-number values', () => {
  assert.throws(() => formatDuration('100'), TypeError);
  assert.throws(() => formatDuration(null), TypeError);
  assert.throws(() => formatDuration(undefined), TypeError);
});

test('throws a TypeError for values exceeding safe integer range', () => {
  assert.throws(() => formatDuration(Number.MAX_SAFE_INTEGER + 1), TypeError);
});
