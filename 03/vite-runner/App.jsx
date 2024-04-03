import React from "./React.js";

function Counter({ num }) {
  return <div>count: {num}</div>;
}

const App = () => {
  return (
    <div>
      111
      <Counter num={10} />
    </div>
  );
};
const AppOne = () => {
  return <div>222</div>;
};

console.log(AppOne);

export default App;
