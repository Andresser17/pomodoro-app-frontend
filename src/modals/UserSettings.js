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
  const getSettingsRef = useRef(settings);
  getSettingsRef.current = settings;

  useEffect(() => {
    const saveChangesToDb = async () => {
      const userId = authService.getCurrentUser()?.id;
      const {timerModes, ...newSettings} = getSettingsRef.current;

      // Save updates to modes
      for (let mode of timerModes) {
        await userService.setUserMode(userId, mode);
      }

      await userService.setUserSettings(userId, newSettings);
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

  const handleSaveTimerModes = (id, key, newValue) => {
    // Iterate array
    const updated = settings.timerModes.map((item) => {
      if (item._id === id) return { ...item, [key]: newValue };

      return item;
    });

    const newSettings = { ...settings, timerModes: updated };
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
          name="timer-modes-pomodoro"
          value={settings.timerModes[0].duration}
          saveChanges={(newValue) =>
            handleSaveTimerModes(
              settings.timerModes[0]._id,
              "duration",
              newValue
            )
          }
        />
        <Input
          dim={{ input: "w-full" }}
          labelText={{ text: "Short Break", style: "text-sm" }}
          type="number"
          name="timer-modes-short-break"
          value={settings.timerModes[1].duration}
          saveChanges={(newValue) =>
            handleSaveTimerModes(
              settings.timerModes[1]._id,
              "duration",
              newValue
            )
          }
        />
        <Input
          dim={{ input: "w-full" }}
          labelText={{ text: "Long Break", style: "text-sm" }}
          type="number"
          name="long-break"
          value={settings.timerModes[2].duration}
          saveChanges={(newValue) =>
            handleSaveTimerModes(
              settings.timerModes[2]._id,
              "duration",
              newValue
            )
          }
        />
      </div>
      <div className="pb-4 mb-4 border-b">
        <Checkbox
          text={{ text: "Auto start Pomodoro?", style: "text-xl" }}
          name="auto-start-pomodoro"
          checked={settings.timerModes[0].autoStart}
          saveChanges={(newValue) =>
            handleSaveTimerModes(
              settings.timerModes[0]._id,
              "autoStart",
              newValue
            )
          }
        />
      </div>
      <div className="pb-4 mb-4 border-b">
        <Checkbox
          text={{ text: "Auto start Short Break?", style: "text-xl" }}
          name="auto-start-short-break"
          checked={settings.timerModes[1].autoStart}
          saveChanges={(newValue) =>
            handleSaveTimerModes(
              settings.timerModes[1]._id,
              "autoStart",
              newValue
            )
          }
        />
      </div>
      <div className="pb-4 mb-4 border-b">
        <Checkbox
          text={{ text: "Auto start Long Break?", style: "text-xl" }}
          name="auto-start-long-break"
          checked={settings.timerModes[2].autoStart}
          saveChanges={(newValue) =>
            handleSaveTimerModes(
              settings.timerModes[2]._id,
              "autoStart",
              newValue
            )
          }
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
          name="timer-modes-long-break-interval"
          value={settings.timerModes[2].interval}
          saveChanges={(newValue) =>
            handleSaveTimerModes(
              settings.timerModes[2]._id,
              "interval",
              newValue
            )
          }
        />
      </div>
      <div className="pb-4 mb-4 border-b">
        <Checkbox
          text={{ text: "Active Short Break", style: "text-xl" }}
          name="short-break-active"
          checked={settings.timerModes[1].active}
          saveChanges={(newValue) =>
            handleSaveTimerModes(settings.timerModes[1]._id, "active", newValue)
          }
        />
      </div>
      <div className="pb-4 mb-4 border-b">
        <Checkbox
          text={{ text: "Active Long Break", style: "text-xl" }}
          name="long-break-active"
          checked={settings.timerModes[2].active}
          saveChanges={(newValue) =>
            handleSaveTimerModes(settings.timerModes[2]._id, "active", newValue)
          }
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
        saveChanges={(newValue) => handleSaveSettings("darkMode", newValue)}
      />
    </div>
  );
}

export default UserSettings;
