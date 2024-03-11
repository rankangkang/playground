# 从useEffect瞥见hooks工作机制

## 前言

用了这么久的react hooks，写了几个应用，它们都没什么问题，甚至工作得很好。

这很好，但是在当我使用`useEffect`时，总觉得有点不得劲儿，总觉得有些地方很迷惑，比如：

* 如何使用`useEffect`模拟`componentDidMount`生命周期？**🤔**
* 如何优雅地在`useEffect`内请求数据呢？为什么有时候会出现无限请求的情况？**🤔**
* 我有必要把所有在effect里用到的数据加到依赖么？**🤔**
* 我应该把函数当作`useEffect`依赖么？**🤔**
* 为什么有时候在`useEffect`里拿到了旧的数据？(明我刚刚`setXxx`)**🤔**
* `useEffect`和`useLayuoutEffect`的相比浏览器渲染的确切执行时机到底是什么？**🤔**
* effect在什么时间点清理？**🤔**
* ...

在很长的一段时间内，我深受以上问题的困扰。在我阅读Dan的[useEffect 完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)后，我不禁惊呼”索嘚斯内~“。

我记性不好，所以我想把这些”索嘚斯内“记录下来，以供日后翻阅。

大家也可到Dan的博客去看[原文](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)，写得十分详细。

