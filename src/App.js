import { useState } from "react";
// Sections
import Tasks from "./sections/Tasks";
import Timer from "./sections/Timer";
import TopPanel from "./sections/TopPanel";
// Components
import SiteLogo from "./components/SiteLogo";
import UserOptions from "./components/UserOptions";
// User modals
import UserAuth from "./components/UserAuth";
import UserSettings from "./components/UserSettings";

function App() {
  // Set the modal id
  const [modalToOpen, setModalToOpen] = useState(undefined);
  const [userIsLogged, setUserIsLogged] = useState(true);

  // Close open modal
  const handleCloseModal = () => {
    setModalToOpen(undefined);
  };

  const logoutUser = () => {};

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

  const pendingTasks = [];
  for (let i = 0; i < 5; i++) {
    let newId = `${pending.id}${String(i)}`;
    pendingTasks.push({ ...pending, id: newId });
  }

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

  const completedTasks = [];
  for (let i = 0; i < 5; i++) {
    let newId = `${completed.id}${String(i)}`;
    completedTasks.push({ ...completed, id: newId });
  }

  const userOptions = (
    <UserOptions
      buttons={[
        {
          text: "Settings",
          handleClick: () => setModalToOpen(<UserSettings />),
        },
        { text: "Logout", handleClick: () => console.log("logout") },
      ]}
    />
  );

  // Sign In and Sign Up buttons
  const userAuth = (
    <div>
      <button
        className="px-4 py-1 mr-4 bg-green-600 rounded"
        onClick={() =>
          setModalToOpen(<UserAuth handleCloseModal={handleCloseModal} />)
        }
      >
        Sign In
      </button>
      <button
        className="px-4 py-1 bg-blue-600 rounded"
        onClick={() =>
          setModalToOpen(<UserAuth signUp={true} handleCloseModal={handleCloseModal} />)
        }
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
