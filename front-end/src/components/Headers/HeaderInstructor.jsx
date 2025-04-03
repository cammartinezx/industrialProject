import { useLocation, useNavigate } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { Bell, Menu, X, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { edunova } from "../../assets";
import Button from "../design/Button";
import axios from "axios";
import { url } from "../../constants";

const HeaderInstructor = () => {
  const navigate = useNavigate();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

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

        const formattedNotifications = notificationsData.map((notification) => {
          const studentName = notification.msg.split(" ")[0];
          let timeString = "Just now";
          try {
            const notificationTime = new Date(notification.created_at);
            if (!isNaN(notificationTime.getTime())) {
              const now = new Date();
              const timeDiff = now - notificationTime;

              if (timeDiff < 60000) {
                timeString = "Just now";
              } else if (timeDiff < 3600000) {
                const minutes = Math.floor(timeDiff / 60000);
                timeString = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
              } else if (timeDiff < 86400000) {
                const hours = Math.floor(timeDiff / 3600000);
                timeString = `${hours} hour${hours > 1 ? "s" : ""} ago`;
              } else {
                const days = Math.floor(timeDiff / 86400000);
                if (!isNaN(days)) {
                  timeString = `${days} day${days > 1 ? "s" : ""} ago`;
                }
              }
            }
          } catch (error) {
            console.error("Error parsing date:", error);
            timeString = "Just now";
          }

          return {
            id: notification.notification_id,
            studentName,
            from: notification.from,
            course: notification.course,
            message: notification.msg,
            time: timeString,
            read: notification.status === "read",
            requestId: notification.notification_id,
          };
        });

        setNotifications(formattedNotifications);
        setUnreadCount(formattedNotifications.filter((n) => !n.read).length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleNavigation = () => {
    setOpenNavigation((prev) => !prev);
    openNavigation ? enablePageScroll() : disablePageScroll();
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications && unreadCount > 0) {
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 border-b border-n-6 bg-n-8/90 backdrop-blur-sm">
      <div className="flex items-center justify-between px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <Button className="lg:hidden" px="px-3" onClick={toggleNavigation}>
          <Menu size={24} />
        </Button>
        
        <Button className="lg:hidden mr-4" px="px-3" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </Button>

        <a className="block mx-auto w-[12rem]" href="#hero">
          <img src={edunova} width={190} height={40} alt="EduNova" />
        </a>

        <div className="relative hidden lg:block mr-6">
          <button className="relative p-2 rounded-full hover:bg-n-7 transition-colors" onClick={toggleNotifications}>
            <Bell size={24} className="text-n-1" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

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
                      <div className="flex justify-between">
                        <span className="font-medium text-n-1">{notification.studentName}</span>
                        <span className="text-xs text-n-3">{notification.time}</span>
                      </div>
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

        <Button className="hidden lg:flex" href="/">Log Out</Button>
      </div>
    </div>
  );
};

export default HeaderInstructor;
