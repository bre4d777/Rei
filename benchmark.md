# Rei Cache Benchmark Results

**Generated:** 2025-11-20T04:00:54.748Z

## Summary

Total tests run: 32

## Detailed Results

| Test | Duration (ms) | Iterations | Ops/sec | Avg Time/Op (μs) |
|------|---------------|------------|---------|------------------|
| Sequential SET (10,000 ops) | 7.95 | 10,000 | 1,257,887 | 0.795 |
| Sequential SET (100,000 ops) | 46.08 | 100,000 | 2,170,359 | 0.461 |
| Sequential SET (1,000,000 ops) | 556.09 | 1,000,000 | 1,798,274 | 0.556 |
| Sequential GET (10,000 ops) | 2.42 | 10,000 | 4,140,666 | 0.242 |
| Sequential GET (100,000 ops) | 68.53 | 100,000 | 1,459,286 | 0.685 |
| Sequential GET (1,000,000 ops) | 203.68 | 1,000,000 | 4,909,556 | 0.204 |
| Random GET hits (10,000 ops) | 4.18 | 10,000 | 2,395,203 | 0.418 |
| Random GET hits (100,000 ops) | 67.46 | 100,000 | 1,482,419 | 0.675 |
| Random GET hits (1,000,000 ops) | 281.78 | 1,000,000 | 3,548,828 | 0.282 |
| Random GET misses (10,000 ops) | 1.30 | 10,000 | 7,716,287 | 0.130 |
| Random GET misses (100,000 ops) | 8.11 | 100,000 | 12,336,511 | 0.081 |
| Random GET misses (1,000,000 ops) | 97.58 | 1,000,000 | 10,247,957 | 0.098 |
| Mixed 70/30 read/write (10,000 ops) | 3.31 | 10,000 | 3,018,858 | 0.331 |
| Mixed 70/30 read/write (100,000 ops) | 44.37 | 100,000 | 2,253,938 | 0.444 |
| Mixed 70/30 read/write (1,000,000 ops) | 234.15 | 1,000,000 | 4,270,677 | 0.234 |
| DELETE operations (10,000 ops) | 2.29 | 10,000 | 4,373,116 | 0.229 |
| DELETE operations (100,000 ops) | 23.59 | 100,000 | 4,239,742 | 0.236 |
| DELETE operations (1,000,000 ops) | 105.60 | 1,000,000 | 9,469,513 | 0.106 |
| HAS operations (10,000 ops) | 4.29 | 10,000 | 2,332,432 | 0.429 |
| HAS operations (100,000 ops) | 18.69 | 100,000 | 5,349,733 | 0.187 |
| HAS operations (1,000,000 ops) | 264.75 | 1,000,000 | 3,777,161 | 0.265 |
| LRU eviction (10,000 ops, 10k cache) | 7.91 | 10,000 | 1,263,886 | 0.791 |
| LRU eviction (100,000 ops, 10k cache) | 43.73 | 100,000 | 2,286,917 | 0.437 |
| LRU eviction (500,000 ops, 10k cache) | 119.12 | 500,000 | 4,197,309 | 0.238 |
| Rei SET (1,000,000 ops) | 347.44 | 1,000,000 | 2,878,172 | 0.347 |
| ReiT SET (1,000,000 ops) | 480.99 | 1,000,000 | 2,079,030 | 0.481 |
| setMany (100,000 ops, batch=100) | 6.23 | 100,000 | 16,052,523 | 0.062 |
| setMany (1,000,000 ops, batch=1000) | 25.48 | 1,000,000 | 39,242,913 | 0.025 |
| setMany (10,000,000 ops, batch=10000) | 458.30 | 10,000,000 | 21,819,737 | 0.046 |
| Fill cache to 100,000 entries | 39.80 | 100,000 | 2,512,849 | 0.398 |
| Fill cache to 500,000 entries | 486.12 | 500,000 | 1,028,555 | 0.972 |
| Fill cache to 1,000,000 entries | 1087.12 | 1,000,000 | 919,858 | 1.087 |

## Performance Categories


### Sequential SET

- **Sequential SET (10,000 ops)**: 1,257,887 ops/sec (0.795μs per op)
- **Sequential SET (100,000 ops)**: 2,170,359 ops/sec (0.461μs per op)
- **Sequential SET (1,000,000 ops)**: 1,798,274 ops/sec (0.556μs per op)

### Sequential GET

- **Sequential GET (10,000 ops)**: 4,140,666 ops/sec (0.242μs per op)
- **Sequential GET (100,000 ops)**: 1,459,286 ops/sec (0.685μs per op)
- **Sequential GET (1,000,000 ops)**: 4,909,556 ops/sec (0.204μs per op)

### Random GET hits

- **Random GET hits (10,000 ops)**: 2,395,203 ops/sec (0.418μs per op)
- **Random GET hits (100,000 ops)**: 1,482,419 ops/sec (0.675μs per op)
- **Random GET hits (1,000,000 ops)**: 3,548,828 ops/sec (0.282μs per op)

### Random GET misses

- **Random GET misses (10,000 ops)**: 7,716,287 ops/sec (0.130μs per op)
- **Random GET misses (100,000 ops)**: 12,336,511 ops/sec (0.081μs per op)
- **Random GET misses (1,000,000 ops)**: 10,247,957 ops/sec (0.098μs per op)

### Mixed Operations

- **Mixed 70/30 read/write (10,000 ops)**: 3,018,858 ops/sec (0.331μs per op)
- **Mixed 70/30 read/write (100,000 ops)**: 2,253,938 ops/sec (0.444μs per op)
- **Mixed 70/30 read/write (1,000,000 ops)**: 4,270,677 ops/sec (0.234μs per op)

### DELETE

- **DELETE operations (10,000 ops)**: 4,373,116 ops/sec (0.229μs per op)
- **DELETE operations (100,000 ops)**: 4,239,742 ops/sec (0.236μs per op)
- **DELETE operations (1,000,000 ops)**: 9,469,513 ops/sec (0.106μs per op)

### HAS

- **HAS operations (10,000 ops)**: 2,332,432 ops/sec (0.429μs per op)
- **HAS operations (100,000 ops)**: 5,349,733 ops/sec (0.187μs per op)
- **HAS operations (1,000,000 ops)**: 3,777,161 ops/sec (0.265μs per op)

### LRU Eviction

- **LRU eviction (10,000 ops, 10k cache)**: 1,263,886 ops/sec (0.791μs per op)
- **LRU eviction (100,000 ops, 10k cache)**: 2,286,917 ops/sec (0.437μs per op)
- **LRU eviction (500,000 ops, 10k cache)**: 4,197,309 ops/sec (0.238μs per op)

### Batch Operations

- **setMany (100,000 ops, batch=100)**: 16,052,523 ops/sec (0.062μs per op)
- **setMany (1,000,000 ops, batch=1000)**: 39,242,913 ops/sec (0.025μs per op)
- **setMany (10,000,000 ops, batch=10000)**: 21,819,737 ops/sec (0.046μs per op)

### Memory Stress

- **Fill cache to 100,000 entries**: 2,512,849 ops/sec (0.398μs per op)
- **Fill cache to 500,000 entries**: 1,028,555 ops/sec (0.972μs per op)
- **Fill cache to 1,000,000 entries**: 919,858 ops/sec (1.087μs per op)
