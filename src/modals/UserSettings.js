// Components
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";

function UserSettings() {
  return (
    <div className="w-[22rem] p-4">
      {/* Timers length */}
      <div className="grid grid-cols-3 gap-2">
        <h3 className="col-span-full">Time (in minutes)</h3>
        <Input labelText="Pomodoro" type="number" name="pomodoro" />
        <Input labelText="Short Break" type="number" name="short-break" />
        <Input labelText="Long Break" type="number" name="long-break" />
      </div>
    <Checkbox />
    </div>
  );
}

export default UserSettings;
