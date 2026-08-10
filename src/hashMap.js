import { list } from './list.js';
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
    this.#table = Array.from({ length: this.#capacity }, () => new list());
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
    this.#table[index].append(key, value);
    if (this.#size / this.#capacity > this.#loadFactor) {
      this.#capacity = this.#capacity * 2;
      const oldKeys = this.keys();
      const oldValues = this.values();
      this.#table = Array.from({ length: this.#capacity }, () => new list());
      this.#keys = new Array(this.#capacity);
      this.#size = 0;
      for (let i = 0; i < oldKeys.length; i++) {
        this.set(oldKeys[i], oldValues[i]);
      }
    }
  }

  // get function to retreive a value from the table using it's key
  get(key) {
    return this.#table[this.hash(key)].returnValues();
  }

  // checks if hash has a value for the key
  has(key) {
    return this.#table[this.hash(key)] !== null;
  }

  // removes the node from the bucket which contains the key
  removeNode(key) {
    const index = this.hash(key);
    if (this.#table[this.hash(key)] === null) return false;
    else {
      this.#table[index].keyRemove(key);
    }
  }

  // returns the length of the hashtable
  length() {
    return this.#size;
  }

  // clears all the indices of the hash table
  clear() {
    this.#table = Array.from({ length: this.#capacity }, () => new list());
    this.#keys = [];
  }

  // returns an array that lists all the keys currently held by the hashtable
  keys() {
    let returnKeys = [];
    for (let i = 0; i < this.#keys.length; i++) {
      if (this.#keys[i] !== undefined) {
        returnKeys.push(this.#keys[i]);
      }
    }
    return returnKeys;
  }

  // returns all the values corresponding to stored keys
  values() {
    let returnValues = [];
    for (let i = 0; i < this.#table.length; i++) {
      const bucket = this.#table[i].returnValues();
      if (bucket !== null) returnValues.push(...bucket);
    }
    return returnValues;
  }

  // returns array containing key,value pairs inside buckets
  entries() {
    let entries = [];
    for (let i = 0; i < this.#table.length; i++) {
      if (this.#table[i].returnAllEntries() !== null)
        entries.push(...this.#table[i].returnAllEntries());
    }
    return entries;
  }

  // removes all the data stored at the hash key and also removes the key from key storage
  remove(key) {
    const index = this.hash(key);
    if (this.#keys[index] === key) this.#keys[index] = undefined;
    this.#table[index] = new list();
  }
}
