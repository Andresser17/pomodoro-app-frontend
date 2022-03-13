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
  // Styles
  const basicStyles = "px-4 py-1 rounded text-md hover:text-gray-300";
  const selectedStyles = "bg-blue-600 hover:bg-blue-800";
  const [styles, setStyles] = useState(basicStyles);

  const applyStyles = () => {
    if (props.selected.mode === props.mode.mode) {
      setStyles(`${basicStyles} ${selectedStyles}`);
    } else setStyles(`${basicStyles}`);
  };

  useEffect(() => {
    applyStyles();
  }, [props.selected]);

  // Convert mode to name
  const name = props.mode.mode
    .replace("-", " ")
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  return (
    <button className={styles} onClick={() => props.toggleModes(props.mode)}>
      {name}
    </button>
  );
}

function CounterToggle(props) {
  const toggleModes = (mode) => {
    props.setCurrentMode(mode);
  };

  const buttons = props.modes.map((mode, i) => {
    return (
      <CounterButton
        selected={props.currentMode}
        key={i}
        toggleModes={toggleModes}
        mode={mode}
      />
    );
  });

  return <div className="flex justify-around">{buttons}</div>;
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
    <div className="flex items-center justify-center h-48 p-8 mb-4 border-b border-gray-600">
      <span className="text-6xl font-extrabold">
        {minutes}:{seconds}
      </span>
    </div>
  );
}

function Timer(props) {
  // -------- State --------
  
  // Remain time in minutes
  const [remainTime, setRemainTime] = useState(0);
  // Toggle between different Pomodoro modes.
  const [currentMode, setCurrentMode] = useState({});
  const [startCount, setStartCount] = useState(false);
  // Get selected task from store
  const selectedTask = useReactiveVar(selectedTaskVar);

  // -------- Component logic --------

  // Start or stop count
  const toggle = () => {
    setStartCount(!startCount);
  };

  const setModeValues = () => {
    for (let item of props.modes) {
      // Set default mode
      if (Object.keys(currentMode).length === 0 && item?.default) {
        setCurrentMode(item);
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
  const playAlarm = () => {};

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

  // -------- Style logic --------

  // -------- Component structure --------
  return (
    <div className="flex flex-col justify-center p-4 text-gray-300 rounded bg-zinc-900 w-96">
      <CounterToggle
        modes={props.modes}
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
      />
      <Counter time={remainTime} />
      <button
        onClick={toggle}
        className="p-2 text-xl bg-blue-600 rounded hover:bg-blue-800 hover:text-gray-300"
      >
        Start/Stop
      </button>
    </div>
  );
}

export default Timer;
