import React from "./React.js";
export default {
  createRoot(container) {
    return {
      render(node) {
        console.log(node, "node");
        React.render(node, container);
      },
    };
  },
};
