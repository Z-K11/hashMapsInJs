import { node } from './node.js';
export class list {
  // Private field, this is the starting point head of the list
  #head;

  // Tail pointer always points to the last node of the list
  #tail;

  // Counts the size of the list
  #sizeCounter;

  constructor() {
    // Initially we set our head pointer = null
    this.#head = null;
    this.#tail = null;
    this.#sizeCounter = 0;
  }

  // function to push a key and value inside the linked list and create a new node
  append(key, value) {
    // checks if the head pointer is null meaning there are currently no nodes attached to the head pointer
    if (this.#head === null) {
      this.#sizeCounter++;
      // attaches first node to the head pointer and the tail pointer because list size is one
      this.#tail = new node(key, value, this.#sizeCounter - 1);
      this.#head = this.#tail;
      return;
    } else {
      // recursive function to traverse to the end of the list and add the current node
      this.#traverse(this.#head, key, value, this.#sizeCounter);
    }
  }

  // Function to add a value to the beginning of the list
  preAppend(value) {
    this.#sizeCounter++;
    let temp = new node(value, 0);
    temp.nextNode = this.#head;
    this.#head = temp;
    this.#reassignIndex(this.#head.nextNode, 1);
  }
  // Function to reassign index of every node after we add a new node to the beginning of the list
  #reassignIndex(currentNode, i) {
    // assigns new index to the current node
    currentNode.index = i;
    // If we are at last node all indeces have been assigned simply return
    if (currentNode.nextNode === null) {
      return;
    }
    // recursively traverse to the next node
    this.#reassignIndex(currentNode.nextNode, i + 1);
  }
  // returns the node value at the head node
  get headValue() {
    return this.#head.nodeValue;
  }

  // returns tail value for the tail node
  get tailValue() {
    return this.#tail.nodeValue;
  }

  // returns the size of the list
  get size() {
    return this.#sizeCounter;
  }

  // Fucntion to recursively traverse the list till we reach the end of the list
  #traverse(currentNode, key, value, index) {
    // Check to see if current key already exists this means user wants to overwrite the value
    if (currentNode.nodekey === key) {
      // Overwrite value
      currentNode.nodeValue = value;
      return;
    }
    // checks to see if we are at the last node
    if (currentNode.nextNode === null) {
      this.#sizeCounter++;
      // if we are at the last node appends the new node to the next pointer of the current node
      this.#tail = new node(key, value, index);
      currentNode.nextNode = this.#tail;
      return;
    } else {
      // keep traversing until we find the end of the node
      this.#traverse(currentNode.nextNode, key, value, index);
    }
  }

  // function to find the value at provided index
  at(index, currentNode = this.#head) {
    // node found with same index
    if (index === currentNode.index) return currentNode.nodeValue;
    // no node exists having the given index
    else if (currentNode.nextNode === null) return undefined;
    // recursively traverse until solved
    else return this.at(index, currentNode.nextNode);
  }

  // function to check if the linked list contains a given value
  contains(v, currentNode = this.#head) {
    // value found
    if (currentNode.nodeValue === v) return true;
    // value not found
    else if (currentNode.nextNode === null) return false;
    // recursively traverse
    else return this.contains(v, currentNode.nextNode);
  }

  // function to find the index of a given value inside list
  findIndexOf(v, currentNode = this.#head) {
    // value found
    if (currentNode.nodeValue === v) return currentNode.index;
    // value not found
    else if (currentNode.nextNode === null) return -1;
    // recursively traverse
    else return this.findIndexOf(v, currentNode.nextNode);
  }

  //function to remove the head node
  pop() {
    // if list already empty return undefied
    if (this.#head === null) return undefined;
    // node return value of head and remove head node, make the next node, head node
    else {
      const value = this.#head.nodeValue;
      this.#head = this.#head.nextNode;
      return value;
    }
  }

  // displays all the values of the list as a single string
  toString(currentNode = this.#head, str = '') {
    if (currentNode === null) {
      // append null to string when last node reached
      str += 'null';
      return str;
    } else {
      // keep appending node values to the string
      str += `( ${currentNode.nodeValue} ) -> `;
      return this.toString(currentNode.nextNode, str);
    }
  }

  // Returns all the values inside all the nodes in the linked list
  returnValues(currentNode = this.#head, values = []) {
    // this condition check if linked list is empty if it is we return null
    if (currentNode === null) return null;
    // if the node has a value we add it do the values array
    if (currentNode.nodeValue !== null) {
      values.push(currentNode.nodeValue);
      // recursively call the function till we reach the end of the node
      if (currentNode.nextNode !== null)
        return this.returnValues(currentNode.nextNode, values);
    }
    return values;
  }
}
