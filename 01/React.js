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

// v4
/**
 *
 * @param {VdomProps} node vdom 节点
 * @param {Element} container 容器
 */
function render(node, container) {
  // 生成dom
  const dom =
    node.type === "TEXT_ELEMENT"
      ? document.createTextNode("app")
      : document.createElement(node.type);
  // 添加属性
  Object.keys(node.props).forEach((key) => {
    if (key !== "children") {
      dom[key] = node.props[key];
    }
  });
  const children = node.props.children;
  children.forEach((child) => render(child, dom));
  // append
  container.append(dom);
}

const React = {
  render,
  createElement,
};

export default React;
