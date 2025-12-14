function _getType(obj: any): string {
  // @ts-ignore
  const type = Object.prototype.toString
    .call(obj)
    .match(/^\[object (.*)\]$/)[1]
    .toLowerCase()
  if (type === "string" && typeof obj === "object") return "object" // Let "new String('')" return 'object'
  if (obj === null) return "null" // PhantomJS has type "DOMWindow" for null
  if (obj === undefined) return "undefined" // PhantomJS has type "DOMWindow" for undefined
  return type
}

export function isString(value: any): boolean {
  return _getType(value) === "string"
}

export function isObject(value: any): boolean {
  return _getType(value) === "object"
}

export function isArray(value: any): boolean {
  return _getType(value) === "array"
}

export function isFunction(value: any): boolean {
  return _getType(value) === "function"
}

export function isEmpty(value: any) {
  if (value === null || value === undefined || value === "") return true
  if (isObject(value)) return Object.keys(value).length === 0
  if (isArray(value)) return value.length === 0

  return false
}

// export function findPositions(mainStr: string, subStr: string): number[] {
//   try {
//     let regex = new RegExp(subStr, "gi");
//     let result;
//     let positions: number[] = [];

//     while ((result = regex.exec(mainStr))) {
//       positions.push(result.index);
//     }

//     return positions;
//   } catch (error) {
//     console.error("** [JR] error of findPositions **", error);
//     return [];
//   }
// }
