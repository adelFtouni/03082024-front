import React from 'react';

const NotificationButton = () => {
  const handleNotificationClick = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      new Notification("Hello from React!");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          new Notification("Hello from React!");
        }
      });
    }
  };

  return (
    <button onClick={handleNotificationClick}>Show Notification</button>
  );
};

export default NotificationButton;
