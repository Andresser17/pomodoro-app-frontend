import { useState, useEffect, useRef } from "react";
import { useReactiveVar } from "@apollo/client";
// Store
import { selectedTaskVar } from "../cache";

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
  // Convert mode to name
  const name = props.mode.mode
    .replace("-", " ")
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  return (
    <button
      className="px-4 py-2 bg-blue-600 rounded text-md"
      onClick={() => props.toggleModes(props.mode)}
    >
      {name}
    </button>
  );
}

function CounterToggle(props) {
  const toggleModes = (mode) => {
    props.setCurrentMode(mode);
  };

  const buttons = props.modes.map((mode) => {
    return <CounterButton toggleModes={toggleModes} mode={mode} />;
  });

  return <div className="flex justify-around p-2 bg-white/10">{buttons}</div>;
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
  const [currentMode, setCurrentMode] = useState({});
  const [startCount, setStartCount] = useState(false);
  // Get selected task from store
  const selectedTask = useReactiveVar(selectedTaskVar);

  // Start or stop count
  const toggle = () => {
    setStartCount(!startCount);
  };

  const setModeValues = () => {
    for (let item of props.modes) {
      // Set default mode
      if (Object.keys(currentMode).length === 0 && item?.default) {
        setCurrentMode(item);
        // setRemainTime(item.remainTime)
        break;
      }

      // Set user selected mode
      if (item.mode === currentMode.mode) {
        // Convert time to minutes expressed in seconds
        // setRemainTime(item.remainTime * 60);
        setRemainTime(item.remainTime);
        break;
      }
    }
  };

  useEffect(() => {
    setModeValues();
  }, [currentMode]);

  // Toggle mode when pomodoro is completed
  const toggleModes = () => {
    for (let i = 0; i < props.modes.length; i++) {
      let mode = props.modes[i];
      if (mode.mode === currentMode.mode && props.modes[i + 1] !== undefined) {
        setCurrentMode(props.modes[i + 1]);
        break;
      }

      if (props.modes[i + 1] === undefined) {
        setCurrentMode(props.modes[0]);
        break;
      }
    }
  };

  // Play alarm
  const playAlarm = () => {

  }

  const countdown = () => {
    // If time is out
    if (remainTime === 0) {
      toggleModes();
      toggle();
      // Add completed pomodoro to selected task
      if (currentMode.default) {
        selectedTask?.addCompletedPomodoro();
      } 
      return;
    }

    setRemainTime(remainTime - 1);
  };

  // Run countdown
  useInterval(countdown, startCount ? 1000 : null);

  return (
    <div className="flex flex-col justify-center p-4 text-white rounded bg-zinc-900 w-96">
      <CounterToggle modes={props.modes} setCurrentMode={setCurrentMode} />
      <Counter time={remainTime} />
      <button onClick={toggle} className="p-2 text-xl bg-blue-600 rounded">
        Start/Stop
      </button>
    </div>
  );
}

export default Timer;
