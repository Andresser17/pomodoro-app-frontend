import { useState, useEffect } from "react";
// Icons
import { ReactComponent as EditIcon } from "../icons/edit-icon.svg";

function TaskCards(props) {
  const items = props.items;

  // Default styles
  let styles = `bg-yellow-300 even:bg-blue-400`;
  const [show, setShow] = useState("hidden");

  const cards = items.map((item, i) => (
    <div className={`${item.color} bg-blue-600 my-4 p-2 w-96 cursor-pointer`}>
      <div className="flex justify-between border-b-2 border-white">
        <h3 className="text-lg font-bold text-white">{item.title}</h3>
        <span className="text-lg font-bold text-white">0/{item.pomodoros}</span>
      </div>
      <div className="shadow-inner">
        <p className="my-4">{item.description}</p>
      </div>
      <div className="flex justify-end">
        <button onClick="" className="w-6 mr-4 text-white">
          <EditIcon />
        </button>
        <button className="px-4 py-2 bg-green-600 rounded">Done</button>
      </div>
    </div>
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
  const [selected, setSelected] = useState(props.selectedByDefault);
  let subTabs = [];
  let tasks = [];

  const tabs = props.tabs.map((item, i) => {
    // Save SubTabs
    // subTabs.push(
    //   <SubTabs
    //     key={item.id}
    //     id={item.id}
    //     selected={selected}
    //     items={item.subTabs}
    //   />
    // );

    // Save Tasks
    tasks.push(
      <TaskCards id={item.id} selected={selected} items={item.tasks} />
    );

    return (
      <Tab
        title={item.tab}
        key={item.tab}
        id={item.id}
        selected={selected}
        setSelected={setSelected}
      />
    );
  });

  return (
    <div className="">
      <ul className="flex">{tabs}</ul>
      {/* Tab content */}
      {subTabs}
      {/* List of tasks */}
      {tasks}
    </div>
  );
}

function Tasks() {
  const taskSample = {
    selected: false,
    title: "Start development of pomodoro app",
    description:
      "Amet vero consequatur maiores ab assumenda Quas obcaecati voluptatem amet mollitia sed Maxime consequuntur at sequi a minima facilis.",
    pomodoros: 3,
    color: "#333",
    completed: false,
  };
  const tabs = [
    {
      id: "pending-tasks",
      tab: "Pending Tasks",
      subTabs: ["Today", "Tomorrow"],
      tasks: [taskSample, taskSample],
    },
    {
      id: "completed-tasks",
      tab: "Completed Tasks",
      subTabs: ["Today", "Tomorrow"],
      tasks: [taskSample, taskSample],
    },
  ];

  return (
    <div className="p-4 mt-4 bg-zinc-900">
      <Tabs selectedByDefault="pending-tasks" tabs={tabs} />
    </div>
  );
}

export default Tasks;
