// Components
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";

function UserSettings() {
  return (
    <div className="w-[24rem] p-4 font-medium border-gray-600 text-gray-900 dark:text-gray-300">
      {/* Timers length */}
      <div className="grid grid-cols-3 gap-2 border-b mb-4 pb-4">
        <h3 className="col-span-full text-xl">Time (in minutes)</h3>
        <Input
          dim={{ input: "w-full" }}
          labelText={{ text: "Pomodoro", style: "text-sm" }}
          type="number"
          name="pomodoro"
        />
        <Input
          dim={{ input: "w-full" }}
          labelText={{ text: "Short Break", style: "text-sm" }}
          type="number"
          name="short-break"
        />
        <Input
          dim={{ input: "w-full" }}
          labelText={{ text: "Long Break", style: "text-sm" }}
          type="number"
          name="long-break"
        />
      </div>
      <div className="border-b mb-4 pb-4">
        <Checkbox
          text={{ text: "Auto start Breaks?", style: "text-xl" }}
          id="break-checkbox"
        />
      </div>
      <div className="border-b mb-4 pb-4">
        <Checkbox
          text={{ text: "Auto start Pomodoros?", style: "text-xl" }}
          id="pomo-checkbox"
        />
      </div>
      <div className="border-b mb-4 pb-4">
        <Input
          dim={{
            cont: "flex items-center justify-between mt-4",
            input: "w-[5rem]",
          }}
          labelText={{ text: "Long Break Interval", style: "text-xl" }}
          type="number"
          name="long-break"
        />
      </div>
      <Checkbox
        text={{ text: "Dark Mode", style: "text-xl" }}
        id="dark-mode-checkbox"
      />
    </div>
  );
}

export default UserSettings;
