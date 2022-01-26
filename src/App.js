import CompletedTasks from "./sections/CompletedTasks";
import Tasks from "./sections/Tasks";
import Timer from "./sections/Timer";
import TopPanel from "./sections/TopPanel";

function App() {
  return (
    <main>
      <TopPanel> 
        <div>Hello</div>
      </TopPanel>
      <Timer />
      <CompletedTasks />
      <Tasks />
    </main>
  );
}

export default App;
