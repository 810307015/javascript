### React-dom

#### render 的实现

```js
function render(element, container, callback) {
  // 首先判断它的容器container是不是一个真实的DOM元素，如果不是就抛出异常
  if (!isValidContainer(container)) {
    {
      throw Error("Target container is not a DOM element.");
    }
  }
  // 接下来判断这个container是不是已经使用过了，如果有也会抛出一个提示
  {
    var isModernRoot =
      isContainerMarkedAsRoot(container) &&
      container._reactRootContainer === undefined;

    if (isModernRoot) {
      error(
        "You are calling ReactDOM.render() on a container that was previously " +
          "passed to ReactDOM.createRoot(). This is not supported. " +
          "Did you mean to call root.render(element)?"
      );
    }
  }
  // 最后进入渲染，几个参数分别对应父组件，容器内的内容，容器，是否需要清空容器中原有的内容，回调函数
  return legacyRenderSubtreeIntoContainer(
    null,
    element,
    container,
    false,
    callback
  );
}

// 判断是不是真实dom的方法实现
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;
var DOCUMENT_NODE = 9;
var DOCUMENT_FRAGMENT_NODE = 11;
function isValidContainer(node) {
  return !!(
    node &&
    (node.nodeType === ELEMENT_NODE ||
      node.nodeType === DOCUMENT_NODE ||
      node.nodeType === DOCUMENT_FRAGMENT_NODE ||
      (node.nodeType === COMMENT_NODE &&
        node.nodeValue === " react-mount-point-unstable "))
  );
}
// 判断是不是用过了，如果用过了就会给它赋予一个特殊的属性
var internalContainerInstanceKey = "__reactContainere$" + randomKey;
function isContainerMarkedAsRoot(node) {
  return !!node[internalContainerInstanceKey];
}
// 真实的渲染方法
// 参数：父组件，容器内的内容，容器，是否需要清空容器中原有的内容，回调函数
function legacyRenderSubtreeIntoContainer(
  parentComponent,
  children,
  container,
  forceHydrate,
  callback
) {
  {
    topLevelUpdateWarnings(container);
    warnOnInvalidCallback$1(callback === undefined ? null : callback, "render"); // 检查回调函数是不是有效的
  } // TODO: Without `any` type, Flow says "Property cannot be accessed on any
  // member of intersection type." Whyyyyyy.

  var root = container._reactRootContainer; // 拿到它的属性，如果有表示已经是render过的，没有就是第一次render
  var fiberRoot;

  if (!root) {
    // Initial mount
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
      container,
      forceHydrate
    ); // 这一步会先清空container下的所有内容，然后返回一个新的ReactDOMBlockingRoot对象
    fiberRoot = root._internalRoot; // _internalRoot是在执行legacyCreateRootFromDOMContainer时附加上的

    if (typeof callback === "function") {
      var originalCallback = callback;

      callback = function () {
        var instance = getPublicRootInstance(fiberRoot);
        originalCallback.call(instance);
      };
    } // Initial mount should not be batched.

    unbatchedUpdates(function () {
      updateContainer(children, fiberRoot, parentComponent, callback);
    });
  } else {
    fiberRoot = root._internalRoot;

    if (typeof callback === "function") {
      var _originalCallback = callback;

      callback = function () {
        var instance = getPublicRootInstance(fiberRoot);

        _originalCallback.call(instance);
      };
    } // Update

    updateContainer(children, fiberRoot, parentComponent, callback);
  }

  return getPublicRootInstance(fiberRoot);
}

// 顶层元素更新
topLevelUpdateWarnings = function (container) {
  if (container._reactRootContainer && container.nodeType !== COMMENT_NODE) {
    var hostInstance = findHostInstanceWithNoPortals(
      container._reactRootContainer._internalRoot.current
    );

    if (hostInstance) {
      if (hostInstance.parentNode !== container) {
        error(
          "render(...): It looks like the React-rendered content of this " +
            "container was removed without using React. This is not " +
            "supported and will cause errors. Instead, call " +
            "ReactDOM.unmountComponentAtNode to empty a container."
        );
      }
    }
  }

  var isRootRenderedBySomeReact = !!container._reactRootContainer;
  var rootEl = getReactRootElementInContainer(container);
  var hasNonRootReactChild = !!(rootEl && getInstanceFromNode$1(rootEl));

  if (hasNonRootReactChild && !isRootRenderedBySomeReact) {
    error(
      "render(...): Replacing React-rendered children with a new root " +
        "component. If you intended to update the children of this node, " +
        "you should instead have the existing children update their state " +
        "and render the new components instead of calling ReactDOM.render."
    );
  }

  if (
    container.nodeType === ELEMENT_NODE &&
    container.tagName &&
    container.tagName.toUpperCase() === "BODY"
  ) {
    error(
      "render(): Rendering components directly into document.body is " +
        "discouraged, since its children are often manipulated by third-party " +
        "scripts and browser extensions. This may lead to subtle " +
        "reconciliation issues. Try rendering into a container element created " +
        "for your app."
    );
  }
};

// 检查回调函数是不是有效的
function warnOnInvalidCallback$1(callback, callerName) {
  {
    if (callback !== null && typeof callback !== 'function') {
      error('%s(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callerName, callback);
    }
  }
}

// unbatchedUpdates
var NoContext = 0;
var BatchedContext = 1;
var LegacyUnbatchedContext = 8;
var executionContext = NoContext;
function unbatchedUpdates(fn, a) { // 判断当前的执行上下文
  var prevExecutionContext = executionContext; // 第一次执行，prevExecutionContext = 0
  executionContext &= ~BatchedContext; // 第一次执行，executionContext = (0 & ~1) = 0
  executionContext |= LegacyUnbatchedContext; // 第一次执行，executionContext = (0 | 8) = 8;

  try {
    return fn(a);
  } finally {
    executionContext = prevExecutionContext; // 第一次执行，executionContext = 0

    if (executionContext === NoContext) { // 第一次执行，0 === 0，true，执行flushSyncCallbackQueue
      // Flush the immediate callbacks that were scheduled during this batch
      flushSyncCallbackQueue(); // 刷新异步回调的队列，应该是执行一下回调队列中的所有方法
    }
  }
}

// 更新容器内的内容，updateContainer
// 参数 内容，容器（已经在之前被处理过了），null，回调
function updateContainer(element, container, parentComponent, callback) {
  {
    onScheduleRoot(container, element);
  }

  var current$1 = container.current; // FiberNode对象
  var currentTime = requestCurrentTimeForUpdate();

  {
    // $FlowExpectedError - jest isn't a global, and isn't recognized outside of tests
    if ('undefined' !== typeof jest) {
      warnIfUnmockedScheduler(current$1);
      warnIfNotScopedWithMatchingAct(current$1);
    }
  }

  var suspenseConfig = requestCurrentSuspenseConfig();
  var expirationTime = computeExpirationForFiber(currentTime, current$1, suspenseConfig);
  var context = getContextForSubtree(parentComponent);

  if (container.context === null) {
    container.context = context;
  } else {
    container.pendingContext = context;
  }

  {
    if (isRendering && current !== null && !didWarnAboutNestedUpdates) {
      didWarnAboutNestedUpdates = true;

      error('Render methods should be a pure function of props and state; ' + 'triggering nested component updates from render is not allowed. ' + 'If necessary, trigger nested updates in componentDidUpdate.\n\n' + 'Check the render method of %s.', getComponentName(current.type) || 'Unknown');
    }
  }

  var update = createUpdate(expirationTime, suspenseConfig); // Caution: React DevTools currently depends on this property
  // being called "element".

  update.payload = {
    element: element
  };
  callback = callback === undefined ? null : callback;

  if (callback !== null) {
    {
      if (typeof callback !== 'function') {
        error('render(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callback);
      }
    }

    update.callback = callback;
  }

  enqueueUpdate(current$1, update);
  scheduleWork(current$1, expirationTime);
  return expirationTime;
}
```
