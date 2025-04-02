import { useLocation, useNavigate } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { Bell, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { edunova } from "../../assets";
import { navigationInstructor } from "../../constants";
import Button from "../design/Button";
import { HamburgerMenu } from "../design/Header";
import axios from "axios";
import { url } from "../../constants";

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
        // Replace with the actual user ID
        const userId = location.state?.userId || localStorage.getItem("userId");
  
        if (!userId) {
          console.error("User ID is not available.");
          return;
        }
  
        // Fetch notifications from the API
        const response = await axios.get(`${url}/notification/get-notification/${userId}`);
        const notificationsData = response.data;
  
        // Map the notifications to the required format
        const formattedNotifications = notificationsData.map((notification) => ({
          id: notification.notification_id,
          studentName: notification.from, // Replace with actual student name if available
          course: notification.course,
          message: notification.msg,
          time: "Just now", // Replace with actual time if available
          read: notification.status === "read",
          requestId: notification.notification_id, // Use notification_id as requestId
        }));
  
        setNotifications(formattedNotifications);
  
        // Count unread notifications
        const unreadCount = formattedNotifications.filter((n) => !n.read).length;
        setUnreadCount(unreadCount);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
  
    fetchNotifications();
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
      // Mark as read when opened
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    }
  };

  const handleViewRequest = (requestId) => {
    // Close notifications popup
    setShowNotifications(false);
    // Navigate to dashboard chat requests with the specific request highlighted
    navigate('/dashboard', { 
      state: { 
        activeTab: 'chatRequests',
        highlightRequest: requestId 
      } 
    });
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          <img src={edunova} width={190} height={40} alt="EduNova" />
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigationInstructor.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </a>
            ))}
          </div>

          <HamburgerMenu />
        </nav>

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
                      key={notification.id} // Keep the key for React's reconciliation but don't display it
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
                        onClick={() => handleViewRequest(notification.requestId)} // Use requestId for navigation logic
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
  );
};

export default HeaderInstructor;