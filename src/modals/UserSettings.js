import { useState, useEffect } from "react";
// Components
import Input from "components/Input";
import Checkbox from "components/Checkbox";
import Selection from "components/Selection";
// Services
import authService from "services/auth.service";
import userService from "services/user.service";

function UserSettings({ settings }) {
  const [currentSettings, setCurrentSettings] = useState({});

  // Save change when user close modal
  const saveChangesToDb = async () => {
    const userId = authService.getCurrentUser()?.id;
    const saved = await userService.setUserSettings(userId, currentSettings);
  };

  // Save changes in current component state
  const handleSaveSettings = (key, newValue) => {
    const newSettings = { ...currentSettings, [key]: newValue };
    setCurrentSettings(newSettings);
  };

  // Set props.settings to currentSettings
  useEffect(() => {
    if (Object.keys(currentSettings).length === 0) {
      setCurrentSettings(settings);
    }
  }, [settings]);

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
          value={currentSettings.pomodoro}
          saveChange={handleSaveSettings}
        />
        <Input
          dim={{ input: "w-full" }}
          labelText={{ text: "Short Break", style: "text-sm" }}
          type="number"
          name="short-break"
          value={currentSettings.shortBreak}
          saveChange={handleSaveSettings}
        />
        <Input
          dim={{ input: "w-full" }}
          labelText={{ text: "Long Break", style: "text-sm" }}
          type="number"
          name="long-break"
          value={currentSettings.longBreak}
          saveChange={handleSaveSettings}
        />
      </div>
      <div className="pb-4 mb-4 border-b">
        <Checkbox
          text={{ text: "Auto start Breaks?", style: "text-xl" }}
          name="auto-start-break"
          checked={currentSettings.autoStartBreak}
          saveChange={handleSaveSettings}
        />
      </div>
      <div className="pb-4 mb-4 border-b">
        <Checkbox
          text={{ text: "Auto start Pomodoro?", style: "text-xl" }}
          name="auto-start-pomodoro"
          checked={currentSettings.autoStartPomodoro}
          saveChange={handleSaveSettings}
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
          name="long-break-interval"
          value={currentSettings.longBreakInterval}
          saveChange={handleSaveSettings}
        />
      </div>
      <div className="pb-4 mb-4 border-b">
        <Checkbox
          text={{ text: "Active Short Break", style: "text-xl" }}
          name="short-break-active"
          checked={currentSettings.shortBreakActive}
          saveChange={handleSaveSettings}
        />
      </div>
      <div className="pb-4 mb-4 border-b">
        <Checkbox
          text={{ text: "Active Long Break", style: "text-xl" }}
          name="long-break-active"
          checked={currentSettings.longBreakActive}
          saveChange={handleSaveSettings}
        />
      </div>
      <div className="pb-4 mb-4 border-b">
        <Selection
          dim={{
            cont: "flex items-center justify-between mt-4",
          }}
          labelText={{ text: "Alarm Sound", style: "text-xl" }}
          name="alarm-selection"
          options={[
            { name: "bell", song: "" },
            { name: "bird", song: "" },
            { name: "digital", song: "" },
            { name: "kitchen", song: "" },
            { name: "wood", song: "" },
          ]}
        />
      </div>
      <Checkbox
        text={{ text: "Dark Mode", style: "text-xl" }}
        name="dark-mode"
        checked={currentSettings.darkMode}
        saveChange={handleSaveSettings}
      />
      <button onClick={saveChangesToDb} className="p-4 bg-red-600">
        Save
      </button>
    </div>
  );
}

export default UserSettings;
