import React from "./React.js";

function Counter() {
  return <div>count</div>;
}

const App = () => {
  return (
    <div>
      111
      <Counter />
    </div>
  );
};
const AppOne = () => {
  return <div>222</div>;
};

console.log(AppOne);

export default App;
