// interface StringArray {
//   [index: number]: string;
// }

// // let myArray: StringArray;
// // myArray = ["Bob", "Fred"];

// interface ReadonlyStringArray {
//   readonly [index: number]: string;
// }
// let myArray: ReadonlyStringArray = ["Alice", "Bob"];
// myArray[2] = "Mallory"; // error! Index signature in type 'ReadonlyStringArray' only permits reading.


// interface NumberDictionary {
//   [index: string]: number;
//   length: number; // 可以，length是number类型
//   name: string; // Property 'name' of type 'string' is not assignable to string index type 'number'. 错误，`name`的类型与索引类型返回值的类型不匹配
// }


// interface ReadonlyStringArray {
//   readonly [index: number]: string;
// }
// let myArray: ReadonlyStringArray = ['Alice', 'Bob'];
// myArray[2] = 'Mallory'; // Index signature in type 'ReadonlyStringArray' only permits reading.

// interface Person {
//   name: string
// }

// interface Person {
//   age: number
// }

// interface Person {
//   sex: string
// }

// const golderBrother: Person = {
//   name: 'golderBrother',
//   age: 18,
//   sex: 'man'
// };

interface Point {
  x: number;
  y: number;
}

class SomePoint implements Point {
  x: 1;
  y: 2;
}

type Point2 = {
  x: number;
  y: number;
};

class SomePoint2 implements Point2 {
  x: 1;
  y: 2;
}

type PartialPoint = { x: number; } | { y: number; };

// FIXME: A class can only implement an object type or intersection of object types with statically known members.
// class SomePartialPoint implements PartialPoint {
//   x: 1;
//   y: 2;
// }

interface FuncWithAttachment {
  (param: string): boolean;
  someProperty: number;
}

const testFunc: FuncWithAttachment = function (param: string) {
  return param.indexOf('golderBrother') > -1;
};
const result = testFunc('golderBrother'); // 有类型提醒
testFunc.someProperty = 18;

interface IA {
  a: string;
  b: string;
}

type TB = {
  b: number | string;
  c: number[];
}

type TC = IA | TB;// TC 的 key，包含 ab 或者 bc 即可，当然，包含 abc 也可以
type TD = IA & TB;// TD 的 可以,必须包含 abc

let tc: TC = { a: 'a', b: 'b' }
let td: TD = { a: 'a', b: '2', c: [3] }

interface A {
  name: string;
  age: number;
  sayName: (name: string) => void;
}

interface B {
  name: string;
  gender: string;
  sayGender: (gender: string) => void;
}

let a: A & B;

// 这是都是合法的
a.age;
a.name
a.gender
a.sayName
a.sayGender;


interface IQZQD {
  cnName: string;
  age: number;
  author: string;
}
type ant = keyof IQZQD;

interface SelfMap<T> {
  [key: string]: T;
}

//T[U]是索引访问操作符;U是一个属性名称。
let keys: keyof SelfMap<number>; //string | number
let value: SelfMap<number>['antzone'];//number



function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}

interface Person {
  name: string;
  age: number;
}
let p: keyof Person;
let person: Person = {
  name: 'Jarid',
  age: 35
};
let strings: string[] = pluck(person, ['name', 'name', 'name']); //["Jarid", "Jarid", "Jarid"]


interface User {
  name: string;
  age: number;
}

// 当传入参数 `para` 是 `User` 时，不传 `flag`
declare function test(para: User): number;
// 当传入 `para` 是 `number` 时，要传入 `flag`
declare function test(para: number, flag: boolean): number;

const user: User = {
  name: 'Jack',
  age: 666
};

// Error: 参数不匹配(Argument of type 'User' is not assignable to parameter of type 'number')
const res = test(user, false);

// 所以，我们需要调整传入的参数类型
const res2 = test(18, false);


