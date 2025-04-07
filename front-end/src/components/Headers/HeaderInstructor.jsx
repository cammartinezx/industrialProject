import { useLocation, useNavigate } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { Bell, Menu, X, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { edunova } from "../../assets";
import { navigationInstructor } from "../../constants";
import Button from "../design/Button";
import { HamburgerMenu } from "../design/Header";
import axios from "axios";
import { url } from "../../constants";
import ButtonGradient from "../../assets/svg/ButtonGradient";

const HeaderInstructor = () => {
  const pathname = useLocation();
  const navigate = useNavigate();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userId = location.state?.userId || localStorage.getItem("userId");
  
        if (!userId) {
          console.error("User ID is not available.");
          return;
        }
  
        const response = await axios.get(`${url}/notification/get-notification/${userId}`);
        const notificationsData = response.data;
  
        const formattedNotifications = notificationsData.map((notification) => {
          const studentName = notification.msg.split(' ')[0];
          
          let timeString = 'Just now';
          try {
            const notificationTime = new Date(notification.created_at);
            if (!isNaN(notificationTime.getTime())) {
              const now = new Date();
              const timeDiff = now - notificationTime;
              
              if (timeDiff < 60000) {
                timeString = 'Just now';
              } else if (timeDiff < 3600000) {
                const minutes = Math.floor(timeDiff / 60000);
                timeString = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
              } else if (timeDiff < 86400000) {
                const hours = Math.floor(timeDiff / 3600000);
                timeString = `${hours} hour${hours > 1 ? 's' : ''} ago`;
              } else {
                const days = Math.floor(timeDiff / 86400000);
                if (!isNaN(days)) {
                  timeString = `${days} day${days > 1 ? 's' : ''} ago`;
                }
              }
            }
          } catch (error) {
            console.error('Error parsing date:', error);
            timeString = 'Just now';
          }

          return {
            id: notification.notification_id,
            studentName: studentName,
            from: notification.from,
            course: notification.course,
            message: notification.msg,
            time: timeString,
            read: notification.status === "read",
            requestId: notification.notification_id,
            created_at: notification.created_at
          };
        });
  
        setNotifications(formattedNotifications);
        const unreadCount = formattedNotifications.filter((n) => !n.read).length;
        setUnreadCount(unreadCount);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
  
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;
    enablePageScroll();
    setOpenNavigation(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications && unreadCount > 0) {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    }
  };

  const handleViewRequest = (requestId, course, from) => {
    setShowNotifications(false);
    navigate(`/join-chat/${course}/${from}`);
  };

  return (
    <>
      <ButtonGradient />
      <div
        className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
          openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
        }`}
      >
        <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-n-7 transition-colors"
          >
            <ArrowLeft size={20} className="text-n-1" />
          </button>
  
          <div className="flex-1 flex justify-center">
            <a className="block" href="#hero">
              <img src={edunova} width={190} height={40} alt="EduNova" />
            </a>
          </div>
  
          {/* Notifications Area */}
          <div className="relative hidden lg:block mr-6">
            <button 
              className="relative p-2 rounded-full hover:bg-n-7 transition-colors"
              onClick={toggleNotifications}
            >
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
                  <button 
                    onClick={toggleNotifications}
                    className="text-n-3 hover:text-n-1"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-4 border-b border-n-6 hover:bg-n-7 transition-colors ${
                          !notification.read ? "bg-n-7/50" : ""
                        }`}
                      >
                        <div className="flex justify-between">
                          <span className="font-medium text-n-1">{notification.studentName}</span>
                          <span className="text-xs text-n-3">{notification.time}</span>
                        </div>
                        <p className="text-sm text-n-2 mt-1">{notification.course}</p>
                        <p className="text-sm text-n-2 mt-1">{notification.message}</p>
                        <button 
                          onClick={() => handleViewRequest(notification.requestId, notification.course, notification.from)}
                          className="mt-2 text-xs text-purple-500 hover:text-purple-400"
                        >
                          View Request
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-n-3">
                      No new notifications
                    </div>
                  )}
                </div>
                  
                <div className="p-2 border-t border-n-6 text-center">
                  <button className="text-xs text-purple-500 hover:text-purple-400">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>
  
          {/* Logout Button */}
          <Button className="hidden lg:flex" href="/">
            Log Out
          </Button>
  
          <Button
            className="ml-auto lg:hidden"
            px="px-3"
            onClick={toggleNavigation}
          >
            <Menu size={24} />
          </Button>
        </div>
      </div>
    </>
  );
  
};

export default HeaderInstructor;