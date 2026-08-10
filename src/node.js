export class node {
  //Private fields for the node class
  #value;
  //Stores the value inside the node
  #next;
  //Is used as a pointer that points to the next node
  #index;
  //Stores keys of the hashmap
  #key;
  //A varible to keep track of index of values inside linked list
  constructor(key, value, index) {
    //constructor initializes the object with the value given and sets the next pointet to null
    this.#key = key;
    this.#value = value;
    this.#next = null;
    this.#index = index;
  }

  //to set value of the next pointer
  set nextNode(nodePtr) {
    this.#next = nodePtr;
  }

  // to get the value of the next pointer
  get nextNode() {
    return this.#next;
  }

  // returns the index of the current node
  get index() {
    return this.#index;
  }

  //sets i as the new index of the current node
  set index(i) {
    this.#index = i;
  }

  // to get the value of the node
  get nodeValue() {
    return this.#value;
  }
}
