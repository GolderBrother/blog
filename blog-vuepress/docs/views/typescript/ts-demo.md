# `TypeScript` 高级用法详解

## 1、接口与构造器签名

当我们的项目中拥有很多不同的类时并且这些类之间可能存在某方面的共同点，为了描述这种共同点，我们可以将其提取到一个接口(`interface`)中用于集中维护，并使用`implements`关键字来实现这个接口，示例如下：

```ts
interface IHuman {
  name: string;
  age: number;
  walk(): void;
}

class Human implements IHuman {
  public constructor(public name: string, public age: number) {
    this.name = name;
    this.age = age;
  }

  walk(): void {
    console.log('I am walking...');
  }
}
```

上述代码在编译阶段能顺利通过，但是我们注意到在`Human`类中包含`constructor`构造函数，如果我们想在接口中为该构造函数定义一个**签名**并让`Human`类来实现这个接口，看会发生什么：

```TypeScript
interface HumanConstructor {
  new (name: string, age: number);
}

// ->  Class 'Human' incorrectly implements interface 'HumanConstructor'.
// ->  Type 'Human' provides no match for the signature 'new (name: string, age: number): any'.
class Human implements HumanConstructor {

    public constructor(public name: string, public age: number) {
        this.name = name;
        this.age = age;
    }

    walk(): void {
        console.log('I am walking...');
    }
}
```

然而`TypeScript`会编译出错，告诉我们错误地实现了`HumanConstructor`接口，这是因为当一个类实现一个接口时，只会对实例部分进行编译检查，类的**静态部分**是不会被编译器检查的。因此这里我们尝试换种方式，直接操作类的**静态部分**，示例如下：

```ts
interface HumanConstructor {
  new (name: string, age: number);
}

interface IHuman {
  name: string;
  age: number;
  walk(): void;
}

class Human implements IHuman {
  public constructor(public name: string, public age: number) {
    this.name = name;
    this.age = age;
  }

  walk(): void {
    console.log('I am walking...');
  }
}

// 定义一个工厂方法
function createHuman(constructor: HumanConstructor, name: string, age: number): IHuman {
  return new constructor(name, age);
}

const man = createHuman(Human, 'tom', 18);
console.log(man.name, man.age); // -> tom 18
```

在上述示例中通过额外创建一个工厂方法`createHuman`并将构造函数作为第一个参数传入，此时当我们调用`createHuman(Human, 'tom', 18)`时编译器便会检查第一个参数是否符合`HumanConstructor`接口的构造器签名。

## 2、声明合并

在声明合并中最常见的合并类型就是**接口**了，因此这里先从**接口**开始介绍几种比较常见的合并方式。

### 2.1 接口合并

示例代码如下：

```ts
interface A {
  name: string;
}

interface A {
  age: number;
}

// 等价于
interface A {
  name: string;
  age: number;
}

const a: A = { name: 'tom', age: 18 };
```

接口合并的方式比较容易理解，即声明多个同名的接口，每个接口中包含**不同的属性声明**，最终这些来自多个接口的属性声明会被**合并到同一个接口**中。

> 注意：所有同名接口中的非函数成员必须唯一，如果不唯一则必须保证类型相同，否则编译器会报错。对于函数成员，后声明的同名接口会**覆盖**掉之前声明的同名接口，即后声明的同名接口中的函数相当于一次**重载**，具有**更高的优先级**。

### 2.2 函数合并

函数的合并可以简单理解为函数的**重载**，即通过同时定义多个不**同类型参数或不同类型返回值**的**同名函数**来实现，示例代码如下：

```ts
// 函数定义
function foo(x: number): number;
function foo(x: string): string;

// 函数具体实现(override 重载)
function foo(x: number | string): number | string {
  if (typeof x === 'number') {
    return x.toFixed(2);
  }

  return x.substring(0, x.length - 1);
}
```

在上述示例中，我们对`foo`函数进行多次定义，每次定义的函数参数类型不同，返回值类型不同，最后一次为函数的具体实现，在实现中只有在兼容到前面的所有定义时，编译器才不会报错。

> 注意：`TypeScript`编译器会优先从最开始的函数定义进行匹配，因此如果多个函数定义存在包含关系，则需要将最精确的函数定义放到最前面，否则将始终不会被匹配到。

### 2.3 类型别名联合

`类型别名联合`与`接口合并`有所区别，类型别名不会新建一个类型，只是创建一个`新的别名`来对多个类型进行引用，同时不能像接口一样`被实现(implements)`和`继承(extends)`，示例如下：

```ts
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

// ->  Constructors for derived classes must contain a 'super' call.ts(2377)
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
// -> 'Human' only refers to a type, but is being used as a value here.
```

## 3、keyof 索引查询

在`TypeScript`中的`keyof`有点类似于 JS 中的`Object.keys()`方法，但是区别在于前者遍历的是**类型中的字符串索引**，后者遍历的是**对象中的键名**，示例如下：

```ts
interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

type keys = keyof Rectangle;
// 等价于
type keys = 'x' | 'y' | 'width' | 'height';

// 这里使用了泛型，强制要求第二个参数的参数名必须包含在第一个参数的所有字符串索引中
function getRectProperty<T extends object, K extends keyof T>(rect: T, property: K): T[K] {
  return rect[property];
}

let rect: Rectangle = {
  x: 50,
  y: 50,
  width: 100,
  height: 200
};

console.log(getRectProperty(rect, 'width')); // -> 100
console.log(getRectProperty(rect, 'notExist'));
// -> Argument of type '"notExist"' is not assignable to parameter of type '"width" | "x" | "y" | "height"'.
```

