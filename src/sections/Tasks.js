import { useState, useEffect } from "react";
import { useReactiveVar } from "@apollo/client";
// React-quill
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// Icons
import { ReactComponent as EditIcon } from "../icons/edit-icon.svg";
// Store
import { selectedTaskVar } from "../cache";

function TaskEditor(props) {
  const [value, setValue] = useState("");

  const handleOnChange = (val) => {
    setValue(val);
  };

  return (
    <div>
      {/* Title input */}
      <input className="w-full p-2" />

      <ReactQuill
        className="w-full mt-4"
        theme="snow"
        value={value}
        onChange={handleOnChange}
      />

      {/* Add or substract pomodoros */}
      <div className="flex items-center mt-4">
        <input type="number" className="p-2 w-14" />
        <span className="mx-2">/</span>
        <input type="number" className="p-2 w-14" />
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={() => props.handleEditTask(false)}
          className="px-2 py-1 text-white bg-red-600 rounded"
        >
          Cancel
        </button>
        <button
          onClick={() => props.handleEditTask(true)}
          className="px-4 py-2 bg-green-600 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}

function TaskCard(props) {
  // States
  const [completedPomodoros, setCompletedPomodoros] = useState(
    props.task.completedPomodoros
  );
  const [disabledCard, setDisabledCard] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);
  // Styles
  const [selectedStyle, setSelectedStyle] = useState("");
  const [taskCompleted, setTaskCompleted] = useState("");
  const [disabledCardStyles, setDisabledCardStyles] = useState("");
  const styles = `${props.task.color} bg-blue-600 my-4 p-2 w-96`;

  // If user click card, call this
  const handleTaskClick = (e) => {
    props.setSelectedTask({
      id: props.task.id,
      addCompletedPomodoro: addCompletedPomodoro,
    });
  };

  // If task is selected apply this style
  const applySelectedStyles = () => {
    if (props.selectedTask.id === props.task.id) {
      setSelectedStyle("border-b-2 border-red-600");
    } else setSelectedStyle("border-b-2 border-gray-600");
  };

  useEffect(() => {
    applySelectedStyles();
  }, [props.selectedTask]);

  const handleCompletedTask = () => {
    if (taskCompleted === "") {
      setTaskCompleted("line-through");
    } else setTaskCompleted("");
  };

  // If task is completed apply this style
  // const applyCompletedStyles = () => {
  //   if (taskCompleted) {
  //     setCompletedStyle("line-through");
  //   } else setCompletedStyle("");
  // };

  // useEffect(() => {
  //   applyCompletedStyles();
  // }, [taskCompleted]);

  // Add completed pomodoro to task
  const addCompletedPomodoro = () => {
    setCompletedPomodoros(completedPomodoros + 1);
  };

  const handleEditTask = (save) => {
    // Save or discard changes
    if (save) {
      console.log(save);
    }

    // Toggle task editor
    setOpenEditor(!openEditor);
  };

  // If timer is started disable
  // the possibility of change selected task
  const toggleDisabledCard = () => {
    if (disabledCardStyles === "cursor-pointer") {
      setDisabledCardStyles("");
    } else setDisabledCardStyles("cursor-pointer");
  };

  useEffect(() => {
    toggleDisabledCard();
  }, [disabledCard]);

  const task = (
    <div className={`${disabledCardStyles}`}>
      <div
        onClick={handleTaskClick}
        className="flex justify-between border-b-2 border-white"
      >
        <h3 className={`text-lg font-bold text-white ${taskCompleted}`}>
          {props.task.title}
        </h3>
        <span className="text-lg font-bold text-white">
          {completedPomodoros}/{props.task.expectedPomodoros}
        </span>
      </div>
      <div onClick={handleTaskClick} className="shadow-inner">
        <p className="my-4">{props.task.description}</p>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={() => handleEditTask(false)}
          className="w-6 mr-4 text-white"
          disabled={disabledCard}
        >
          <EditIcon />
        </button>
        <button
          onClick={handleCompletedTask}
          className="px-4 py-2 bg-green-600 rounded"
          disabled={disabledCard}
        >
          Done
        </button>
      </div>
    </div>
  );

  return (
    <div className={`${styles} ${selectedStyle}`}>
      {openEditor ? <TaskEditor handleEditTask={handleEditTask} /> : task}
    </div>
  );
}

function TaskCards(props) {
  // Default styles
  let styles = ``;
  const [show, setShow] = useState("hidden");
  // const [selectedTask, setSelectedTask] = useState("");
  // Get selected task from store
  const selectedTask = useReactiveVar(selectedTaskVar);

  const cards = props.tasks.map((task, key) => (
    <TaskCard
      selectedTask={selectedTask}
      setSelectedTask={selectedTaskVar}
      key={key}
      task={task}
    />
  ));

  const toggle = () => {
    if (props.id === props.selected) {
      setShow("");
    } else setShow("hidden");
  };

  useEffect(() => {
    toggle();
  }, [props]);

  return <div className={`${styles} ${show}`}>{cards}</div>;
}

function SubTabs(props) {
  // Default styles for subTab
  let styles = "flex w-full bg-green-600 even:bg-yellow-600";
  const [show, setShow] = useState("hidden");

  const toggle = () => {
    if (props.id === props.selected) {
      setShow("");
    } else setShow("hidden");
  };

  useEffect(() => {
    toggle();
  }, [props]);

  return (
    <div className={`${styles} ${show}`}>
      {props.items.map((item, i) => (
        <li key={i} className="mx-2">
          <span className="underline cursor-pointer">{item}</span>
        </li>
      ))}
    </div>
  );
}

function Tab(props) {
  // Default styles
  let styles = `block p-2 text-white bg-blue-600 cursor-pointer`;
  const [current, setCurrent] = useState("");

  const toggle = () => {
    if (props.id === props.selected) {
      setCurrent("border-b-2 border-white");
    } else setCurrent("");
  };

  useEffect(() => {
    toggle();
  }, [props]);

  return (
    <li
      className={`${styles} ${current}`}
      onClick={() => props.setSelected(props.id)}
    >
      {props.title}
    </li>
  );
}

function Tabs(props) {
  // States
  const [selectedTab, setSelectedTab] = useState(props.selectedByDefault);
  let tasks = [];

  const tabs = props.tabs.map((item, i) => {
    // Save Tasks
    const task = (
      <TaskCards
        key={item.tab}
        id={item.id}
        selected={selectedTab}
        tasks={item.tasks}
      />
    );
    tasks.push(task);

    return (
      <Tab
        title={item.tab}
        key={item.tab}
        id={item.id}
        selected={selectedTab}
        setSelected={setSelectedTab}
      />
    );
  });

  const handleAddTask = () => {
  }

  return (
    <div className="p-4 mt-4 overflow-auto min-h-48 max-h-[27rem] bg-zinc-900">
      <div className="flex items-center justify-between">
        <ul className="flex">{tabs}</ul>
        {/* Add a new task */}
        <button onClick={handleAddTask} className="px-4 py-2 bg-red-600">+ New Task</button>
      </div>
      {/* List of tasks */}
      {tasks}
    </div>
  );
}

function Tasks(props) {
  return (
    <div>
      <Tabs selectedByDefault="pending-tasks" tabs={props.tasks} />
      <div className="p-4 mt-4 text-white bg-zinc-900">
        <span>Hello World</span>
      </div>
    </div>
  );
}

export default Tasks;