如果你时间紧迫，也可直接到[这里](#尝试回答我们的问题)查看解答。

## 忘掉你已经学到的

当我们陷入一个问题许久而无法解答时，最好办法往往是跳脱出来，以不同的视角再次尝试。

这个道理同样适用于对`useEffect`的理解——**放弃从class生命周期的角度去理解`useEffect`，忘掉你已经学到的知识**。

## 类似”切片“的渲染

这里的”切片“不同于其他的编程语言中的切片（面向切片编程等）。

*你可以把整个应用想象成一个土豆，react是一把刀，每一次渲染都是刀切割土豆后形成的一片。*

> * 每一次渲染都有它自己的props与state
> * 每一次渲染都有它自己的事件处理函数
> * 每一次渲染都有它自己的effects

Dan的博客中如是说。你可以把props/state、事件处理函数和effects等这些数据，视作土豆片上的物质。当切割（渲染）这个动作完成之后，切片上的所有物质（数据）都已不变。

想要理解上面这些话，我们必须验证一下渲染。

### props/state

```jsx
function Counter() {
  const [count, setCount] = useState(0); // <--
  return (
    <div>
      <p>You clicked {count} times</p> {/* <-- */}
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

针对上述箭头指向代码，我们的第一直觉是`count`值被监听，在改变时视图自动更新。

但事实并非这样，`count`仅是一个数字而已，不是类似于`Vue`的”data-binding“、”watcher“、”proxy“或其他等等，它就是一个普普通通的数字，就如同下面的代码：

```jsx
const count = 42; // <--
// ...
<p>You clicked {count} times</p> {/* <-- */}
// ...
```

组件渲染的过程可以理解为如下的形式：

```jsx
// 第一次渲染
function Counter() {
  const count = 0; // Returned by useState()
  // ...
  <p>You clicked {count} times</p>
  // ...
}

// 点击过后的第二次渲染
function Counter() {
  const count = 1; // Returned by useState()
  // ...
  <p>You clicked {count} times</p>
  // ...
}

// 再次点击的第三次渲染
function Counter() {
  const count = 2; // Returned by useState()
  // ...
  <p>You clicked {count} times</p>
  // ...
}
```

>  **在状态更新的时候，React都会重新渲染组件。每一次渲染都能拿到独立的状态，它们的值是函数中的一个常量，在一次渲染中不可变。**

所以，`count`就是一个简简单单的、没有做任何数据绑定或监听的数据。

React做的仅仅是在渲染是插入了`count`(作为值)这个数据。当状态改变（`setCount`）时，react会带着改编后的值再次调用组件（将`count`作为值插入）。然后React更新DOM。

> * 任意一次渲染中的数据都不会随着时间改变。
>
> * 渲染输出的变化是由于组件的一次次调用引起的。
>
> * 每一次渲染包含的数据独立于其他。

---

### 事件处理函数

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={handleAlertClick}>
        Show alert
      </button>
    </div>
  );
}
```

以上代码的组件，按照下面的步骤操作：

* 点击`Click me`增加到3
* 点击`Show alert`
* 在3s内点击`Click me`增加到5

那怎么定时器结束后的`alert`会显示几呢？3（点击时状态）还是5（实时状态）？

---

如果你拿不定主意，现在就去试试呗~~

---

——答案是 3 。

原因从[上文](###props/state)便可瞥见。每一次渲染都会有他自己的props和state，他们是不变的，alert会”捕获“它们。被捕获时，`count`的状态为3，只是此时延迟到3秒后执行。

可以发现`count`在每一次函数调用中都是一个常量值。值得强调的是 — **组件函数每次渲染都会被调用，但是每一次调用中`count`值都是常量，并且它被赋予了当前渲染中的状态值。**

这不是React独有的特性，普通函数也有类似行为。

```jsx
function sayHi(person) {
  const name = person.name;  
  setTimeout(() => {
    alert('Hello, ' + name);
  }, 3000);
}

let someone = {name: 'Dan'};
sayHi(someone);

someone = {name: 'Yuzhi'};
sayHi(someone);

someone = {name: 'Dominic'};
sayHi(someone);
```

**在`sayHi`函数中，局部常量`name`会和某次调用中的`person`关联。**因为这个常量是局部的，所以每一次调用都是相互独立的。结果就是，当定时器回调触发的时候，每一个alert都会弹出它拥有的`name`。

同样的，`counter`的执行可以理解为如下过程：

```jsx
// 第一次点击
function Counter() {
  const count = 0; // Returned by useState()
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }
  // ...
}

// 第二次点击
function Counter() {
  const count = 1; // Returned by useState()
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }
  // ...
}

// 第三次点击
function Counter() {
  const count = 2; // Returned by useState()
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }
  // ...
}
```

> 看罢，仔细想来，使用hooks的function组件不就是一个function么？——这不就是function的闭包嘛！索嘚斯内~~

所以，实际上每一次渲染都有一个**新**的`handleAlertClick`，这个新的`handleAlertClick`记住了它自己的`count`：

```jsx
// 第一次渲染
function Counter() {
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + 0);
    }, 3000);
  }
  // ...
  <button onClick={handleAlertClick} /> // The one with 0 inside
  // ...
}

// 点击按钮，第二次渲染
function Counter() {
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + 1);
    }, 3000);
  }
  // ...
  <button onClick={handleAlertClick} /> // The one with 1 inside
  // ...
}

// 再次点击按钮，第三次渲染
function Counter() {
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + 2);
    }, 3000);
  }
  // ...
  <button onClick={handleAlertClick} /> // The one with 2 inside
  // ...
}
```

这也解释了事件处理函数”属于“某一次特定的渲染，在你调用它时，它会使用该次渲染中的数据。

**在任意一次渲染中，props和state是始终保持不变的。**如果props和state在不同的渲染中是相互独立的，那么使用到它们的任何值也是独立的（包括事件处理函数）。它们都“属于”一次特定的渲染。

> **注**：上文指出，每一次渲染的props与state均是不可变的（他们被const声明为常量），这样使得我们在整个完整的渲染过程中访问到的props与state保持不变（安全）。同时这也意味着在我们**通过`setXxx`修改state时，不推荐直接改变state，而是应该通过生成一个新的对象（`setXxx(newObj)`）修改state**，如此便能保证整个（一次）渲染中的state不会被污染。


---

那我们不妨再来看看看class组件版本：

```jsx
class Counter extends Component {
  constructor(...props: any[]) {
    super({...props})
    this.state = {
      count: 0
    }
  }

  handleAlertClick = () => {
    setTimeout(() => {
      alert('You clicked on: ' + this.state.count);
    }, 3000);
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1})}>
          Click me
        </button>
        <button onClick={this.handleAlertClick}>
          Show alert
        </button>
      </div>
    );
  }
}
```

class组件版本的会显示3还是5呢？去试试吧。

——答案是 5。

为什么答案是5而不是3，react的设计不因该遵循统一的尊则么？我也是这么觉得。但它们的确是不同的。**React修改了class中的`this.state`使其指向最新状态，导致一个切片上的（渲染）数据可变**。

上述问题可以使用闭包来修复，以此使其和`hooks`版本表现一致。如下：

```jsx
// ...

handleAlertClick = () => {
  const count = this.state.count
  setTimeout(() => {
    alert('You clicked on: ' + count);
  }, 3000);
}

// ...
```

> 所以在值始终不变的情况下使用闭包是非常棒的。这使它们非常容易思考，因为你本质上在引用常量。

---

### Effects

搞清楚上面的问题，终于来到本文主题。

其实同上文分析，`useEffect`也没什么两样。因为它也是个函数。

看如下例子：

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`; // <--
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

在这里，effect如何取到最新的`count`值呢？

现在，我们可以很自信的答出：`count`是特定渲染中的常量，依托闭包，effect的handler看到的总是那个特定的`count`。

也就是说，**并不是`count`的值在“不变”的effect中发生了改变，而是*effect 函数本身* 在每一次渲染中都不相同。**每一个版本的effect看到的`count`值均来源于它属于的那次渲染。

```jsx
// 第一次渲染
function Counter() {
  // ...
  useEffect(
    // Effect function from first render
    () => {
      document.title = `You clicked ${0} times`;
    }
  );
  // ...
}

// 点击后，第二次
function Counter() {
  // ...
  useEffect(
    // Effect function from second render
    () => {
      document.title = `You clicked ${1} times`;
    }
  );
  // ...
}

// 再次点击后，第三次
function Counter() {
  // ...
  useEffect(
    // Effect function from third render
    () => {
      document.title = `You clicked ${2} times`;
    }
  );
  // ..
}
```

React会记住你提供的effect函数，并且会在deps改变且更改作用于DOM并让浏览器绘制屏幕后去调用它。

所以虽然我们说的是一个 *effect*，但其实每次渲染都是一个*不同的函数* — 并且每个effect函数“看到”的props和state都来自于它属于的那次特定渲染。——它们看似是同一个，实则不是。

> 为了确保我们已经有了扎实的理解，我们再回顾一下第一次的渲染过程：
>
> - **React:** 给我状态为 `0`时候的UI。
> - **你的组件:**
>   - 给你需要渲染的内容: `<p>You clicked 0 times</p>`。
>   - 记得在渲染完了之后调用这个effect: `() => { document.title = 'You clicked 0 times' }`。
> - **React:** 没问题。开始更新UI，喂浏览器，我要给DOM添加一些东西。
> - **浏览器:** 酷，我已经把它绘制到屏幕上了。
> - **React:** 好的， 我现在开始运行给我的effect
>   - 运行 `() => { document.title = 'You clicked 0 times' }`。
>
> ------
>
> 现在我们回顾一下我们点击之后发生了什么：
>
> - **你的组件:** 喂 React, 把我的状态设置为`1`。
> - **React:** 给我状态为 `1`时候的UI。
> - **你的组件:**
>   - 给你需要渲染的内容: `<p>You clicked 1 times</p>`。
>   - 记得在渲染完了之后调用这个effect： `() => { document.title = 'You clicked 1 times' }`。
> - **React:** 没问题。开始更新UI，喂浏览器，我修改了DOM。
> - **Browser:** 酷，我已经将更改绘制到屏幕上了。
> - **React:** 好的， 我现在开始运行属于这次渲染的effect
>   - 运行 `() => { document.title = 'You clicked 1 times' }`。

---

## 尝试回答我们的问题

看到这里，我们已经了解了“渲染”的一些理念，可以尝试着解答开头提出的问题。

你可能已经忘了问题提出的问题是啥，说明你已经在上面的学习中融会贯通，这很棒。

如果你单纯和我一样记性不好😂，可以到[前言](#前言)快速回顾。

### **🤔**如何使用`useEffect`模拟`componentDidMount`生命周期？

你可能已经在很多其他的博客了解到可以使用`useEffect(fn, [])`，但是它们却并不完全相等。

> hooks和生命周期基于不同的原则。`compomentDidMount`之类的方法是围绕声明周期和渲染时间展开，而hooks则是围绕state和与DOM的同步设计的。

和`componentDidMount`不一样，`useEffect`会*捕获* props和state。所以即便在回调函数里，你拿到的还是初始的props和state。如果你想得到“最新”的值，可以使用ref。

> 记住，effects的心智模型和`componentDidMount`以及其他生命周期是不同的，试图找到它们之间完全一致的表达反而更容易使你混淆。想要更有效，你需要“think in effects”，**它的心智模型更接近于实现状态同步**，而不是响应生命周期事件。

### **🤔**如何优雅地在`useEffect`内请求数据呢？

我们知道`useEffect`不能接受异步方法，这也就意味着直接在`useEffect`内使用`async/await`语法是不可行的。

```jsx
useEffect(async () => {
  const res = await getData() // 这是不被允许的
}, [])
```

但是我们可以将异步请求的逻辑抽离出来，定义为一个`async`方法。

```jsx
useEffect(() => {
  async function getInitData() {
      const res = await getData()
  }
  getInitData()	// 这是被允许的
}, [])
```

> `[]`表示effect没有使用任何React数据流里的值，因此该effect仅被调用一次是安全的。`[]`同样也是一类常见问题的来源，也即你以为没使用数据流里的值但其实使用了。你需要学习一些策略（主要是`useReducer` 和 `useCallback`）来移除这些effect依赖，而不是错误地忽略它们。



### **🤔**为什么有时候会出现无限请求的情况？

这个通常发生于下列情况：

* 你在effect里做数据请求并且没有设置effect依赖参数。

  ```jsx
  useEffect(() => {
    async function getInitData() {
        const res = await getData()
    }
    getInitData()
  })
  ```

* 在useEffect内请求数据并以此改变state，同时将state置于useEffect的依赖参数deps内。

  ```jsx
  const [state, setState] = useState({})
  useEffect(() => {
    async function getInitData() {
      const res = await getData()
      if(res) {
        setState(res)
      }
    }
    getInitData()
  }, [state])
  ```

在没有设置设置`useEffect`依赖的情况下，effect在每次选然后执行一次，然后再effect中更新了状态引起渲染并再次触发effect，如此反复，造成无限请求的情况。

同理，无限循环的发生也可能是因为你设置的依赖总是会改变。你可以通过一个一个移除的方式排查到底是哪个依赖出现了问题。（函数可能会导致这个问题，这种情况下，你可以将函数提到`useEffect`内部，或者组件外面，或这用`useCallback`包裹）

### **🤔**我有必要把所有在effect里用到的数据加到依赖么？

推荐将你使用的依赖添加到effect的依赖数组里。

**`useEffect`通过依赖数组deps来对比你的effects以决定执不执行。如果当前渲染中的这些依赖项和上一次运行这个effect的时候值一样，React将会自动跳过这次effect（因为没有什么需要同步）。**

这就是为什么你如果想要避免effects不必要的重复调用，你只需要提供给`useEffect`一个依赖数组参数(deps)的原因。

```jsx
const [name, setName] = useState('')
useEffect(() => {
  console.log(name)
}, [name])
```

只有当name的值改变时，effect才会再次执行。**这好比你告诉React：“Hey，我知道你看不到这个函数里的东西，但我可以保证只使用了渲染中的`name`，别无其他。name改变了，你就把这个effect再执行一次。”**

#### 关于依赖项，不要对React说谎

> 关于依赖项对React撒谎会有不好的结果。直觉上，这很好理解，但我曾看到几乎所有依赖class心智模型使用`useEffect`的人都试图违反这个规则。（我刚开始也这么干了！）

Dan如是说，真巧，我也是:smile:。

至于为什么，我也不好说，[React官方FAQ](https://zh-hans.reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies)有提到，可以去看看。

#### 诚实告知依赖的方法

* **在依赖中包含所有在effect中用到的组件中的值**。

* **修改effect内部的代码以确保它包含的值只会在需要的时候发生变更**

  这个不必多说，懂的都懂。:satisfied:

---

有时候，为了更新一个状态，你不得不在effect使用原状态，如下：

```jsx
// ...
const [count, setCount] = useState(0)

useEffect(() => {
  const timer = setTimeout(() => {
    setCount(count + 1)
  }, 1000) // 1s 后 count + 1
}, [count])

// ...
```

如此，为了避免eslint的警告，你不得不将`count`加入effect依赖。

我们能做一些改进么？

> 当我们需要根据前一个状态来更新状态时，可以使用`setXxx`的函数形式来更新状态。

可以看到只在`setCount`中使用了`count`，那么我们其实并不需要在effect中使用`count`。

```jsx
// ...
const [count, setCount] = useState(0)

useEffect(() => {
  const timer = setTimeout(() => {
    setCount(c => c + 1)
  }, 1000) // 1s 后 count + 1
}, [])

// ...
```

---

但很快你会发现一个问题，当我需要更新的状态依赖除了包括前一状态还包括其他状态的时候（比如依赖props），我们还是不得不在effect依赖中引入其他的依赖（如props等）。如下：

```jsx
const step = props.step // step来自props
const [count, setCount] = useState(0)

useEffect(() => {
  const timer = setInterval(() => {
    setCount(c => c + step)
  }, 1000) // 每1s count + step
  return () => clearInterval(timer)
}, [step])
```

现在，一旦`step`值发生变化，定时器将会被重启，因为它依赖了`step`。这是我们所不希望看到的。

幸运的是，`setXxx(pre => {})`姐妹模式，且更加强大，能帮助我们解决这个问题。它就是`useReducer`.

在 hooks 中提供了的 useReducer 功能，可以增强 ReducerDemo 函数提供类似 Redux 的功能。它接收一个`reducer`函数和一个初始状态值作为参数，返回`state`与`dispatch`。更多有关[`useReducer`]()的信息你可以去这里。

那么上面的例子可以使用`useReducer`改写成为下面的样子：

```jsx
const step = props.step // step来自props
const reducer = useCallback((state, action) => {
  switch(action) {
    case 'add':
      return state + step
    case 'dec':
      return state - step
    default:
      return state
  }
}, [step])
const [count, dispatch] = useReducer(reducer, 0)

useEffect(() => {
  const timer = setInterval(() => {
    dispatch('add')
  }, 1000) // 1s间隔 count + step
  return () => clearInterval(timer)
}, [dispatch])
```

> **React会保证`dispatch`在组件的声明周期内保持不变。**

所以上面例子中不再需要重新订阅定时器。问题解决

<u>*（你可以从依赖中去除`dispatch`, `setState`, 和`useRef`包裹的值因为React会确保它们是静态的。不过你设置了它们作为依赖也没什么问题。）*</u>

---

### **🤔**我应该把函数当作`useEffect`依赖么？

一个典型的误解是认为函数不应该成为依赖，但在保证程序运行正确的情况下应该减少直接将函数作为依赖。

```jsx
// ...

const getData = async () => {
  // 获取数据
}

useEffect(() => {
  getData()
}, [])

// ...
```

这样的代码可以正常运行，但你很难保证它在今后的日渐复杂的迭代后还能正常工作。前文的经验告诉我们effect依赖了`getData`，我们应该将其添加到effect依赖里。

```jsx
// ...

const getData = async () => {
  // 获取数据
}

useEffect(() => {
  getData()
}, [getData])

// ...
```

好了，代码改好了，那这样是不是就行了呢？如果你的答案是肯定的，那你还得翻阅前文，仔细想想。

前文的经验告诉我们，react的每一次渲染都是function的再执行。那么看似不变的`getData`其实一直在变，它们在函数function执行时被创建，在执行完后销毁。它们不是同一个函数，这样将导致effect的依赖在每次渲染时被更新，如果你在请求数据时改变了state，effect将会被不停执行。显然，这是不可行的。

可行的解决方案有一下三个：

* 将仅有某个effect使用的函数移入该effect内

  ```jsx
  // ...
  useEffect(() => {
    const getData = async () => {
      // 获取数据
  	}
    getData()
  }, [getData])
  // ...
  ```

* 将需要逻辑复用的函数用useCallback包裹

  `useCallback`本质上是添加了一层依赖检查。它以另一种方式解决了问题 - **我们使函数本身只在需要的时候才改变，而不是去掉对函数的依赖。**

  ```js
  const getData = useCallback(async () => {
    // 获取数据
  }, [])
  
  useEffect(() => {
    getData()
  }, [getData])
  ```

* 将未使用function组件内的数据的函数移到function外

  ```jsx
  const getData = async () => {
  	// 获取数据
  }

  const Demo = () => {
    useEffect(() => {
      getData()
    }, [])
    return (
      <div>{/* code here */}</div>
    )
  }
  ```

> `eslint-plugin-react-hooks` 插件的`exhaustive-deps`lint规则会在你[编码的时候就分析effects](https://github.com/facebook/react/issues/14920)并且提供可能遗漏依赖的建议，也就是说，机器会告诉你组件中哪些数据流变更没有被正确地处理，十分建议你在开发时开启。

### **🤔**为什么有时候在`useEffect`里拿到了旧的数据？(明我刚刚`setXxx`)

在effect依赖无误的情况下，你可能会遇到这种情况：

```jsx
// ...
const [count, setCount] = useState(0)

useEffect(() => {
  setCount(10)
  console.log(count) // 首次输出 0
}, [count])

// ...
```

我明明刚刚`setCount`，为什么`console.log`的值却还是之前的值？（这里不会触发无限重渲染，因为state值改变为10后便不再改变）

这是因为**Effect拿到的总是定义它的那次渲染中的props和state**。

你在这次渲染中改变的state，在下一次渲染中才会被effect拿到。

如果这是你不希望看到的，你可以使用ref来保存这些值，来保证它们的值总是最新。

如果以上问题你都没有，但还是拿到旧的值，那你很可能遗漏了一些依赖。

### **🤔**`useEffect`和`useLayuoutEffect`的相比浏览器渲染的确切执行时机到底是什么？

准确来说，这个问题其实并不在本文的讨论范围，但还是简单回答下这个问题。

其实官方文档已经对这个问题有过详细的解释，在这里我就援引官方文档：

> 与 `componentDidMount`、`componentDidUpdate` 不同的是，在浏览器完成布局与绘制**之后**，传给 `useEffect` 的函数会延迟调用。这使得它适用于许多常见的副作用场景，比如设置订阅和事件处理等情况，因此不应在函数中执行阻塞浏览器更新屏幕的操作。
>
> 然而，并非所有 effect 都可以被延迟执行。例如，在浏览器执行下一次绘制前，用户可见的 DOM 变更就必须同步执行，这样用户才不会感觉到视觉上的不一致。（概念上类似于被动监听事件和主动监听事件的区别。）React 为此提供了一个额外的 useLayoutEffect Hook 来处理这类 effect。它和 `useEffect` 的结构相同，区别只是调用时机不同。
>
> <u>**虽然 `useEffect` 会在浏览器绘制后延迟执行，但会保证在任何新的渲染前执行。React 将在组件更新前刷新上一轮渲染的 effect**</u>。

我们可以从中提炼出一些信息：

* 赋值给`useEffect`的函数会在组件**渲染到屏幕之后、下一次渲染之前**执行，react将在组件更新前刷新上一轮的effect。
* `useLayoutEffect`会在所有的DOM变更之后同步调用effect。可以用它来读取DOM并同步触发重渲染。在浏览器绘制之前，`useLayoutEffect`内部的更新计划将被同步刷新。

### **🤔**effect在什么时间点清理？

React官方文档中有解释：

> 通常，组件卸载时需要清除 effect 创建的诸如订阅或计时器 ID 等资源。要实现这一点，`useEffect` 函数需返回一个清除函数。
>
> ```jsx
> useEffect(() => {
>   const subscription = props.source.subscribe();
>   return () => {
>     // 清除订阅
>     subscription.unsubscribe();
>   };
> });
> ```
>
> 为防止内存泄漏，清除函数会在组件卸载前执行。另外，如果组件多次渲染（通常如此），则**在执行下一个 effect 之前，上一个 effect 就已被清除**。在上述示例中，意味着组件的每一次更新都会创建新的订阅。

看完，让我们假设：

* 第一次渲染时 `props = { id: 10 }`
* 第二次渲染时`props = { id: 20 }`

你很有可能认为发生了下面的事：

* React 清除了 `{id: 10}`的effect。
* React 渲染`{id: 20}`的UI。
* React 运行`{id: 20}`的effect。

其实，刚看完官方文档的解释的我也是这么认为的😂。

但事实并非如此，Dan如是说。

> React只会在[浏览器绘制](https://medium.com/@dan_abramov/this-benchmark-is-indeed-flawed-c3d6b5b6f97f)后运行effects。这使得你的应用更流畅因为大多数effects并不会阻塞屏幕的更新。Effect的清除同样被延迟了。**上一次的effect会在重新渲染后被清除。**

实际发生的事是这样的：

- **React 渲染`{id: 20}`的UI。**
- 浏览器绘制。我们在屏幕上看到`{id: 20}`的UI。
- **React 清除`{id: 10}`的effect。**
- React 运行`{id: 20}`的effect。

这是为什么呢？为什么不能是我们提出的第一种可能呢？如果清除上一次的effect发生在props变成`{id: 20}`之后，那它为什么还能“看到”旧的`{id: 10}`？答案隐藏在前文。

> *组件内的每一个函数（包括事件处理函数，effects，定时器或者API调用等等）会捕获定义它们的那次渲染中的props和state。*

effect的清除并不会读取最新的props，它只能读取到它那次渲染中的props值。

至于为什么不能是第一种可能，笔者现在还不是很清楚😂。

*（可能是为了避免 <u>effect清除后与再次运行effect之间造成的空挡</u> 可能引发的问题？）*

## 写在最后

看到这里，你也许会发现这篇文章叫做“useEffect完全指南”或许更加合适。
这是对的，因为我也这么觉得😂。（有点标题党了属于是）
但我还是坚持使用现在这个标题，因为我的确从中领悟到一些之前未曾理解的React Hooks工作原理。

---
最后，如果你还是看不懂这篇文章，我推荐你去看Dan的[useEffect 完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)，写得非常好。
希望你也能在看完之后惊呼“索嘚斯内”~~😊
