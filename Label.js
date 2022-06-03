export default class Label {
  constructor(title) {
    this.counter = 0;
    this.title = title;
  }

  increaseCounter() {
    this.counter++;
  }
}
