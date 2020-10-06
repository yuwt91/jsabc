class TestArray {
  constructor() {
    this.length = 0;
    this.data = {};
  }

  clear() {
    this.length = 0;
  }

  insert(ele, index) {
    for (let i = this.length; i > index; i--) {
      this.data[i] = this.data[i - 1];
    }
    this.data[index] = ele;
    this.length++;
    return this.data;
  }

  remove(index) {

    if ((index < 0) || (index > this.length - 1)) return null;

    const eleRemoved = this.data[index];

    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }

    return eleRemoved;
  }

  append(ele) {
    this.data[this.length] = ele;
    this.length++;
    return this.data;
  }

  pop() {
    const lastEle = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    return lastEle;
  }

  getValue(index) {
    if ((index < 0) || (index > this.length - 1)) return undefined;
    return this.data[index];
  }

}