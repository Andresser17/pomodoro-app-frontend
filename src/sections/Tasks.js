import { useState, useEffect, useCallback, useRef } from "react";
import { useReactiveVar } from "@apollo/client";
// React-quill
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// Icons
import { ReactComponent as EditIcon } from "../icons/edit-icon.svg";
// Store
import { selectedTaskVar } from "../cache";

function TaskEditor(props) {
  const [title, setTitle] = useState("");
  const [descrip, setDescrip] = useState("");
  const [completedPomodoros, setCompletedPomodoros] = useState("");
  const [expectedPomodoros, setExpectedPomodoros] = useState("");

  const handleOnChange = (e, cb) => {
    cb(e.target.value);
  };

  // Set props.currentTask to state
  useEffect(() => {
    const setTask = () => {
      setTitle(props.currentTask.title);
      setDescrip(props.currentTask.description);
      setCompletedPomodoros(props.currentTask.completedPomodoros);
      setExpectedPomodoros(props.currentTask.expectedPomodoros);
    };
    setTask();
  }, []);

  return (
    <div>
      {/* Title input */}
      <input
        value={title}
        onChange={(e) => handleOnChange(e, setTitle)}
        className="w-full p-2 bg-zinc-900"
      />

      <ReactQuill
        className="w-full mt-4"
        theme="snow"
        value={descrip}
        onChange={setDescrip}
      />

      {/* Add or substract pomodoros */}
      <div className="flex items-center mt-4">
        <input
          type="number"
          value={completedPomodoros}
          onChange={(e) => handleOnChange(e, setCompletedPomodoros)}
          className="p-2 w-14 bg-zinc-900"
        />
        <span className="mx-2">/</span>
        <input
          type="number"
          value={expectedPomodoros}
          onChange={(e) => handleOnChange(e, setExpectedPomodoros)}
          className="p-2 w-14 bg-zinc-900"
        />
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

function TaskCard({
  newTask,
  currentTask,
  setChildIsMounted,
  selectedTask,
  setSelectedTask,
  setAddedNewTask,
}) {
  // States
  const [completedPomodoros, setCompletedPomodoros] = useState(
    currentTask.completedPomodoros
  );
  const [disabledCard] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);
  const [saveChanges, setSaveChanges] = useState(false);
  // Styles
  const [selectedStyle, setSelectedStyle] = useState("");
  const [taskCompletedStyles, setTaskCompletedStyles] = useState("");
  const [disabledCardStyles, setDisabledCardStyles] = useState("");
  const styles = `${currentTask.color} bg-blue-600 mb-4 p-2 w-96 last:mb-0`;

  // If props.newTask is provided update openEditor state
  useEffect(() => {
    if (newTask !== undefined) {
      setOpenEditor(newTask);
    }
  }, [newTask]);

  // After openEditor state is updated, call setChildIsMounted
  useEffect(() => {
    const childIsMounted = () => {
      if (openEditor) {
        setChildIsMounted(true);
      }
    };
    childIsMounted();
  }, [openEditor, setChildIsMounted]);

  // If user click card, call this
  const handleTaskClick = (e) => {
    setSelectedTask({
      id: currentTask?.id || currentTask?._id,
      addCompletedPomodoro: addCompletedPomodoro,
    });
  };

  // If task is selected apply this style
  useEffect(() => {
    const applySelectedStyles = () => {
      if (selectedTask.id === currentTask._id) {
        setSelectedStyle("border-b-2 border-red-600");
      } else setSelectedStyle("border-b-2 border-gray-600");
    };
    applySelectedStyles();
  }, [selectedTask, currentTask]);

  // If task is completed apply this style
  const handleCompletedTask = () => {
    if (taskCompletedStyles === "") {
      setTaskCompletedStyles("line-through");
    } else setTaskCompletedStyles("");
  };

  // Add completed pomodoro to task
  const addCompletedPomodoro = () => {
    setCompletedPomodoros(completedPomodoros + 1);
  };

  const handleEditTask = (save) => {
    // Save or discard changes
    if (save) {
    }

    // Toggle task editor
    setAddedNewTask(false);
    setOpenEditor(!openEditor);
  };

  // Save change to db
  useEffect(() => {
    const saveToDb = async () => {};
    saveToDb();
  }, [saveChanges]);

  // If timer is started disable
  // the possibility of change selected task
  useEffect(() => {
    const toggleDisabledCard = () => {
      if (!disabledCard) {
        setDisabledCardStyles("");
      } else setDisabledCardStyles("cursor-pointer");
    };
    toggleDisabledCard();
  }, [disabledCard]);

  const task = (
    <div className={`${disabledCardStyles}`}>
      <div
        onClick={handleTaskClick}
        className="flex justify-between border-b-2 border-white"
      >
        <h3 className={`text-lg font-bold text-white ${taskCompletedStyles}`}>
          {currentTask.title}
        </h3>
        <span className="text-lg font-bold text-white">
          {completedPomodoros}/{currentTask.expectedPomodoros}
        </span>
      </div>
      <div onClick={handleTaskClick} className="shadow-inner">
        <p className="my-4">{currentTask.description}</p>
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
      {openEditor ? (
        <TaskEditor currentTask={currentTask} handleEditTask={handleEditTask} />
      ) : (
        task
      )}
    </div>
  );
}

function TaskCards({ addedNewTask, setAddedNewTask, tasks, id, selected }) {
  const [childIsMounted, setChildIsMounted] = useState(false);
  // Default styles
  let styles = `overflow-y-scroll mt-4`;
  const [show, setShow] = useState("hidden");
  // Get selected task from store
  const selectedTask = useReactiveVar(selectedTaskVar);
  // Get component container div
  const container = useRef();
  const cards = tasks.map((task, key) => {
    return (
      <TaskCard
        selectedTask={selectedTask}
        setSelectedTask={selectedTaskVar}
        key={key}
        currentTask={task}
        newTask={task?.openEditor}
        setChildIsMounted={setChildIsMounted}
        setAddedNewTask={setAddedNewTask}
      />
    );
  });

  // Manage component scroll position
  const scrollToBottom = useCallback(() => {
    // If a new task was added
    if (addedNewTask && childIsMounted) {
      const scrollHeight = container.current.scrollHeight;
      const clientHeight = container.current.clientHeight;
      // Set scroll position to bottom
      container.current.scrollTop = scrollHeight - clientHeight;
      setChildIsMounted(false);
    }
  }, [addedNewTask, childIsMounted]);

  useEffect(() => {
    scrollToBottom();
  });

  // Change selected tasks view
  useEffect(() => {
    const toggle = () => {
      if (id === selected) {
        setShow("");
      } else setShow("hidden");
    };
    toggle();
  }, [id, selected]);

  return (
    <div
      onClick={scrollToBottom}
      ref={container}
      className={`${styles} ${show}`}
    >
      {cards}
    </div>
  );
}

function SubTabs(props) {
  // Default styles for subTab
  let styles = "flex w-full bg-green-600 even:bg-yellow-600";
  const [show, setShow] = useState("hidden");

  // Change selected subtab
  useEffect(() => {
    const toggle = () => {
      if (props.id === props.selected) {
        setShow("");
      } else setShow("hidden");
    };
    toggle();
  }, [props.id, props.selected]);

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

  // Change selected tab
  useEffect(() => {
    const toggle = () => {
      if (props.id === props.selected) {
        setCurrent("border-b-2 border-white");
      } else setCurrent("");
    };
    toggle();
  }, [props.id, props.selected]);

  return (
    <li
      className={`${styles} ${current}`}
      onClick={() => props.setSelected(props.id)}
    >
      {props.title}
    </li>
  );
}

function Tasks(props) {
  // States
  const [selectedTab, setSelectedTab] = useState("pending-tasks");
  const [addedNewTask, setAddedNewTask] = useState(false);
  let tasks = [];
  let tabs = props.tasks.map((item, i) => {
    const cards = (
      <TaskCards
        key={item.tab}
        id={item.id}
        selected={selectedTab}
        tasks={item.tasks}
        addedNewTask={addedNewTask}
        setAddedNewTask={setAddedNewTask}
      />
    );
    tasks.push(cards);

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

  // Add new task to the list
  const handleAddTask = () => {
    if (addedNewTask) return;

    const newTask = {
      id: "pen-898",
      title: "New Task 898 - Start development of pomodoro app",
      description:
        "Amet vero consequatur maiores ab assumenda Quas obcaecati voluptatem amet mollitia sed Maxime consequuntur at sequi a minima facilis.",
      expectedPomodoros: 3,
      completedPomodoros: 3,
      color: "#333",
      completed: true,
      // Open editor by default
      openEditor: true,
    };

    props.setPendingTasks([...props.pendingTasks, newTask]);
    // Set scroll to final position;
    setAddedNewTask(true);
  };

  return (
    <div className="flex flex-col grow-1 p-4 mt-4 h-[27rem] text-white bg-zinc-900">
      <div className="flex items-center justify-between">
        {/* List of tabs */}
        <ul className="flex">{tabs}</ul>
        {/* Add a new task */}
        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 hover:text-gray-300"
        >
          + New Task
        </button>
      </div>
      {/* List of tasks */}
      {tasks}
    </div>
  );
}

export default Tasks;
