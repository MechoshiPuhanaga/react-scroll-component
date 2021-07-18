export class Global {
  static idGenerator = () => `_${Math.random().toString(36).substr(2, 9)}`;
}
