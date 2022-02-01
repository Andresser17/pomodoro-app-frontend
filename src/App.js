// Sections
import Tasks from "./sections/Tasks";
import Timer from "./sections/Timer";
import TopPanel from "./sections/TopPanel";
// Components
import SiteLogo from "./components/SiteLogo";
import UserLogo from "./components/UserLogo";

function App() {
  const taskSample = {
    id: "0",
    title: "Start development of pomodoro app",
    description:
      "Amet vero consequatur maiores ab assumenda Quas obcaecati voluptatem amet mollitia sed Maxime consequuntur at sequi a minima facilis.",
    pomodoros: 3,
    color: "#333",
  };
  const taskSamples = [];
  for (let i = 0; i < 5; i++) {
    let newId = String(i);
    taskSamples.push({...taskSample, id: newId}) 
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
            { mode: "work", remainTime: 60, default: true },
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
              tasks: [...taskSamples],
              default: true,
            },
            {
              id: "completed-tasks",
              tab: "Completed Tasks",
              subTabs: ["Today", "Tomorrow"],
              tasks: [...taskSamples],
            },
          ]}
        />
      </div>
    </main>
  );
}

export default App;
