// Components
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";

function UserSettings({ settings }) {
  console.log(settings);
  return (
    <div className="w-[24rem] p-4 font-medium border-gray-600 text-gray-900 dark:text-gray-300">
      {/* Timers length */}
      <div className="pb-4 mb-4 border-b grid grid-cols-3 gap-2">
        <h3 className="text-xl col-span-full">Time (in minutes)</h3>
        <Input
          dim={{ input: "w-full" }}
          labelText={{ text: "Pomodoro", style: "text-sm" }}
          type="number"
          name="pomodoro"
          value={settings.pomodoro}
        />
        <Input
          dim={{ input: "w-full" }}
          labelText={{ text: "Short Break", style: "text-sm" }}
          type="number"
          name="short-break"
          value={settings.shortBreak}
        />
        <Input
          dim={{ input: "w-full" }}
          labelText={{ text: "Long Break", style: "text-sm" }}
          type="number"
          name="long-break"
          value={settings.longBreak}
        />
      </div>
      <div className="pb-4 mb-4 border-b">
        <Checkbox
          text={{ text: "Auto start Breaks?", style: "text-xl" }}
          id="break-checkbox"
          checked={settings.autoStartBreak}
        />
      </div>
      <div className="pb-4 mb-4 border-b">
        <Checkbox
          text={{ text: "Auto start Pomodoro?", style: "text-xl" }}
          id="pomo-checkbox"
          checked={settings.autoStartPomodoro}
        />
      </div>
      <div className="pb-4 mb-4 border-b">
        <Input
          dim={{
            cont: "flex items-center justify-between mt-4",
            input: "w-[5rem]",
          }}
          labelText={{ text: "Long Break Interval", style: "text-xl" }}
          type="number"
          name="long-break"
          value={settings.longBreakInterval}
        />
      </div>
      <Checkbox
        text={{ text: "Dark Mode", style: "text-xl" }}
        id="dark-mode-checkbox"
        checked={settings.darkMode}
      />
    </div>
  );
}

export default UserSettings;
