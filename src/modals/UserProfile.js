import { useState, useEffect } from "react";
// Services
import authService from "services/auth.service";
// Common
import eventBus from "common/eventBus";

function UserProfile() {
  const currentUser = authService.getCurrentUser();

  return (
    <div className="w-[24rem] p-4 font-medium text-gray-900 dark:text-gray-300">
      <header className="pb-2">
        <h3 className="text-xl">Profile</h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser?.accessToken.substring(0, 20)} ...{" "}
        {currentUser?.accessToken.substr(currentUser?.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser?.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser?.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser?.roles &&
          currentUser?.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
}

export default UserProfile;
