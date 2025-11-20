> Intended to be used in my personal projects (mostly discord bots)

# **Rei**

Rei is a high-performance LRU cache with optional TTL.
ReiT is the same cache without TTL for maximum speed.
Fully standalone. Zero dependencies.

---

## **Install / Load**

```js
import { Rei, ReiT } from "./rei.js";
```

---

## **Overview**

* **Rei(max, ttl)** – LRU with TTL support
* **ReiT(max)** – LRU only (faster, no TTL path)
* Arrays + typed arrays internally
* All operations are **O(1)**
* Designed for performance-critical use (e.g., bots, workers)

---

## **API**

### **Constructors**

* **Rei(max, ttl)**
  Creates an LRU cache with optional TTL enforcement.

* **ReiT(max)**
  LRU variant without TTL.

---

### **Core**

* **set(key, value, ttl?)** – Insert or update
* **get(key)** – Get and mark as most-recent
* **has(key)** – Existence check (TTL enforced in Rei)
* **delete(key)** – Remove key
* **clear()** – Reset cache
* **length** – Current size

---

### **Non-LRU / Inspection**

* **peek(key)** – Get without touching LRU
* **peekHas(key)** – Check existence without TTL or LRU

---

### **Batch**

* **setMany(entries)** – `[[key, value, ttl?], ...]`
* **getMany(keys, out?)** – Bulk get
* **deleteMany(keys)** – Bulk remove

---

### **Utility**

* **getOr(key, fallback)** – Fallback read
* **setNX(key, value, ttl?)** – Set only if missing
* **incr(key, delta)** – Increment numeric value
* **pop(key)** – Get and delete

---

## **Notes**

* Rei enforces TTL per-entry or via default TTL.
* ReiT ignores TTL entirely.
* Strict LRU order maintained at all times.
* Not intended as a Redis/Memcached replacement, but fast enough for practical in-app caching.

