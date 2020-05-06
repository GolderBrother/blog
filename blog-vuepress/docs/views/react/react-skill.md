# 5 个技巧助你编写更好的 React 代码

> 本文分享几个技巧，这些技巧将改善你的 React 代码

## 1. 解构 props

在 JS 中解构对象（尤其是 props）可以大大减少代码中的重复。看下面的例子：

```js
//Parent Component
import React from 'react';

import CoffeeCard from './CoffeeCard';

const CafeMenu = () => {
  const coffeeList = [
    {
      id: '0',
      name: 'Espresso',
      price: '2.00',
      size: '16'
    },
    {
      id: '1',
      name: 'Cappuccino',
      price: '3.50',
      size: '24'
    },
    {
      id: '2',
      name: 'Caffee Latte',
      price: '2.70',
      size: '12'
    }
  ];

  return coffeeList.map(item => <CoffeeCard key={item.id} coffee={item} />);
};

export default CafeMenu;
```

`CafeMenu` 组件用于存储可用饮料的列表，现在我们想要创建另一个可以显示一种饮料的组件。如果不对 props 进行解构，我们的代码将像下面这样:

```js
//Child Component
import React from 'react';

const CoffeeCard = props => {
  return (
    <div>
      <h1>{props.coffee.name}</h1>
      <p>Price: {props.coffee.price}$</p>
      <p>Size: {props.coffee.size} oz</p>
    </div>
  );
};

export default CoffeeCard;
```

如你所见，它看起来并不好，每次我们需要获取某个属性时，都要重复 `props.coffee`，幸运的是，我们可以通过 ES6 的**对象解构**来简化它。

```js
//Child Component (after destructuring props)
import React from 'react';

const CoffeeCard = props => {
  const { name, price, size } = props.coffee;
  return (
    <div>
      <h1>{name}</h1>
      <p>Price: {price}$</p>
      <p>Size: {size} oz</p>
    </div>
  );
};

export default CoffeeCard;
```

如果我们想将大量参数传递给子组件，我们还可以直接在构造函数（或函数组件的参数）中解构 `props`。比如：

```js
//Parent Component
import React from 'react';

import ContactInfo from './ContactInfo';

const UserProfile = () => {
  const name = 'John Locke';
  const email = 'john@locke.com';
  const phone = '01632 960668';

  return <ContactInfo name={name} email={email} phone={phone} />;
};

export default UserProfile;
```

```js
//Child Component
import React from 'react';

const ContactInfo = ({ name, email, phone }) => {
  return (
    <div>
      <h1>{name}</h1>
      <p> E-mail: {email}</p>
      <p> Phone: {phone}</p>
    </div>
  );
};

export default ContactInfo;
```

## 2. 规范(保持)导入模块的顺序

有时（尤其是在"容器组件"中），我们需要使用许多不同的模块，并且组件导入看上去有些混乱，如:

```js
import { Auth } from 'aws-amplify';
import React from 'react';
import SidebarNavigation from './components/SidebarNavigation';
import { EuiPage, EuiPageBody } from '@elastic/eui';
import { keyCodes } from '@elastic/eui/lib/services';
import './index.css';
import HeaderNavigation from './components/HeaderNavigation';
import Routes from './Routes';
```

关于导入模块的理想顺序有很多不同的观点。我建议多参考，然后找到适合你自己的那种。

至于我自己，我通常按类型对导入进行分组，并按字母顺序对它们进行排序（这是可选操作）。我也倾向于保持以下顺序：

1. 标准模块
2. 第三方模块
3. 自己代码导入（组件）
4. 特定于模块的导入（例如 CSS，PNG 等）
5. 仅用于测试的代码

快速重构一下，我们的模块导入看上去舒服多了了。

```js
// 1. 标准模块
import React from 'react';

// 2. 第三方模块
import { Auth } from 'aws-amplify';
import { EuiPage, EuiPageBody } from '@elastic/eui';
import { keyCodes } from '@elastic/eui/lib/services';

// 3. 自己代码导入（组件）
import HeaderNavigation from './components/HeaderNavigation';
import SidebarNavigation from './components/SidebarNavigation';
import Routes from './Routes';

// 4. 特定于模块的导入（例如 CSS，PNG 等）
import './index.css';
```

## 3.使用片段 `Fragments`

在我们的组件中，我们经常返回多个元素。一个 `React` 组件**不能返回多个子节点**，因此我们通常将它们包装在 `div` 中。有时，这样的解决方案会有问题。比如下面的这个例子中：
我们要创建一个 `Table` 组件，其中包含一个 `Columns` 组件。

```js
import React from 'react';

import Columns from './Columns';

const Table = () => {
  return (
    <table>
      <tbody>
        <tr>
          <Columns />
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
```

`Columns` 组件中包含一些 `td` 元素。由于我们无法返回多个子节点，因此需要将这些元素包装在 div 中。

就像下面这样：

```js
import React from 'react';

const Columns = () => {
  return (
    <div>
      <td>Hello</td>
      <td>World</td>
    </div>
  );
};

export default Columns;
```

然后就报错了，因为 `tr` 标签中不能放置 `div`。我们可以使用 `Fragment` 标签来解决这个问题，如下所示：

