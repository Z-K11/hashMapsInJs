// hashMap implementation
class hashMap {
  #loadFactor;
  #capacity;
  #table;
  constructor() {
    this.#capacity = 16;
    this.#loadFactor = 0.75;
    this.#table = new Array(this.#capacity).fill(0);
  }

  // Has function to create array indeces using keys
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
    let index = this.hashCode(key);
    this.#table[index] = value;
  }

  // get function to retreive a value from the table using it's key
  get(key) {
    return this.#table[this.hash(key)];
  }
}
