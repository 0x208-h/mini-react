import React from "./React.js";
export default {
  createRoot(container) {
    return {
      render(node) {
        React.render(node, container);
      },
    };
  },
};
