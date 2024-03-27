/**
 * @typedef {Object} VdomPropsItem
 * @property {VdomProps[]} children
 * @property {any}
 */

/**
 * @typedef {Object} VdomProps
 * @property {string} type
 * @property {VdomPropsItem} props
 */

function createTextNode(nodeValue) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue,
      children: [],
    },
  };
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "string" ? createTextNode(child) : child
      ),
    },
  };
}

let nextWorkOfUnit = null;
let root = null;
// v4
/**
 *
 * @param {VdomProps} node vdom 节点
 * @param {Element} container 容器
 */
function render(node, container) {
  nextWorkOfUnit = { dom: container, props: { children: [node] } };
  root = nextWorkOfUnit;
  // // 生成dom
  // const dom =
  //   node.type === "TEXT_ELEMENT"
  //     ? document.createTextNode("app")
  //     : document.createElement(node.type);
  // // 添加属性
  // Object.keys(node.props).forEach((key) => {
  //   if (key !== "children") {
  //     dom[key] = node.props[key];
  //   }
  // });
  // const children = node.props.children;
  // children.forEach((child) => render(child, dom));
  // // append
  // container.append(dom);
}

function createDom(type) {
  return type === "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(type);
}

function updateProps(dom, props) {
  Object.keys(props).forEach((key) => {
    if (key !== "children") {
      dom[key] = props[key];
    }
  });
}

function initChildren(fiber) {
  const children = fiber.props.children;
  let prevChild = null;
  children.forEach((child, index) => {
    const newFiber = {
      type: child.type,
      props: child.props,
      child: null,
      sibling: null,
      parent: fiber,
      dom: null,
    };
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevChild.sibling = newFiber;
    }
    prevChild = newFiber;
  });
}

function performWorkOfUnit(fiber) {
  if (!fiber.dom) {
    // 1. 创建dom
    const dom = (fiber.dom = createDom(fiber.type));
    // fiber.parent.dom.append(dom);
    // 2. 处理props
    updateProps(dom, fiber.props);
  }
  // 3. 转换链表
  initChildren(fiber);

  console.log(fiber, "fiber");

  // 4. 返回下一个任务
  if (fiber.child) {
    return fiber.child;
  }
  if (fiber.sibling) {
    return fiber.sibling;
  }
  let parent = fiber.parent;
  while (parent) {
    if (parent.sibling) {
      return parent.sibling;
    }
    parent = parent.parent;
  }
  // return fiber.parent.sibling;
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  fiber.parent.dom.append(fiber.dom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function workLoop(deadLine) {
  let shouldYield = false;
  while (!shouldYield && nextWorkOfUnit) {
    nextWorkOfUnit = performWorkOfUnit(nextWorkOfUnit);
    shouldYield = deadLine.timeRemaining() < 1;
  }
  if (!nextWorkOfUnit && root) {
    // 最后一个节点
    commitRoot();
  }
  requestIdleCallback(workLoop);
}

function commitRoot() {
  console.log(root, "root");
  commitWork(root.child);
  root = null;
}

requestIdleCallback(workLoop);

const React = {
  render,
  createElement,
};

export default React;
