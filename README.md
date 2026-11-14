# span-duration-string-kit

Formats nanosecond span durations into human-readable time units following OpenTelemetry display conventions.

## Usage

```js
import { formatDuration } from './src/index.js';

formatDuration(1_500_000_000); // '1s'
formatDuration(90_000_000_000); // '1m 30s'
formatDuration(3_661_000_000_000); // '1h 1m 1s'
```

## Why this library exists

OpenTelemetry span durations are recorded in nanoseconds, but presenting them raw is unhelpful. This library converts them into a single, predictable string that matches the display conventions used across OpenTelemetry tooling. The trade-off is simplicity: it emits only the largest unit that fits, truncating smaller units, rather than showing a mixed-unit breakdown with fractional parts. This keeps output stable and easy to parse, at the cost of some precision for durations that straddle unit boundaries (for example, 1.5 seconds displays as `1s`).

## Edge cases

The formatter truncates toward zero rather than rounding. A duration of 1.999 seconds becomes `1s`, not `2s`. This is intentional: span durations are measurements, and truncation avoids implying more precision than the underlying integer nanoseconds provide. If you need rounding, apply it before calling `formatDuration`.

Negative values, non-integers, and values outside the safe integer range throw a `TypeError`, because silently coercing them would hide data-quality problems upstream.
