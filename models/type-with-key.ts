export interface TypeWithKey<T> {
  [key: string]: T
}

/* 
// example
const persona: TypeWithKey<string> = {
  name: "csa",
}
 */
