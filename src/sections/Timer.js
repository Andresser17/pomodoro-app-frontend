function CounterButton(props) {
  return (
    <button className="px-4 py-2 bg-blue-600 rounded text-md" onClick="">
      {props.name}
    </button>
  );
}

function CounterToggle(props) {
  return (
    <div className="flex justify-around p-2 bg-white/10">
      <CounterButton name="Work" />
      <CounterButton name="Short Break" />
      <CounterButton name="Long Break" />
    </div>
  );
}

function Counter(props) {
  return (
    <div className="flex items-center justify-center h-48 p-8 shadow-inner">
      <span className="text-6xl font-extrabold">{props.time}</span>
    </div>
  );
}

function Timer(props) {
  return (
    <div className="flex flex-col justify-center p-4 text-white rounded bg-zinc-900 w-96">
      <CounterToggle />
      <Counter time="30:00" />
      <button className="p-2 text-xl bg-blue-600 rounded">Start/Stop</button>
    </div>
  );
}

export default Timer;
