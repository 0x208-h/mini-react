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
      children: children.map((child) => {
        console.log(child, "child");
        const isTextNode =
          typeof child === "string" || typeof child === "number";
        return isTextNode ? createTextNode(child) : child;
      }),
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

function initChildren(fiber, children) {
  let prevChild = null;
  children.forEach((child, index) => {
    const newFiber = {
      type: child.type,
      props: child.props,
      child: null,
      parent: fiber,
      sibling: null,
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
  const isFunctionComponent = typeof fiber.type === "function";
  if (!isFunctionComponent) {
    if (!fiber.dom) {
      // 1. 创建dom
      const dom = (fiber.dom = createDom(fiber.type));
      // fiber.parent.dom.append(dom);
      // 2. 处理props
      updateProps(dom, fiber.props);
    }
  }
  // 3. 转换链表
  const children = isFunctionComponent
    ? [fiber.type(fiber.props)]
    : fiber.props.children;
  initChildren(fiber, children);

  // console.log(fiber, "fiber");

  // 4. 返回下一个任务
  if (fiber.child) {
    return fiber.child;
  }
  let parent = fiber;
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
  let fiberParent = fiber.parent;
  while (!fiberParent.dom) {
    fiberParent = fiberParent.parent;
  }
  if (fiber.dom) {
    fiberParent.dom.append(fiber.dom);
  }
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
  // console.log(root, "root");
  commitWork(root.child);
  root = null;
}

requestIdleCallback(workLoop);

const React = {
  render,
  createElement,
};

export default React;