在上述示例中我们通过使用`keyof`来限制函数的参数名`property`必须被包含在类型`Rectangle`的所有字符串索引中，如果没有被包含则编译器会报错，可以用来在编译时检测对象的属性名是否书写有误。

### 4、Partial 可选属性

在某些情况下，我们希望类型中的所有属性都不是必需的，只有在某些条件下才存在，我们就可以使用 Partial 来将已声明的类型中的所有属性标识为可选的，示例如下：

```ts
// 该类型已内置在TypeScript中
type Partial<T> = {
  [P in keyof T]?: T[P];
};

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

type PartialRectangle = Partial<Rectangle>;
// 等价于
type PartialRectangle = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

let rect: PartialRectangle = {
  width: 100,
  height: 200
};
```

在上述示例中由于我们使用`Partial`将所有属性标识为可选的，因此最终`rect对象`中虽然只包含`width`和`height`属性，但是编译器依旧没有报错，当我们不能明确地确定对象中包含哪些属性时，我们就可以通过`Partial`来声明。

## 5、Pick 部分选择

在某些应用场景下，我们可能需要从一个已声明的类型中抽取出一个子类型，在子类型中包含父类型中的**部分**或**全部**属性，这时我们可以使用 `Pick` 来实现，示例代码如下：

```ts
// 该类型已内置在TypeScript中
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

interface User {
  id: number;
  name: string;
  age: number;
  gender: number;
  email: string;
}

type PickUser = Pick<User, 'id' | 'name' | 'gender'>;
// 等价于
type PickUser = {
  id: number;
  name: string;
  gender: number;
};

let user: PickUser = {
  id: 1,
  name: 'tom',
  gender: 1
};
```

在上述示例中，由于我们只关心`user`对象中的`id，name和gender`是否存在，其他属性不做明确规定，因此我们就可以使用`Pick`从`User`接口中**拣选**出我们关心的属性而**忽略**其他属性的编译检查。

## 6、never 永不存在

`never`表示的是那些**永不存在的值**的类型，比如在函数中**抛出异常**或者**无限循环**，never 类型可以是**任何类型的子类型**，也可以赋值给任何类型，但是相反却**没有一个类型可以作为 never 类型的子类型**，示例如下：

```ts
// 函数抛出异常
function throwError(message: string): never {
  throw new Error(message);
}

// 函数自动推断出返回值为never类型
function reportError(message: string) {
  return throwError(message);
}

// 无限循环
function loop(): never {
  while (true) {
    console.log(1);
  }
}

// never类型可以是任何类型的子类型
let n: never;
let a: string = n;
let b: number = n;
let c: boolean = n;
let d: null = n;
let e: undefined = n;
let f: any = n;

// 任何类型都不能赋值给never类型
let a: string = '123';
let b: number = 0;
let c: boolean = true;
let d: null = null;
let e: undefined = undefined;
let f: any = [];

let n: never = a;
// -> Type 'string' is not assignable to type 'never'.

let n: never = b;
// -> Type 'number' is not assignable to type 'never'.

let n: never = c;
// -> Type 'true' is not assignable to type 'never'.

let n: never = d;
// -> Type 'null' is not assignable to type 'never'.

let n: never = e;
// -> Type 'undefined' is not assignable to type 'never'.

let n: never = f;
// -> Type 'any' is not assignable to type 'never'.
```

## 7、Exclude 属性排除

与`Pick`相反，`Pick`用于**拣选**出我们需要关心的属性，而`Exclude`用于**排除**掉我们不需要关心的属性，示例如下：

```ts
// 该类型已内置在TypeScript中
// 这里使用了条件类型(Conditional Type)，和JS中的三目运算符效果一致
type Exclude<T, U> = T extends U ? never : T;

interface User {
  id: number;
  name: string;
  age: number;
  gender: number;
  email: string;
}

type keys = keyof User; // -> "id" | "name" | "age" | "gender" | "email"

type ExcludeUser = Exclude<keys, 'age' | 'email'>;
// 等价于
type ExcludeUser = 'id' | 'name' | 'gender';
```

在上述示例中我们通过在`ExcludeUser`中传入我们不需要关心的`age`和`email`属性，`Exclude`会帮助我们将不需要的属性进行**剔除**，留下的属性`id，name和gender`即为我们需要关心的属性。一般来说，`Exclude`很少单独使用，可以与其他类型**配合**实现更复杂更有用的功能。

## 8、Omit 属性忽略

在上一个用法中，我们使用`Exclude`来**排除**掉其他不需要的属性，但是在上述示例中的写法耦合度较高，当有其他类型也需要这样处理时，就必须再实现一遍相同的逻辑，不妨我们再进一步**封装**，隐藏这些底层的处理细节，只对外暴露简单的公共接口，示例如下：

```ts
// 使用Pick和Exclude组合实现
// K -> age, email
// T -> id, name, age, gender, email
// Exclude<keyof T, K> -> id, name, gender
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

interface User {
  id: number;
  name: string;
  age: number;
  gender: number;
  email: string;
}

// 表示忽略掉User接口中的age和email属性
type OmitUser = Omit<User, 'age' | 'email'>;
// 等价于
type OmitUser = {
  id: number;
  name: string;
  gender: number;
};

let user: OmitUser = {
  id: 1,
  name: 'tom',
  gender: 1
};
```

在上述示例中，我们需要忽略掉`User`接口中的`age`和`email`属性，则只需要将**接口名**和**属性**传入`Omit`即可，对于其他类型也是如此，大大提高了类型的可扩展能力，方便复用。

## 总结

在本文中总结了几种`TypeScript`的使用技巧，如果在我们的`TypeScript`项目中发现有很多**类型声明**的地方具有**共性**，那么不妨可以使用文中的几种技巧来对其进行优化改善，增加代码的可维护性和可复用性。

## 最后

文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)哦~
