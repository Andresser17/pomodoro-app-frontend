// Sections
import Tasks from "./sections/Tasks";
import Timer from "./sections/Timer";
import TopPanel from "./sections/TopPanel";
// Components
import SiteLogo from "./components/SiteLogo";
import UserLogo from "./components/UserLogo";

function App() {
  return (
    <main>
      <TopPanel>
        <SiteLogo />
        <UserLogo />
      </TopPanel>
      <Timer />
      <Tasks />
    </main>
  );
}

export default App;
