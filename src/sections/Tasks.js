import {
  useState,
  useEffect,
  useCallback,
  useRef,
  createContext,
  useContext,
} from "react";
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

// Delete not saved task from listOfTasks state
const TaskContext = createContext();

function TaskEditor({ task, setTask, handleEditTask }) {
  // Props
  const [currentTask, setCurrentTask] = useState({
    _id: "",
    title: "",
    completedPomodoros: 0,
    expectedPomodoros: 0,
    color: "#333",
    completed: false,
  });
  const [description, setDescription] = useState("");

  // If props.task is undefined, set to component state
  useEffect(() => {
    if (!task?.newTask) {
      const { description, ...newTask } = task;
      setCurrentTask(newTask);
      setDescription(description);
    }
  }, [task]);

  // Update editor state
  const handleOnChange = (e, key) => {
    let value =
      e.target?.type === "number" ? Number(e.target.value) : e.target.value;

    if (e.target?.type === "number" && value < 0) value = 0;

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

      {/* If user save, update parent state */}
      {/* If is a new task and user don't save. */}
      {/* Delete task from array */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => handleEditTask(undefined, task?.newTask)}
          className="px-2 py-1 text-white bg-red-600 rounded"
        >
          Cancel
        </button>
        <button
          onClick={() =>
            handleEditTask({ description, ...currentTask }, task?.newTask)
          }
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
  const [saveUpdates, setSaveUpdates] = useState(false);
  const [saveNewTask, setSaveNewTask] = useState(false);
  // Styles
  const [selectedStyle, setSelectedStyle] = useState("");
  const [taskCompletedStyles, setTaskCompletedStyles] = useState("");
  const [disabledCardStyles, setDisabledCardStyles] = useState("");
  const styles = `${currentTask.color} bg-blue-600 mb-4 p-2 w-96 last:mb-0`;
  // Context
  const { deleteLastItemFromTasks, moveCompletedTask } =
    useContext(TaskContext);

  // -------- Component logic --------

  // Set props.currentTask to state
  useEffect(() => {
    setTask({ ...currentTask });
  }, [currentTask]);

  // If props.newTask is provided update openEditor state
  useEffect(() => {
    if (newTask) {
      setOpenEditor(newTask);
    }
  }, [newTask]);

  // After openEditor state is updated, call setChildIsMounted
  // This help to set user scroll to bottom of component without errors
  useEffect(() => {
    const childIsMounted = () => {
      if (openEditor) {
        setChildIsMounted(true);
      }
    };
    childIsMounted();
  }, [openEditor, setChildIsMounted]);

  // If user click card, update selectedTask state
  const handleTaskClick = (e) => {
    setSelectedTask({
      id: currentTask?.id || currentTask?._id,
      addCompletedPomodoro: addCompletedPomodoro,
    });
  };

  // Add completed pomodoro to task after
  const addCompletedPomodoro = () => {
    // setCompletedPomodoros(completedPomodoros + 1);
  };

  // Toggle editor and manage updates made by user
  const handleEditTask = (lastUpdates, newTask) => {
    // Toggle task editor
    setAddedNewTask(false);
    setOpenEditor(false);

    // New Task
    if (newTask) {
      // If task title is empty or edit was cancelled
      if (lastUpdates?.title === "" || !lastUpdates) {
        deleteLastItemFromTasks();
        return;
      }

      setTask({ ...lastUpdates });
      setSaveNewTask(true);
      return;
    }

    // Edit

    // If task title is empty, don't save
    if (lastUpdates?.title === "" || !lastUpdates) {
      return;
    }

    setTask({ ...lastUpdates });
    setSaveUpdates(true);
  };

  // Save task's updates in db
  useEffect(() => {
    const saveUpdateInDb = async () => {
      if (saveUpdates && task._id) {
        const user = authService.getCurrentUser();
        const { _id, ...newTask } = task;
        await userService.updateUserTask(user.id, _id, newTask);

        setSaveUpdates(false);
      }
    };
    saveUpdateInDb();
  }, [task, saveUpdates, setSaveUpdates]);

  // Save new task in db
  useEffect(() => {
    const saveNewTaskInDb = async () => {
      if (saveNewTask) {
        const user = authService.getCurrentUser();
        const { openEditor, ...newTask } = task;
        await userService.createUserTask(user.id, newTask);
        setSaveNewTask(false);
      }
    };
    saveNewTaskInDb();
  }, [task, saveNewTask, setSaveNewTask]);

  // Move task to completed tab
  const handleCompletedTask = () => {
    // If task is completed apply this style
    if (taskCompletedStyles === "") {
      setTaskCompletedStyles("line-through");
    } else setTaskCompletedStyles("");

    // Toggle completed property and move task
    const newTask = { ...task, completed: !task.completed };
    setTask(newTask);
    setSaveUpdates(true);
    moveCompletedTask(newTask);
  };

  // -------- Styles logic --------

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

  // If selectedTask state is updated, apply selected style
  useEffect(() => {
    const applySelectedStyles = () => {
      if (selectedTask.id === currentTask._id) {
        setSelectedStyle("border-b-2 border-red-600");
      } else setSelectedStyle("border-b-2 border-gray-600");
    };
    applySelectedStyles();
  }, [selectedTask, currentTask]);

  // -------- Component structure --------

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
          onClick={() => setOpenEditor(true)}
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
  // States
  const [childIsMounted, setChildIsMounted] = useState(false);
  // Default styles
  let styles = `overflow-y-scroll mt-4`;
  const [showTasks, setShowTasks] = useState("hidden");
  // Get selected task from store
  const selectedTask = useReactiveVar(selectedTaskVar);
  // Get component container div
  const container = useRef();

  // -------- Component logic --------

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

  // -------- Style logic --------

  // If Tab is unselected, hide component
  useEffect(() => {
    const toggle = () => {
      if (id === selected) {
        setShowTasks("");
      } else setShowTasks("hidden");
    };
    toggle();
  }, [id, selected]);

  // -------- Component structure --------
  const cards = tasks.map((task, key) => {
    return (
      <TaskCard
        key={key}
        selectedTask={selectedTask}
        setSelectedTask={selectedTaskVar}
        currentTask={task}
        newTask={task?.newTask}
        setChildIsMounted={setChildIsMounted}
        setAddedNewTask={setAddedNewTask}
      />
    );
  });

  return (
    <div
      onClick={scrollToBottom}
      ref={container}
      className={`${styles} ${showTasks}`}
    >
      {cards}
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

  // -------- Component logic --------

  // Set props.tasks to state
  useEffect(() => {
    setListOfTasks(props.tasks);
  }, [props.tasks]);

  // Add new task to the list
  const handleAddNewTask = () => {
    if (addedNewTask) return;
    const [defaultTab, ...rest] = listOfTasks;

    setListOfTasks([
      { ...defaultTab, tasks: [...defaultTab.tasks, { newTask: true }] },
      ...rest,
    ]);
    // Set scroll to final position;
    setAddedNewTask(true);
  };

  // If new task is not saved, delete from pending tasks array
  const deleteLastItemFromTasks = () => {
    const newList = structuredClone(listOfTasks);
    newList[0].tasks = newList[0].tasks.slice(0, -1);
    setListOfTasks(newList);
  };

  // If task is completed move to completed tab
  const moveCompletedTask = (completedTask) => {
    // Add completed task to completed tab
    const newCompletedList = [...listOfTasks[1].tasks, completedTask];

    // Remove completed task from pending tab
    const newPendingList = [...listOfTasks[0].tasks].filter(
      (task, i) => task._id !== completedTask._id
    );

    // Save in state
    const newList = structuredClone(listOfTasks);
    newList[0].tasks = newPendingList;
    newList[1].tasks = newCompletedList;

    setListOfTasks(newList);
  };

  // -------- Styles logic --------

  // -------- Component structure --------
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
      <TaskContext.Provider
        value={{ deleteLastItemFromTasks, moveCompletedTask }}
      >
        {tasks}
      </TaskContext.Provider>
    </div>
  );
}

export default Tasks;
