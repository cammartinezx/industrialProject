import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import axios from "axios";
import { useState, useEffect } from "react";
import { edunova } from "../../assets";
import { url } from "../../constants";
import Button from "../design/Button";
import { Bell, X, ArrowLeft } from "lucide-react";

const HeaderStudent = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          console.error("User ID is not available.");
          return;
        }

        const response = await axios.get(`${url}/notification/get-notification/${userId}`);
        const notificationsData = response.data;

        const formattedNotifications = notificationsData.map((notification) => ({
          id: notification.notification_id,
          message: notification.msg,
          course: notification.course,
          read: notification.status === "read",
        }));

        setNotifications(formattedNotifications);

        const unreadCount = formattedNotifications.filter((n) => !n.read).length;
        setUnreadCount(unreadCount);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 border-b border-n-6 bg-n-8/90 backdrop-blur-sm">
      <div className="flex items-center justify-between px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <div className="flex items-center gap-4">
          <button onClick={() => window.history.back()} className="text-n-1 hover:text-color-1">
            <ArrowLeft size={24} />
          </button>
        </div>

        <div className="flex-1 flex justify-center">
          <a className="block w-[12rem]" href="#hero">
            <img src={edunova} width={190} height={40} alt="EduNova" />
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleNotifications} className="relative text-n-1 hover:text-color-1">
            <Bell size={24} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          
          <Button href="/">Log Out</Button>
        </div>
      </div>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-n-8 border border-n-6 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-n-6 flex justify-between items-center">
            <h3 className="font-semibold text-n-1">Notifications</h3>
            <button onClick={toggleNotifications} className="text-n-3 hover:text-n-1">
              <X size={18} />
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div key={notification.id} className={`p-4 border-b border-n-6 hover:bg-n-7 transition-colors ${!notification.read ? "bg-n-7/50" : ""}`}>
                  <p className="text-sm text-n-2 mt-1">{notification.course}</p>
                  <p className="text-sm text-n-2 mt-1">{notification.message}</p>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-n-3">No new notifications</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderStudent;
