import { useState, useEffect } from "react";
// Icons
import { ReactComponent as EditIcon } from "../icons/edit-icon.svg";

function TaskEditor(props) {
  return <div>Editor</div>;
}

function TaskCard(props) {
  // States
  const [selectedStyle, setSelectedStyle] = useState("");
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [completedStyle, setCompletedStyle] = useState("");
  const [openEditor, setOpenEditor] = useState(false);
  const styles = `${props.task.color} bg-blue-600 my-4 p-2 w-96 cursor-pointer`;

  const handleTaskClick = (e) => {
    props.setSelectedTask(props.task.id);
  };

  // If task is selected apply this style
  const applySelectedStyles = () => {
    if (props.selectedTask === props.task.id) {
      setSelectedStyle("border-b-2 border-red-600");
    } else setSelectedStyle("border-b-2 border-gray-600");
  };

  useEffect(() => {
    applySelectedStyles();
  }, [props.selectedTask]);

  const handleCompletedTask = () => {
    setTaskCompleted(!taskCompleted);
  };

  // If task is completed apply this style
  const applyCompletedStyles = () => {
    if (taskCompleted) {
      setCompletedStyle("line-through");
    } else setCompletedStyle("");
  };

  useEffect(() => {
    applyCompletedStyles();
  }, [taskCompleted]);

  const handleEditTask = () => {
    // Open task editor
    setOpenEditor(!openEditor);
  };

  const task = (
    <div className={`${styles} ${selectedStyle}`}>
      <div
        onClick={handleTaskClick}
        className="flex justify-between border-b-2 border-white"
      >
        <h3 className={`text-lg font-bold text-white ${completedStyle}`}>
          {props.task.title}
        </h3>
        <span className="text-lg font-bold text-white">
          0/{props.task.pomodoros}
        </span>
      </div>
      <div onClick={handleTaskClick} className="shadow-inner">
        <p className="my-4">{props.task.description}</p>
      </div>
      <div className="flex justify-end">
        <button onClick={handleEditTask} className="w-6 mr-4 text-white">
          <EditIcon />
        </button>
        <button
          onClick={handleCompletedTask}
          className="px-4 py-2 bg-green-600 rounded"
        >
          Done
        </button>
      </div>
    </div>
  );

  return openEditor ? <TaskEditor /> : task;
}

function TaskCards(props) {
  // Default styles
  let styles = `bg-yellow-300 even:bg-blue-400`;
  const [show, setShow] = useState("hidden");
  const [selectedTask, setSelectedTask] = useState("");

  const cards = props.tasks.map((task, key) => (
    <TaskCard
      selectedTask={selectedTask}
      setSelectedTask={setSelectedTask}
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
      <TaskCards id={item.id} selected={selectedTab} tasks={item.tasks} />
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

  return (
    <div className="">
      <ul className="flex">{tabs}</ul>
      {/* List of tasks */}
      {tasks}
    </div>
  );
}

function Tasks(props) {
  return (
    <div className="p-4 mt-4 bg-zinc-900">
      <Tabs selectedByDefault="pending-tasks" tabs={props.tasks} />
    </div>
  );
}

export default Tasks;
