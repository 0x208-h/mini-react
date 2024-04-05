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

  const a = (
    <div>
      11
      <div>
        11111
        <div>child</div>
      </div>
    </div>
  );
  const b = <div>222</div>;
  const C = () => <p>333</p>;

  return (
    <div {...props}>
      count: {count}
      {/* {isShow ? a : <C />} */}
      <button onClick={handleClick}>click</button>
      {!isShow ? a : b}
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
