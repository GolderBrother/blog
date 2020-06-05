interface Bird {
  fly()
  layEggs()
}
interface Fish {
  swim()
  layEggs()
}

function getSmallPet(): Fish | Bird {
  return;
}
let pet = getSmallPet();

// 使用类型谓词 
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}

const data = {
  str: '',
  num: 0,
  flag: false,
  flagNull: null,
};

let str2 = data.str ?? '空';
// data.num 为 0 时，可以通过。仅在 num 为 undefined 或者 null 时，不可以通过
let num2 = data.num ?? 666;
// data.flag 为 false 时，可以通过。仅在 flag 为 undefined 或者 null 时，不可以通过
let status2 = data.flagNull ?? true;

console.log('str=>', str2);
console.log('num=>', num2);
console.log('status=>', status2);

// let name: string;

// interface String {
//   // 这里是扩展，不是覆盖，所以放心使用
//   double(): string;
// }

// String.prototype.double = function () {
//   return this + '+' + this;
// };
// console.log('hello'.double());

// let x: number;

// x = 0;      // OK
// x = false;  // Error: boolean is not assignable to number

// ok
function f({ x }: { x: number } = { x: 0 }) {
  console.log(x);
}

const map = new Map([
  ['F', 'no'],
  ['T', 'yes'],
]);
for (let key of map.keys()) {
  console.log(key);
}

// 用 forEach 也可以遍历
map.forEach((value, key) => {
  console.log(key);
});

interface User {
  username: string
  id: number
  token: string
  avatar: string
  role: string
}
type UserWithoutToken = Omit<User, 'token'>
type UserWithTokenAndId = Pick<User, 'token'>

namespace Shape {
  const pi = Math.PI;

  export function cricle(r: number) {
    return pi * r ** 2
  }
}
import cricle = Shape.cricle;
console.log(cricle(2));

