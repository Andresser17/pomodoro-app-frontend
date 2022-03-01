import { useState, useEffect, useCallback } from "react";
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
import UserProfile from "./modals/UserProfile";
// Icons
import { ReactComponent as SettingsIcon } from "./icons/settings-icon.svg";
import { ReactComponent as LogoutIcon } from "./icons/logout-icon.svg";
// Services
import authService from "./services/auth.service";
import userService from "./services/user.service";
// Common
import eventBus from "./common/eventBus";

function App() {
  // States
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [userSettings, setUserSettings] = useState({});
  // Set modal component to open
  const [openModal, setOpenModal] = useState(false);
  const [modalToOpen, setModalToOpen] = useState(null);
  const [userIsLogged, setUserIsLogged] = useState(null);

  // If a user is logged, get info
  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setUserIsLogged(user);
    }
  }, []);

  // Open a new modal
  const handleToggleModal = (modal) => {
    setModalToOpen(modal);
    setOpenModal(!openModal);
  };

  const logoutUser = useCallback(() => {
    authService.logout();
    window.location.reload();
  });

  // Add event to logout user if JWT token expired
  useEffect(() => {
    eventBus.on("logout", () => {
      logoutUser();
    });

    return () => {
      eventBus.remove("logout");
    };
  }, [logoutUser]);

  // Fetch user settings and check if JWT token expired
  useEffect(() => {
    const userId = authService.getCurrentUser()?.id;

    if (userId) {
      userService
        .getUserSettings(userId)
        .then((response) => {
          setUserSettings(response.data);
        })
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            eventBus.dispatch("logout");
          }
        });
    }
  }, []);

  const userOptions = (
    <UserOptions
      buttons={[
        {
          icon: <SettingsIcon />,
          text: "Profile",
          handleClick: () => handleToggleModal("userProfile"),
        },
        {
          icon: <SettingsIcon />,
          text: "Settings",
          handleClick: () => handleToggleModal("userSettings"),
        },
        {
          icon: <LogoutIcon />,
          text: "Logout",
          handleClick: logoutUser,
        },
      ]}
    />
  );

  // Sign In and Sign Up buttons
  const userAuth = (
    <div>
      <button
        className="mr-4 hover:text-gray-300"
        onClick={() => handleToggleModal("userLogin")}
      >
        Sign In
      </button>
      <button
        className="px-4 py-1 bg-blue-600 rounded hover:bg-blue-800 hover:text-gray-300"
        onClick={() => handleToggleModal("userSignUp")}
      >
        Sign Up
      </button>
    </div>
  );

  // Fetch user tasks
  useEffect(() => {
    const fetchTasks = async () => {
      const user = authService.getCurrentUser();
      const tasks = await userService.getUserTasks(user.id);
      // Set fetched task to state
      setPendingTasks(tasks.data)
    };
    fetchTasks();
  }, []);

  return (
    <main className="min-h-screen bg-slate-400">
      {/* User selected modal */}
      <ModalContainer
        modalToOpen={modalToOpen}
        toggleModal={handleToggleModal}
        open={openModal}
      >
        {{
          userProfile: <UserProfile />,
          userSettings: (
            <UserSettings
              setSettings={setUserSettings}
              settings={userSettings}
            />
          ),
          userLogin: <UserAuth />,
          userSignUp: <UserAuth signUp={true} />,
        }}
      </ModalContainer>
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
              tasks: [...pendingTasks],
            },
            {
              id: "completed-tasks",
              tab: "Completed Tasks",
              tasks: [...completedTasks],
            },
          ]}
        />
      </div>
    </main>
  );
}

export default App;
