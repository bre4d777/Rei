export class Rei {
  constructor(max = 5000, ttl = 0) {
    this.max = max | 0;
    this.ttl = ttl | 0;
    this.useTTL = this.ttl > 0;

    this.idx = new Map();
    this.keys = new Array(this.max);
    this.vals = new Array(this.max);
    this.prev = new Int32Array(this.max);
    this.next = new Int32Array(this.max);
    this.exp = this.useTTL ? new Float64Array(this.max) : null;

    this.head = -1;
    this.tail = -1;

    this.free = new Int32Array(this.max);
    for (let i = 0; i < this.max; i++) this.free[i] = i;
    this.ft = 0;

    this.size = 0;
  }

  alloc() {
    if (this.ft === this.max) return -1;
    return this.free[this.ft++];
  }

  freeSlot(i) {
    this.free[--this.ft] = i;
  }

  remove(i) {
    const p = this.prev[i];
    const n = this.next[i];
    if (p !== -1) this.next[p] = n;
    if (n !== -1) this.prev[n] = p;
    if (this.head === i) this.head = n;
    if (this.tail === i) this.tail = p;
  }

  insert(i) {
    this.prev[i] = -1;
    this.next[i] = this.head;
    if (this.head !== -1) this.prev[this.head] = i;
    this.head = i;
    if (this.tail === -1) this.tail = i;
  }

  evict() {
    const i = this.tail;
    const k = this.keys[i];
    this.idx.delete(k);
    this.remove(i);
    this.freeSlot(i);
    this.size--;
  }

  set(k, v, ttl) {
    const i = this.idx.get(k);
    const t = ttl ? ttl | 0 : this.ttl;

    if (i !== undefined) {
      this.vals[i] = v;
      if (this.useTTL) this.exp[i] = t ? Date.now() + t : 0;
      this.remove(i);
      this.insert(i);
      return this;
    }

    let s = this.alloc();
    if (s === -1) {
      this.evict();
      s = this.alloc();
    }

    this.idx.set(k, s);
    this.keys[s] = k;
    this.vals[s] = v;
    if (this.useTTL) this.exp[s] = t ? Date.now() + t : 0;
    this.prev[s] = -1;
    this.insert(s);
    this.size++;
    return this;
  }

  get(k) {
    const i = this.idx.get(k);
    if (i === undefined) return;
    if (this.useTTL) {
      const e = this.exp[i];
      if (e && Date.now() > e) {
        this.delete(k);
        return;
      }
    }
    this.remove(i);
    this.insert(i);
    return this.vals[i];
  }

  has(k) {
    const i = this.idx.get(k);
    if (i === undefined) return false;
    if (this.useTTL) {
      const e = this.exp[i];
      if (e && Date.now() > e) {
        this.delete(k);
        return false;
      }
    }
    return true;
  }

  delete(k) {
    const i = this.idx.get(k);
    if (i === undefined) return false;
    this.idx.delete(k);
    this.remove(i);
    this.freeSlot(i);
    this.size--;
    return true;
  }

  clear() {
    this.idx.clear();
    this.head = -1;
    this.tail = -1;
    this.ft = 0;
    for (let i = 0; i < this.max; i++) this.free[i] = i;
    this.size = 0;
    return this;
  }

  peek(k) {
    const i = this.idx.get(k);
    if (i === undefined) return;
    if (this.useTTL) {
      const e = this.exp[i];
      if (e && Date.now() > e) {
        this.delete(k);
        return;
      }
    }
    return this.vals[i];
  }

  setMany(arr) {
    const now = this.useTTL ? Date.now() : 0;
    for (let j = 0; j < arr.length; j++) {
      const a = arr[j];
      const k = a[0];
      const v = a[1];
      const t = a[2] ? a[2] | 0 : this.ttl;
      const i = this.idx.get(k);

      if (i !== undefined) {
        this.vals[i] = v;
        if (this.useTTL) this.exp[i] = t ? now + t : 0;
        this.remove(i);
        this.insert(i);
        continue;
      }

      let s = this.alloc();
      if (s === -1) {
        this.evict();
        s = this.alloc();
      }

      this.idx.set(k, s);
      this.keys[s] = k;
      this.vals[s] = v;
      if (this.useTTL) this.exp[s] = t ? now + t : 0;
      this.prev[s] = -1;
      this.insert(s);
      this.size++;
    }
    return this;
  }

  getMany(keys, out = []) {
    const L = keys.length;
    const now = this.useTTL ? Date.now() : 0;
    for (let i = 0; i < L; i++) {
      const k = keys[i];
      const s = this.idx.get(k);
      if (s === undefined) {
        out[i] = undefined;
        continue;
      }
      if (this.useTTL) {
        const e = this.exp[s];
        if (e && now > e) {
          this.delete(k);
          out[i] = undefined;
          continue;
        }
      }
      this.remove(s);
      this.insert(s);
      out[i] = this.vals[s];
    }
    return out;
  }

  deleteMany(keys) {
    for (let i = 0; i < keys.length; i++) this.delete(keys[i]);
    return this;
  }

  peekHas(k) {
    return this.idx.has(k);
  }

  getOr(k, d) {
    const v = this.get(k);
    return v === undefined ? d : v;
  }

  setNX(k, v, t) {
    if (!this.idx.has(k)) {
      this.set(k, v, t);
      return true;
    }
    return false;
  }

  incr(k, d = 1) {
    const i = this.idx.get(k);
    if (i === undefined) {
      this.set(k, d);
      return d;
    }
    const v = (this.vals[i] | 0) + d;
    this.vals[i] = v;
    this.remove(i);
    this.insert(i);
    return v;
  }

  pop(k) {
    const v = this.get(k);
    if (v !== undefined) this.delete(k);
    return v;
  }

  get length() {
    return this.size;
  }
}

export class ReiT extends Rei {
  constructor(max = 5000) {
    super(max, 0);
    this.useTTL = false;
    this.exp = null;
  }
}

export const cache = new Rei(5000);
export const turbo = new ReiT(5000);
