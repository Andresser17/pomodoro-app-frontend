// Sections
import Tasks from "./sections/Tasks";
import Timer from "./sections/Timer";
import TopPanel from "./sections/TopPanel";
// Components
import SiteLogo from "./components/SiteLogo";
import UserLogo from "./components/UserLogo";

function App() {
  const pending = {
    id: "0",
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
    let newId = String(i);
    pendingTasks.push({...pending, id: newId}) 
  }

  const completed = {
    id: "0",
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
    let newId = String(i);
    completedTasks.push({...completed, id: newId}) 
  }

  return (
    <main className="min-h-screen bg-slate-400">
      <TopPanel>
        <SiteLogo />
        <UserLogo />
      </TopPanel>
      <div className="flex flex-col items-center py-4">
        <Timer
          modes={[
            { mode: "work", remainTime: 5, default: true },
            { mode: "short-break", remainTime: 5 },
            { mode: "long-break", remainTime: 20 },
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
