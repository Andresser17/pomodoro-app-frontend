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

  return (
    <button className={styles} onClick={() => props.toggleModes(props.mode)}>
      {props.mode.name}
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

function Timer({ settings }) {
  // -------- State --------

  const [modes, setModes] = useState([]); // Toggle between different Pomodoro modes.
  const [currentMode, setCurrentMode] = useState({});
  const [remainTime, setRemainTime] = useState(null); // Remain time in minutes
  const [startCount, setStartCount] = useState(false);
  const [toggleMode, setToggleMode] = useState(false);
  const currentInterval = useRef(0);
  // Get selected task from store
  const selectedTask = useReactiveVar(selectedTaskVar);

  // -------- Component logic --------

  // Set timer modes to state and default mode
  useEffect(() => {
    if (Object.keys(settings).length > 0) {
      // Set default mode
      setCurrentMode(settings.timerModes[0]);
      setModes([...settings.timerModes]);
    }
  }, [settings]);

  // Start or stop count
  const toggleCounter = () => {
    setStartCount(!startCount);
  };

  useEffect(() => {
    const setModeValues = () => {
      setRemainTime(currentMode.duration);
    };
    setModeValues();
  }, [currentMode]);

  // Play alarm
  const playAlarm = () => {};

  const countdown = () => {
    // If time is out
    if (remainTime === 0) {
      if (currentMode.name === "Pomodoro") {
        currentInterval.current = currentInterval.current + 1;
      }

      if (currentMode.name === "Long Break") {
        currentInterval.current = 0;
      }

      // Toggle timer mode
      setToggleMode((prev) => !prev);

      // Start / Stop timer
      toggleCounter();

      // Add completed pomodoro to selected task
      // if (currentMode.name === "Pomodoro") {
      //   console.log("hello")
      //   selectedTask?.addCompletedPomodoro();
      // }
      return;
    }

    setRemainTime(remainTime - 1);
  };

  // Toggle mode when pomodoro is completed
  useEffect(() => {
    const toggleModes = () => {
      if (toggleMode) {
        if (
          modes[2].interval === currentInterval.current &&
          currentMode._id !== modes[2]._id
        ) {
          setCurrentMode(modes[2]);
          setToggleMode((prev) => !prev);
          return;
        }
        if (currentMode._id !== modes[0]._id) {
          setCurrentMode(modes[0]);
        } else setCurrentMode(modes[1]);

        setToggleMode((prev) => !prev);
      }
    };
    toggleModes();
  }, [modes, toggleMode, currentMode._id]);

  // Run countdown
  useInterval(countdown, startCount ? 1000 : null);

  // -------- Style logic --------

  // -------- Component structure --------
  return (
    <div className="flex flex-col justify-center p-4 text-gray-300 rounded bg-zinc-900 w-96">
      <CounterToggle
        modes={modes}
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
      />
      <Counter time={remainTime} />
      <button
        onClick={toggleCounter}
        className="p-2 text-xl bg-blue-600 rounded hover:bg-blue-800 hover:text-gray-300"
      >
        Start/Stop
      </button>
    </div>
  );
}

export default Timer;
