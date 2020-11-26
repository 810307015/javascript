### React

1. React 的数据流是自顶向下单向流动的。
2. 生命周期：需要注意的是，当定义了`static getDerivedStateFromProps`的生命周期后，不再触发`componentWillMount`与`componentWillUpdate`这两个生命周期。

- 第一次挂载的时候
  > `constructor`
  > `componentWillMount`(在 16.0 之后废弃)/`getDerivedStateFromProps(props, state)`(16.0 之后新增的，在 render 之前会调用)
  > `render` > `componentDidMount`
- 数据更新(不改动 props 和 state 的时候直接调用 forceUpdate 方法)
  > `componentWillUpdate(nextProps, nextState)` / `getDerivedStateFromProps(props, state)` > `render` > `componentDidUpdate`
- 数据更新(更新 state)
  > `getDerivedStateFromProps(props, state)`(定义了就会调用)
  > `shouldComponentUpdate(nextProps, nextState)` > `componentWillUpdate(nextProps, nextState)`(当定义了 getDerivedStateFromProps 之后该生命周期钩子不再调用)
  > `render` > `componentDidUpdate`
- 数据更新(更新 props)
  > `componentWillReceiveProps(nextprops)`(在 16.0 之后废弃，) / `getDerivedStateFromProps(props, state)` > `shouldComponentUpdate(nextProps, nextState)` > `componentWillUpdate(nextProps, nextState)`(当定义了 getDerivedStateFromProps 之后该生命周期钩子不再调用)
  > `render` > `componentDidUpdate`
- 卸载时
  > `componentWillUnmount`

3. 使用浏览器的底层事件，可以使用`nativeEvent`获取。
4. React 底层对合成事件做了两件事：

- 事件委托。它并不会把事件处理函数直接绑定到 真实的节点上，而是把所有事件绑定到结构的外层，使用一个统一的事件监听器，这个事件监 听器上维持了一个映射来保存所有组件内部的事件监听和处理函数。
- 自动绑定。在`React`组件中，每个方法的上下文都会指向该组件的实例，即自动绑定`this`为当前组件。 而且`React`还会对这种引用进行缓存，以达到`CPU`和内存的优化。在使用`ES6 classes`或者纯函数时，这种自动绑定就不复存在了，我们需要手动实现`this`的绑定。

5. 表单组件的分类。针对于表单组件内部，是否可以对表单组件的呈现进行控制。

- 受控组件。输入的值始终由`React`的`state`驱动。
- 非受控组件。输入过程中不受`prop`或`state`的值影响，只能在初始化的时候使用`defaultValue`来给予一个初始值。

6. 组件间通信。

- 父传子。直接通过`props`来传递相关数据。
- 子传父。直接通过父组件传入一个回调函数，在子组件需要传递信息时调用。或者利用自定义事件机制，定义一个通用的自定义事件，在子组件中触发，在父组件中去监听。
- 跨级通信。使用`context`来实现数据共享，如 redux 等全局状态管理的插件。同样可以使用自定义事件机制。

7. mixin 的问题：

- 破坏了原有组件的封装。，比如`mixin`中有一个`renderList`方法，给我们带来了渲染`List`的能力，但它也可能带来了新的`state`和 props，这意味着组件有一 些“不可见”的状态需要我们去维护，但我们在使用的时候并不清楚。
- 命名冲突。像`handleChange`这样常见的名字，我们不能在两个`mixin`中同时使用，也不 能在自己的组件中使用这个名字的方法。
- 增加复杂性。们设计一个组件，引入名为`PopupMixin`的`mixin`，这样就给组件引进了`PopupMixin`生命周期方法，还有`hidePopup()`、`startPopup()`等方法。当我们再引入`HoverMixin`时，将有更多的方法被引进，比如`handleMouseEnter()`、`handle-MouseLeave()`、`isHovering()`方法。随着开发的推进，可能使得一个组件越来越庞大，越来越难以维护。

8. 高阶组件的定义：它接受`React`组件作为输入，输出一个新的`React`组件。
9. 高阶组件的实现：

- 属性代理。高阶组件通过被包裹的`React`组件来操作`props`。可以进行控制`props`，通过`ref`引用以及抽象`state`功能。
  ```jsx 
  import React, { Component } from 'React'; 
  const MyContainer = (WrappedComponent) => class extends Component { 
    render() { 
      return <WrappedComponent {...this.props} />; 
    }
  }
  ```
- 反向继承。高阶组件继承于被包裹的`React`组件。可以渲染劫持以及控制state。
  ```jsx
  const MyContainer = (WrappedComponent) =>  class extends WrappedComponent {  
    render() {   
      return super.render();    
    }
  }
  ```

10. 组件的性能优化。

- 使用`PureComponent`，继承自`PureComponent`的组件会自动实现一个`shouldComponentUpdate`方法，自动去浅比较`props`和`state`来决定组件需不需要更新。
- 使用无状态组件。尽量保持组件内部需要维护的状态足够少甚至完全只依赖于父组件的传参。
- 使用`Immutable`。`Immutable`是一种持久化的数据结构，使用旧数据创建新数据时，会共享相同的部分，仅仅操作不同的节点数据。它的优点主要是：
  * 降低了引用类型数据中值的改变带来的复杂度。如`var obj = { a: 1 }; foo(obj); console.log(obj.a)`，如果`foo`方法操作了`obj`中的数据，那么是不是就是不可知了，但是如果使用`Immutable`，那么就可以确定打印的是1。
  * 节省内存。`Immutable`使用结构共享尽量复用内存。没有被引用的对象会被垃圾回收。
  * 由于每次操作之后都会产生一个新的`Immutable`对象，所以很容易的去进行数据回退。
  * 拥抱函数式编程。只要输入一致，输出必然一 致，这样开发的组件更易于调试和组装。
  * 它的缺点就是太容易和原生对象进行混淆，在一些特定时候需要使用原生对象时需要将其进行转换。
- 合理的使用`key`。尽量不要把`key`设置成循环的下标，使用一个独一无二的标识来标识组件，可以保证在大量子节点在变换顺序时得到优化。

11. 
