// Sections
import Tasks from "./sections/Tasks";
import Timer from "./sections/Timer";
import TopPanel from "./sections/TopPanel";
// Components
import SiteLogo from "./components/SiteLogo";
import UserLogo from "./components/UserLogo";

function App() {
  return (
    <main className="min-h-screen bg-slate-400">
      <TopPanel>
        <SiteLogo />
        <UserLogo />
      </TopPanel>
      <div className="flex flex-col items-center py-4">
        <Timer />
        <Tasks />
      </div>
    </main>
  );
}

export default App;
