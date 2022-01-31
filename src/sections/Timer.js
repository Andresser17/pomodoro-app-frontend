import { useState, useEffect, useRef } from "react";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function CounterButton(props) {
  const mode = String(props.name).toLowerCase().replace(" ", "-");

  return (
    <button
      className="px-4 py-2 bg-blue-600 rounded text-md"
      onClick={() => props.toggleModes(mode)}
    >
      {props.name}
    </button>
  );
}

function CounterToggle(props) {
  const toggleModes = (mode) => {
    props.setCurrentMode(mode);
  };

  return (
    <div className="flex justify-around p-2 bg-white/10">
      <CounterButton toggleModes={toggleModes} name="Work" />
      <CounterButton toggleModes={toggleModes} name="Short Break" />
      <CounterButton toggleModes={toggleModes} name="Long Break" />
    </div>
  );
}

function Counter(props) {
  // Convert seconds to clock time;
  const minutes = Math.floor(props.time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(props.time % 60)
    .toString()
    .padStart(2, "0");

  return (
    <div className="flex items-center justify-center h-48 p-8 shadow-inner">
      <span className="text-6xl font-extrabold">
        {minutes}:{seconds}
      </span>
    </div>
  );
}

function Timer(props) {
  // Remain time in minutes
  const [remainTime, setRemainTime] = useState(0);
  // Toggle between different Pomodoro modes.
  const [currentMode, setCurrentMode] = useState("");
  const [startCount, setStartCount] = useState(false);

  // Start or stop count
  const toggle = () => {
    setStartCount(!startCount);
  };

  // Set all values of every mode
  const toggleModes = () => {
    // Iterate in modes
    props.modes.forEach(item => {
      // set default mode
      if (currentMode.length === 0 && item?.default) {
        setRemainTime(item.remainTime);
        setCurrentMode(item.mode)
        return;
      }

      // Set user selected mode
      // setRemainTime(item.remainTime); 
      return;
    })
  }

  useEffect(() => {
    toggleModes()
  }, [currentMode])

  const countdown = () => {
    if (remainTime === 0) return toggle();

    setRemainTime(remainTime - 1);
  };

  // Run countdown
  useInterval(countdown, startCount ? 1000 : null);

  return (
    <div className="flex flex-col justify-center p-4 text-white rounded bg-zinc-900 w-96">
      <CounterToggle setCurrentMode={setCurrentMode} />
      <Counter time={remainTime} />
      <button onClick={toggle} className="p-2 text-xl bg-blue-600 rounded">
        Start/Stop
      </button>
      {currentMode}
    </div>
  );
}

export default Timer;
