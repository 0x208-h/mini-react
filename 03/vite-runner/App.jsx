import React from "./React.js";

let count = 10;
let props = { id: "11111111111" };
let isShow = false;
function Counter({ num }) {
  // update
  function handleClick() {
    console.log("click");
    // count++;
    // props = {};
    isShow = !isShow;
    React.update();
  }

  const a = <div> 111</div>;
  // const b = <p>222</p>;
  const C = () => <p>333</p>;

  return (
    <div {...props}>
      count: {count}
      {isShow ? a : <C />}
      <button onClick={handleClick}>click</button>
    </div>
  );
}

function CounterContainer() {
  return <Counter></Counter>;
}

function App() {
  return (
    <div>
      hi-mini-react
      <Counter num={10}></Counter>
      {/* <Counter num={20}></Counter> */}
      {/* <CounterContainer></CounterContainer> */}
    </div>
  );
}

export default App;