```js
import React, { Fragment } from 'react';

const Columns = () => {
  return (
    <Fragment>
      <td>Hello</td>
      <td>World</td>
    </Fragment>
  );
};

export default Columns;
```

我们可以将 `Fragment` 视为**不可见**(不会被编译渲染出来)的 `div`。它在子组件将元素包装在标签中，将其带到父组件并**消失**。 你也可以使用简写的语法糖`<></>`，但是它不支持 `key` 和`属性`。

```js
import React from 'react';

const Columns = () => {
  return (
    <>
      <td>Hello</td>
      <td>World</td>
    </>
  );
};
export default Columns;
```

## 4. 使用展示组件和容器组件

将应用程序的组件分为`展示（木偶）`组件和`容器（智能）`组件。如果你不知道这些是什么，可以下面的介绍：

### 展示组件

- 主要关注`UI`，它们负责组件的外观。
- 数据由 `props` 提供，木偶组件中不应该调用 API，这是智能组件的工作
- 除了`UI`的依赖包，它们不需要依赖应用程序
- 它们可能包括状态，但仅用于操纵`UI`本身-它们不应存储应用程序数据。

木偶组件有：`加载指示器，模态，按钮，输入`。

### 容器组件

- 它们不关注样式，通常不包含任何样式
- 它们用于处理数据，可以请求数据，捕获更改和传递应用程序数据
- 负责管理状态，重新渲染组件等等
- 可能依赖于应用程序，调用 Redux，生命周期方法，API 和库等等。

> 使用展示组件和容器组件的好处

- 更好的可读性
- 更好的可重用性
- 更容易测试

此外，它还符合 **单一责任原则**: 一个组件负责**外观**，另一个组件负责**数据**。

### 示例

让我们看一个简单的例子。这是一个 `BookList` 组件，该组件可从 `API` 获取图书数据并将其显示在列表中。

```js
import React, { useState, useEffect } from 'react';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('api/books')
      .then(res => res.json())
      .then(books => {
        setBooks(books);
        setLoading(false);
      });
  }, []);

  const renderLoading = () => {
    return <p>Loading...</p>;
  };

  const renderBooks = () => {
    return (
      <ul>
        {books.map(book => (
          <li>{book.name}</li>
        ))}
      </ul>
    );
  };

  return <>{isLoading ? renderLoading() : renderBooks()}</>;
};
export default BookList;
```

该组件的问题在于，它负责太多事情。它获取并呈现数据。它还与一个特定的接口关联，因此在不复制代码的情况下，不能使用此组件显示特定用户的图书列表。

现在，让我们尝试将此组件分为**展示组件**和**容器组件**。

```js
import React from 'react';

const BookList = ({ books, isLoading }) => {
  const renderLoading = () => {
    return <p>Loading...</p>;
  };

  const renderBooks = () => {
    return (
      <ul>
        {books.map(book => (
          <li key={book.id}>{book.name}</li>
        ))}
      </ul>
    );
  };

  return <>{isLoading ? renderLoading() : renderBooks()}</>;
};
export default BookList;
```

```js
import React, { useState, useEffect } from 'react';
import BookList from './BookList';

const BookListContainer = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/books')
      .then(res => res.json())
      .then(books => {
        setBooks(books);
        setLoading(false);
      });
  }, []);

  return <BookList books={books} isLoading={isLoading} />;
};

export default BookListContainer;
```

如你所见，它看起来要好得多。更重要的是，它使我们可以在具有`不同数据的许多地方`使用 `BookList` 组件。

## 5. 使用 styled-components

对 `React` 组件进行样式设置一直是个难题。查找拼写错误的类名，维护大型 `CSS` 文件，**处理兼容性问题**有时可能很痛苦。

[styled-components](https://styled-components.com/) 是一个常见的 `css in js` 类库，和所有同类型的类库一样，通过 `js` **赋能**解决了原生 `css` 所不具备的能力，比如**变量、循环、函数**等。

要开始使用 [styled-components](https://styled-components.com/)，你需要首先**安装依赖**：

```bash
npm i styled-components
```

下面是一个示例：

```js
import React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  display: flex;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const MySCButton = styled.button`
  background: ${props => (props.primary ? props.mainColor : 'white')};
  color: ${props => (props.primary ? 'white' : props.mainColor)};
  display: block;
  font-size: 1em;
  margin: 1em;
  padding: 0.5em 1em;
  border: 2px solid ${props => props.mainColor};
  border-radius: 15px;
`;

function App() {
  return (
    <Grid>
      <Col>
        <MySCButton mainColor="#ee6352" primary>
          My 1st Button
        </MySCButton>
        <MySCButton mainColor="#ee6352">My 2st Button</MySCButton>
        <MySCButton mainColor="#ee6352">My 3st Button</MySCButton>
      </Col>
      <Col>
        <MySCButton mainColor="#515052" primary>
          My 4st Button
        </MySCButton>
        <MySCButton mainColor="#515052">My 5st Button</MySCButton>
        <MySCButton mainColor="#515052">My 6st Button</MySCButton>
      </Col>
    </Grid>
  );
}

export default App;
```

这只是样式化组件如何工作的一个简单示例，但是它们可以做的还远远不止这些。你可以在其[官方文档](https://styled-components.com/docs)中了解有关样式化组件的更多信息。

## 最后

文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)~
