type HumanProperty = {
  name: string;
  age: number;
  gender: number;
};

type HumanBehavior = {
  eat(): void;
  walk(): void;
};

type Human = HumanProperty & HumanBehavior;

let woman: Human = {
  name: 'tom',
  age: 18,
  gender: 0,
  eat() {
    console.log('I can eat.');
  },
  walk() {
    console.log('I can walk.');
  }
};

class HumanComponent extends Human {
  constructor(public name: string, public age: number, public gender: number) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }

  eat() {
    console.log('I can eat.');
  }

  walk() {
    console.log('I can walk.');
  }
}

// never类型可以是任何类型的子类型
let n: never;

// Type '"a"' is not assignable to type 'never'.
n = 'a';