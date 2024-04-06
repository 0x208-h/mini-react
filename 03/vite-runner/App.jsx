import React from "./React.js";

// let count = 10;
let props = { id: "11111111111" };
// let isShow = false;
// let acount = 0;
// let bcount = 1;

const A = () => {
  const [count, setCount] = React.useState(0);
  const [bar, setBar] = React.useState("bar");
  console.log("a run");
  const handleClick = () => {
    // setCount((c) => c + 1);
    setBar(() => "bar");
  };
  return (
    <div>
      {count}
      <div>{bar}</div>
      <button onClick={handleClick}>click</button>
      <div>
        11111
        <div>child</div>
      </div>
    </div>
  );
};
// const B = () => {
//   console.log("b run");
//   const handleClick = () => {
//     bcount++;
//     React.update()();
//   };
//   return (
//     <div>
//       {bcount}
//       <button onClick={handleClick}>click</button>
//       <div>
//         11111
//         <div>child</div>
//       </div>
//     </div>
//   );
// };
function Counter({ num }) {
  // update
  // function handleClick() {
  //   console.log("click");
  //   // count++;
  //   // props = {};
  //   isShow = !isShow;
  //   React.update();
  // }

  const C = () => <p>333</p>;

  return (
    <div {...props}>
      {/* count: {count} */}
      {/* {isShow ? a : <C />} */}
      {/* <button onClick={handleClick}>click</button> */}
      <A />
      {/* <B /> */}
      {/* {isShow && <C />} */}
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
