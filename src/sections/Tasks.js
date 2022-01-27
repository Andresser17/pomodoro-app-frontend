import { useState, useEffect } from "react";

function SubTabs(props) {
  // Default styles for subTab
  let subTabStyles = "flex w-full bg-green-600 even:bg-yellow-600";
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
    <div className={`${subTabStyles} ${show}`}>
      {props.items.map((item, i) => (
        <li key={i} className="mx-2">
          <span className="underline cursor-pointer">{item}</span>
        </li>
      ))}
    </div>
  );
}

function TaskCard(props) {
  const item = props.item;
  return (
    <div className={`${item.color} bg-red-600 p-4 my-4 w-96`}>
      <div className="flex justify-between">
        <h3 className="">{item.title}</h3>
        <span className="">0/{item.pomodoros}</span>
      </div>
      <p>{item.description}</p>
      <button>Change</button>
    </div>
  );
}

function Tabs(props) {
  // States
  const [selected, setSelected] = useState(props.selectedByDefault);
  let subTabs = [];
  let tasks = [];

  const tabs = props.tabs.map((item, i) => {
    const tab = (
      <span className="block p-2 text-white bg-red-600 cursor-pointer">
        {item.tab}
      </span>
    );

    // Save SubTabs
    subTabs.push(
      <SubTabs
        key={item.id}
        id={item.id}
        selected={selected}
        items={item.subTabs}
      />
    );

    // Save Tasks
    tasks.push(item.tasks.map((obj, j) => <TaskCard key={j} item={obj} />));

    return (
      <li key={item.tab} onClick={() => setSelected(item.id)}>
        {tab}
      </li>
    );
  });

  return (
    <div className="">
      <ul className="flex">{tabs}</ul>
      {/* Tab content */}
      {subTabs}
      {/* List of tasks */}
      <div className="bg-yellow-300">{tasks}</div>
    </div>
  );
}

function Tasks() {
  const taskSample = {
    selected: false,
    title: "Hello World",
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
    <div>
      <Tabs selectedByDefault="pending-tasks" tabs={tabs} />
    </div>
  );
}

export default Tasks;
