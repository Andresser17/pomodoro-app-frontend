import { useState, useEffect, useCallback, useRef } from "react";
import { useReactiveVar } from "@apollo/client";
// React-quill
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// Icons
import { ReactComponent as EditIcon } from "icons/edit-icon.svg";
// Store
import { selectedTaskVar } from "cache";
// Services
import authService from "services/auth.service";
import userService from "services/user.service";

function TaskEditor({ task, setTask, handleEditTask }) {
  const [currentTask, setCurrentTask] = useState({
    _id: "",
    title: "",
    completedPomodoros: 0,
    expectedPomodoros: 0,
    color: "#333",
    completed: false,
  });
  const [description, setDescription] = useState("");

  // Set props.task to component state
  useEffect(() => {
    if (!task?.openEditor) {
      const { description, ...newTask } = task;
      setCurrentTask(newTask);
      setDescription(description);
    }
  }, [task]);

  // Update editor state
  const handleOnChange = (e, key) => {
    const value =
      e.target?.type === "number" ? Number(e.target.value) : e.target.value;

    setCurrentTask({
      ...currentTask,
      [key]: value,
    });
  };

  return (
    <div>
      {/* Title input */}
      <input
        value={currentTask.title}
        onChange={(e) => handleOnChange(e, "title")}
        className="w-full p-2 bg-zinc-900"
      />

      <ReactQuill
        className="w-full mt-4"
        theme="snow"
        value={description}
        onChange={setDescription}
      />

      {/* Add or substract pomodoros */}
      <div className="flex items-center mt-4">
        <input
          type="number"
          value={currentTask?.completedPomodoros}
          onChange={(e) => handleOnChange(e, "completedPomodoros")}
          className="p-2 w-14 bg-zinc-900"
        />
        <span className="mx-2">/</span>
        <input
          type="number"
          value={currentTask?.expectedPomodoros}
          onChange={(e) => handleOnChange(e, "expectedPomodoros")}
          className="p-2 w-14 bg-zinc-900"
        />
      </div>

      {/* If user save changes update parent state */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => handleEditTask()}
          className="px-2 py-1 text-white bg-red-600 rounded"
        >
          Cancel
        </button>
        <button
          onClick={() => handleEditTask({ description, ...currentTask })}
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
  const [task, setTask] = useState({});
  const [disabledCard] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);
  const [saveChanges, setSaveChanges] = useState(false);
  const [createdNewTask, setCreatedNewTask] = useState(false);
  // Styles
  const [selectedStyle, setSelectedStyle] = useState("");
  const [taskCompletedStyles, setTaskCompletedStyles] = useState("");
  const [disabledCardStyles, setDisabledCardStyles] = useState("");
  const styles = `${currentTask.color} bg-blue-600 mb-4 p-2 w-96 last:mb-0`;

  // Set props.currentTask to state
  useEffect(() => {
    setTask({ ...currentTask });
  }, [currentTask]);

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
    // setCompletedPomodoros(completedPomodoros + 1);
  };

  // Toggle editor and manage updates made by user
  const handleEditTask = (lastUpdates) => {
    // Save or discard changes
    if (lastUpdates) {
      setTask({ ...lastUpdates });
      setSaveChanges(true);
    }

    // Toggle task editor
    setAddedNewTask(false);
    setOpenEditor(!openEditor);
  };

  // Save changes to task in db
  useEffect(() => {
    const saveUpdateToDb = async () => {
      if (saveChanges && task._id) {
        const user = authService.getCurrentUser();
        const { _id, ...newTask } = task;
        await userService.updateUserTask(user.id, _id, newTask);

        setSaveChanges(false);
      }
    };
    saveUpdateToDb();

    // const saveNewTaskToDb = async () => {
    //   if () {
    //     const user = authService.getCurrentUser();
    //     const {_id, ...newTask} = task;
    //     await userService.createUserTask(user.id, newTask);

    //     setSaveChanges(false);
    //   }

    // }
    // saveNewTaskToDb();
  }, [task, saveChanges, setSaveChanges]);

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

  const taskComp = (
    <div className={`${disabledCardStyles}`}>
      <div
        onClick={handleTaskClick}
        className="flex justify-between border-b-2 border-white"
      >
        <h3 className={`text-lg font-bold text-white ${taskCompletedStyles}`}>
          {task.title}
        </h3>
        <span className="text-lg font-bold text-white">
          {task.completedPomodoros}/{task.expectedPomodoros}
        </span>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: task.description }}
        onClick={handleTaskClick}
        className="py-4 shadow-inner"
      />
      <div className="flex justify-end mt-4">
        <button
          onClick={() => handleEditTask()}
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
        <TaskEditor
          task={task}
          setTask={setTask}
          handleEditTask={handleEditTask}
        />
      ) : (
        taskComp
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
  const [listOfTasks, setListOfTasks] = useState([]);
  const [selectedTab, setSelectedTab] = useState("");
  const [addedNewTask, setAddedNewTask] = useState(false);
  // Components to render
  let tasks = [];
  let tabs = listOfTasks.map((item, i) => {
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

    // Set first tab like default
    if (selectedTab.length === 0 && i === 0) {
      setSelectedTab(item.id);
    }

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

  // Set props.tasks to state
  useEffect(() => {
    setListOfTasks(props.tasks);
  }, [props.tasks]);

  // Add new task to the list
  const handleAddNewTask = () => {
    if (addedNewTask) return;

    // const newTask = {
    //   id: "pen-898",
    //   title: "New Task 898 - Start development of pomodoro app",
    //   description:
    //     "Amet vero consequatur maiores ab assumenda Quas obcaecati voluptatem amet mollitia sed Maxime consequuntur at sequi a minima facilis.",
    //   expectedPomodoros: 3,
    //   completedPomodoros: 3,
    //   color: "#333",
    //   completed: true,
    //   // Open editor by default
    //   openEditor: true,
    // };

    const [defaultTab, ...rest] = listOfTasks;

    setListOfTasks([
      { ...defaultTab, tasks: [...defaultTab.tasks, { openEditor: true }] },
      ...rest,
    ]);
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
          onClick={handleAddNewTask}
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
