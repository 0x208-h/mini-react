// v1
// const dom = document.createElement("div");

// dom.id = "app";

// document.querySelector("#root").append(dom);

// const textNode = document.createTextNode("");
// textNode.nodeValue = "app";
// dom.append(textNode);

// v2
// const textEl = {
//   type: "TEXT_ELEMENT",
//   props: {
//     nodeValue: "app",
//     children: [],
//   },
// };

// const el = {
//   type: "div",
//   props: {
//     id: "app",
//     children: [textEl],
//   },
// };

// const dom = document.createElement(el.type);

// dom.id = el.props.id;

// document.querySelector("#root").append(dom);

// const textNode = document.createTextNode("");
// textNode.nodeValue = textEl.props.nodeValue;
// dom.append(textNode);

// v3

// function createTextNode(nodeValue) {
//   return {
//     type: "TEXT_ELEMENT",
//     props: {
//       nodeValue,
//       children: [],
//     },
//   };
// }

// function createElement(type, props, ...children) {
//   return {
//     type,
//     props: {
//       ...props,
//       children: children.map((child) =>
//         typeof child === "string" ? createTextNode(child) : child
//       ),
//     },
//   };
// }

// const textEl = createTextNode("app");
// const App = createElement("div", { id: "id" }, textEl);

// const dom = document.createElement(App.type);

// dom.id = App.props.id;

// document.querySelector("#root").append(dom);

// const textNode = document.createTextNode("");
// textNode.nodeValue = textEl.props.nodeValue;
// dom.append(textNode);

// /**
//  * @typedef {Object} VdomPropsItem
//  * @property {VdomProps[]} children
//  * @property {any}
//  */

// /**
//  * @typedef {Object} VdomProps
//  * @property {string} type
//  * @property {VdomPropsItem} props
//  */

// // v4
// /**
//  *
//  * @param {VdomProps} node vdom 节点
//  * @param {Element} container 容器
//  */
// function render(node, container) {
//   // 生成dom
//   const dom =
//     node.type === "TEXT_ELEMENT"
//       ? document.createTextNode("app")
//       : document.createElement(node.type);
//   // 添加属性
//   Object.keys(node.props).forEach((key) => {
//     if (key !== "children") {
//       dom[key] = node.props[key];
//     }
//   });
//   const children = node.props.children;
//   children.forEach((child) => render(child, dom));
//   // append
//   container.append(dom);
// }

import ReactDOM from "./ReactDOM.js";
import App from "./App.js";

// const textEl = createTextNode("app");

// render(App, document.querySelector("#root"));

// const ReactDOM = {
//   createRoot(container) {
//     return {
//       render(node) {
//         render(node, container);
//       },
//     };
//   },
// };

ReactDOM.createRoot(document.querySelector("#root")).render(App);
