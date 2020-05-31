const enum Colors {
  Red,
  Yellow,
  Blue
}
// 常量枚举会在编译阶段被删除
let myColors = [Colors.Red, Colors.Yellow, Colors.Blue];
console.log(myColors);