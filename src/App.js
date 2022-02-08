import { useState, useEffect } from "react";
// Sections
import Tasks from "./sections/Tasks";
import Timer from "./sections/Timer";
import TopPanel from "./sections/TopPanel";
// Components
import SiteLogo from "./components/SiteLogo";
import UserOptions from "./components/UserOptions";
// Modals
import ModalContainer from "./modals/ModalContainer";
import UserAuth from "./modals/UserAuth";
import UserSettings from "./modals/UserSettings";
// Icons
import { ReactComponent as SettingsIcon } from "./icons/settings-icon.svg";
import { ReactComponent as LogoutIcon } from "./icons/logout-icon.svg";

function App() {
  // States
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  // Set the modal component
  const [modalToOpen, setModalToOpen] = useState(undefined);
  const [userIsLogged, setUserIsLogged] = useState(false);

  // Open a new modal
  const handleOpenModal = (modal) => {
    setModalToOpen(
      <ModalContainer handleCloseModal={handleCloseModal}>
        {modal}
      </ModalContainer>
    );
  };

  // Close open modal
  const handleCloseModal = () => {
    setModalToOpen(undefined);
  };

  const logoutUser = () => {};

  const parseTasks = () => {
    const pending = {
      id: "pen-",
      title: "Pending - Start development of pomodoro app",
      description:
        "Amet vero consequatur maiores ab assumenda Quas obcaecati voluptatem amet mollitia sed Maxime consequuntur at sequi a minima facilis.",
      expectedPomodoros: 3,
      completedPomodoros: 0,
      color: "#333",
      completed: false,
    };

    let newPendingTasks = [];
    for (let i = 0; i < 5; i++) {
      let newId = `${pending.id}${String(i)}`;
      newPendingTasks.push({ ...pending, id: newId });
    }
    setPendingTasks(newPendingTasks);

    const completed = {
      id: "com-",
      title: "Completed - Start development of pomodoro app",
      description:
        "Amet vero consequatur maiores ab assumenda Quas obcaecati voluptatem amet mollitia sed Maxime consequuntur at sequi a minima facilis.",
      expectedPomodoros: 3,
      completedPomodoros: 3,
      color: "#333",
      completed: true,
    };

    let newCompletedTasks = [];
    for (let i = 0; i < 5; i++) {
      let newId = `${completed.id}${String(i)}`;
      newCompletedTasks.push({ ...completed, id: newId });
    }
    setCompletedTasks(newCompletedTasks);
  };

  useEffect(() => {
    parseTasks(); 
  }, [])

  const userOptions = (
    <UserOptions
      buttons={[
        {
          icon: <SettingsIcon />,
          text: "Settings",
          handleClick: () => handleOpenModal(<UserSettings />),
        },
        {
          icon: <LogoutIcon />,
          text: "Logout",
          handleClick: () => console.log("logout"),
        },
      ]}
    />
  );

  // Sign In and Sign Up buttons
  const userAuth = (
    <div>
      <button
        className="mr-4 hover:text-gray-300"
        onClick={() => handleOpenModal(<UserAuth />)}
      >
        Sign In
      </button>
      <button
        className="px-4 py-1 bg-blue-600 rounded hover:bg-blue-800 hover:text-gray-300"
        onClick={() => handleOpenModal(<UserAuth signUp={true} />)}
      >
        Sign Up
      </button>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-400">
      {/* User selected modal */}
      {modalToOpen}
      <TopPanel>
        <SiteLogo />
        {/* If user is logged show UserOptions */}
        {userIsLogged ? userOptions : userAuth}
      </TopPanel>
      <div className="flex flex-col items-center py-4">
        <Timer
          modes={[
            { mode: "work", remainTime: 3, default: true },
            { mode: "short-break", remainTime: 5 },
            { mode: "long-break", remainTime: 7 },
          ]}
        />
        <Tasks
          tasks={[
            {
              id: "pending-tasks",
              tab: "Pending Tasks",
              subTabs: ["Today", "Tomorrow"],
              tasks: [...pendingTasks],
              default: true,
            },
            {
              id: "completed-tasks",
              tab: "Completed Tasks",
              subTabs: ["Today", "Tomorrow"],
              tasks: [...completedTasks],
            },
          ]}
        />
      </div>
    </main>
  );
}

export default App;
