# Rei

Rei is a fast LRU cache with optional TTL.
ReiT is the same LRU cache without TTL for maximum speed.
Standalone. No dependencies.

---

## Setup

```js
import { Rei, ReiT } from "./rei.js";
```

* `Rei(max, ttl)` → LRU + TTL
* `ReiT(max)` → LRU only, TTL not used

---

## Usage

```js
const c = new Rei(max, ttl);
const t = new ReiT(max);
```

---

## API

### Constructors

* `Rei(max, ttl)`
  Creates an LRU cache with optional TTL.
* `ReiT(max)`
  Creates an LRU cache without TTL.

---

### Core Methods

* `set(key, value, ttl?)`
  Store a value and mark it most recently used.
* `get(key)`
  Retrieve value and update LRU order.
* `has(key)`
  Check if a key exists (TTL enforced in Rei).
* `delete(key)`
  Remove a key.
* `clear()`
  Remove all keys.

---

### Non-LRU / Inspection

* `peek(key)`
  Get value without updating LRU order.
* `peekHas(key)`
  Check if key exists without TTL check or LRU update.

---

### Batch Methods

* `setMany([[key, value, ttl?], ...])`
  Set multiple entries.
* `getMany([keys], out?)`
  Get multiple entries.
* `deleteMany([keys])`
  Remove multiple entries.

---

### Utility

* `getOr(key, fallback)`
  Return fallback if key missing.
* `setNX(key, value, ttl?)`
  Set only if key does not exist.
* `incr(key, delta)`
  Increment numeric value.
* `pop(key)`
  Get and delete.
* `length`
  Current size.

---

## Notes

* Rei enforces TTL.
* ReiT does not use TTL.
* Both maintain strict LRU order.
* All operations are constant time.
