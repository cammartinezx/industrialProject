

import Courses from "./Courses.jsx";
import HeaderStudent from "../Headers/HeaderStudent.jsx";
import HeaderInstructor from "../Headers/HeaderInstructor.jsx";

const Dashboard = () => {
  //const userId = location.state?.userId || localStorage.getItem("userId");
  const role = location.state?.role || localStorage.getItem("role");
  //const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (user_id) {
  //     const fetchUserRole = async () => {
  //       try {
  //         const response = await axios.get(`${url}/user/${user_id}/get-user`);
  //         setUserRole(response.data.role); // Assuming API response has a 'role' field
  //       } catch (error) {
  //         console.error("Error fetching user role:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchUserRole();
  //   }
  // }, [user_id, url]);

  // if (loading) {
  //   return <p>Loading...</p>; // Show a loading state while fetching user role
  // }

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        {role === "student" ? <HeaderStudent /> : <HeaderInstructor />}
        <Courses />
      </div>
    </>
  );
};

export default Dashboard;
