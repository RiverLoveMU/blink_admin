class LinkedNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value) {
    const node = new LinkedNode(value, null);
    if (this.head) {
      this.tail.next = node;
      this.tail = node;
    } else {
      this.head = node;
      this.tail = node;
    }

    return this;
  }

  prepend(value) {
    const node = new LinkedNode(value, this.head);
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }

    return this;
  }

  insert(value, rawIndex) {
    const index = rawIndex < 0 ? 0 : rawIndex;
    if (index === 0) {
      this.prepend(value);
    } else {
      let currentNode = this.head;
      for (
        let currentIndex = 0;
        currentIndex < index - 1 && currentNode.next;
        currentIndex++
      ) {
        currentNode = currentNode.next;
      }
      let node = new LinkedNode(value);
      node.next = currentNode.next;
      currentNode.next = node;
      if (!node.next) {
        this.tail = node;
      }
    }

    return this;
  }

  remove(value) {
    if (!this.head) {
      return this;
    }

    while (this.head && this.head.value === value) {
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode) {
      while (currentNode.next) {
        if (currentNode.next.value === value) {
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    if (this.tail.value === value) {
      this.tail = currentNode;
    }

    return this;
  }

  find(value, callback) {
    let currentNode = this.head;

    if (!currentNode) {
      return null;
    }

    while (currentNode) {
      console.log(currentNode, 111);
      if (value && value === currentNode.value) {
        return currentNode;
      }

      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  traverse(callback) {
    let currentNode = this.head;
    while (currentNode) {
      callback(currentNode);
      currentNode = currentNode.next;
    }
  }

  toArray() {
    const nodes = [];

    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  reverse() {
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currNode) {
      nextNode = currNode.next;
      currNode.next = prevNode;
      prevNode = currNode;
      currNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}

const list = new LinkedList();

list
  .append(1)
  .append(1)
  .append(1)
  .append(2)
  .append(3)
  .append(4)
  .append(5)
  .append(5)
  .append(5)
  .append(5)
  .append(5)
  .insert(99, 10)
  .insert(991, 12)
  .insert(992, 3);

const list2 = new LinkedList();

list2.append(1).remove(1);

console.log(list.toArray());
console.log(list2.toArray());
console.log(list2);
