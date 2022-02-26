import { useState, useEffect, useRef } from "react";
// Components
import Input from "components/Input";
import Checkbox from "components/Checkbox";
import Selection from "components/Selection";
// Services
import authService from "services/auth.service";
import userService from "services/user.service";

function UserSettings({ settings, setSettings }) {
  // Save change when user close modal
  const getSettingsRef = useRef();
  getSettingsRef.current = settings;

  useEffect(() => {
    const saveChangesToDb = async () => {
      const userId = authService.getCurrentUser()?.id;
      const saved = await userService.setUserSettings(
        userId,
        getSettingsRef.current
      );
    };

    return () => {
      saveChangesToDb();
    };
  }, []);

  // Save changes in current parent state
  const handleSaveSettings = (key, newValue) => {
    const newSettings = { ...settings, [key]: newValue };
    setSettings((prevState) => newSettings);
  };

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
          saveChange={handleSaveSettings}
        />
        <Input
          dim={{ input: "w-full" }}
          labelText={{ text: "Short Break", style: "text-sm" }}
          type="number"
          name="short-break"
          value={settings.shortBreak}
          saveChange={handleSaveSettings}
        />
        <Input
          dim={{ input: "w-full" }}
          labelText={{ text: "Long Break", style: "text-sm" }}
          type="number"
          name="long-break"
          value={settings.longBreak}
          saveChange={handleSaveSettings}
        />
      </div>
      <div className="pb-4 mb-4 border-b">
        <Checkbox
          text={{ text: "Auto start Breaks?", style: "text-xl" }}
          name="auto-start-break"
          checked={settings.autoStartBreak}
          saveChange={handleSaveSettings}
        />
      </div>
      <div className="pb-4 mb-4 border-b">
        <Checkbox
          text={{ text: "Auto start Pomodoro?", style: "text-xl" }}
          name="auto-start-pomodoro"
          checked={settings.autoStartPomodoro}
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
          value={settings.longBreakInterval}
          saveChange={handleSaveSettings}
        />
      </div>
      <div className="pb-4 mb-4 border-b">
        <Checkbox
          text={{ text: "Active Short Break", style: "text-xl" }}
          name="short-break-active"
          checked={settings.shortBreakActive}
          saveChange={handleSaveSettings}
        />
      </div>
      <div className="pb-4 mb-4 border-b">
        <Checkbox
          text={{ text: "Active Long Break", style: "text-xl" }}
          name="long-break-active"
          checked={settings.longBreakActive}
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
        checked={settings.darkMode}
        saveChange={handleSaveSettings}
      />
      {/* <button onClick={saveChangesToDb} className="p-4 bg-red-600"> */}
      {/*   Save */}
      {/* </button> */}
    </div>
  );
}

export default UserSettings;
