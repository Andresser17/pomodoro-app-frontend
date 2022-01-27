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
    <div id={props.id} className={`${subTabStyles} ${show}`}>
      {props.items.map((item, i) => (
        <li key={i} className="mx-2">
          <span className="underline cursor-pointer">{item}</span>
        </li>
      ))}
    </div>
  );
}

function Tabs(props) {
  // States
  const [selected, setSelected] = useState("pendingTasks");
  let subTabs = [];

  const tabs = props.tabs.map((item, i) => {
    const tab = (
      <span className="block p-2 text-white bg-red-600 cursor-pointer">
        {item.tab}
      </span>
    );

    // Save SubTabs
    subTabs.push(
      <SubTabs id={item.id} selected={selected} items={item.subTabs} />
    );

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
    </div>
  );
}

function List() {

}

function Tasks() {
  const tabs = [
    {
      id: "pending-tasks",
      tab: "Pending Tasks",
      subTabs: ["Today", "Tomorrow"],
    },
    {
      id: "completed-tasks",
      tab: "Completed Tasks",
      subTabs: ["Today", "Tomorrow"],
    },
  ];
  return (
    <div>
      <Tabs tabs={tabs} />
      {/* <SubMenu items={["Today", "Tomorrow"]} /> */}
      {/* List of tasks */}
      <div>
        <ul>
          <li>task 1</li>
        </ul>
      </div>
    </div>
  );
}

export default Tasks;
