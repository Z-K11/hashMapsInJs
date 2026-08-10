// hashMap implementation
export default class hashMap {
  #loadFactor;
  #capacity;
  #table;
  #keys;
  #size;
  constructor() {
    this.#capacity = 16;
    this.#loadFactor = 0.75;
    this.#table = new Array(this.#capacity).fill(null);
    this.#keys = new Array(this.#capacity);
    this.#size = 0;
  }

  // Has function to create array indices using keys
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }
    return hashCode;
  }

  // Set function to add a value using it's key to the table
  set(key, value) {
    const index = this.hash(key);
    if (this.#keys[index] === undefined) {
      this.#size++;
      this.#keys[index] = key;
    }
    this.#table[index] = value;
    if (this.#size / this.#capacity > this.#loadFactor) {
      this.#capacity = this.#capacity * 2;
      const oldKeys = this.keys();
      const oldValues = this.values();
      this.#table = new Array(this.#capacity).fill(null);
      this.#keys = new Array(this.#capacity);
      this.#size = 0;
      for (let i = 0; i < oldKeys.length; i++) {
        this.set(oldKeys[i], oldValues[i]);
        console.log(`resizing-${i}`);
      }
    }
  }

  // get function to retreive a value from the table using it's key
  get(key) {
    return this.#table[this.hash(key)];
  }

  has(key) {
    return this.#table[this.hash(key)] !== null;
  }
  remove(key) {
    if (!(this.#table[this.hash(key)] !== null)) return false;
    else {
      this.#table[key] = null;
      return true;
    }
  }
  length() {
    return this.#size;
  }
  clear() {
    this.#table.fill(null);
  }
  keys() {
    let returnKeys = [];
    for (let i = 0; i < this.#keys.length; i++) {
      if (this.#keys[i] !== undefined) {
        returnKeys.push(this.#keys[i]);
      }
    }
    return returnKeys;
  }
  values() {
    let returnValues = [];
    for (let i = 0; i < this.#table.length; i++) {
      if (this.#table[i] !== null) returnValues.push(this.#table[i]);
    }
    return returnValues;
  }
  entries() {
    let entries = [];
    let keys = this.keys();
    let values = this.values();
    for (let i = 0; i < keys.length; i++) {
      entries.push([keys[i], values[i]]);
    }
    return entries;
  }
}
