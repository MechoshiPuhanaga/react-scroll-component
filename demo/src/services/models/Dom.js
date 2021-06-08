export class DOM {
  static classer = (classesArray) => {
    return Array.isArray(classesArray)
      ? classesArray.filter((c) => !!c).join(' ')
      : '';
  };
}
