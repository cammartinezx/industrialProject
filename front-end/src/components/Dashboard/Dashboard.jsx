import { useState, useEffect } from 'react';
import Courses from "./Courses.jsx";
import HeaderStudent from "../Headers/HeaderStudent.jsx";
import HeaderInstructor from "../Headers/HeaderInstructor.jsx";
import PastConversationsTable from './PastConversationsTable.jsx';





// const ChatRequestsTable = () => {
//   const [chatRequests, setChatRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchChatRequests = async () => {
//       try {
//         setLoading(true);
//         // Mock data - replace with actual API call
//         const mockRequests = [
//           {
//             id: 1,
//             studentName: "Dhvani",
//             course: "Applied Linear Statistical Models",
//             unit: "Unit1: Introduction",
//             time: "2023-05-15T14:30:00Z",
//             status: "pending"
//           },
//           {
//             id: 2,
//             studentName: "Camila",
//             course: "Introduction to Computer Systems",
//             unit: "Unit2: Representation",
//             time: "2023-05-16T09:15:00Z",
//             status: "pending"
//           },
//           {
//             id: 3,
//             studentName: "Luke",
//             course: "Distributed Computing",
//             unit: "Unit2: XYZ",
//             time: new Date().toISOString(),
//             status: "pending"
//           }
//         ];
        
//         // Sort by time (oldest first)
//         const sortedRequests = [...mockRequests].sort((a, b) => 
//           new Date(a.time) - new Date(b.time)
//         );
        
//         setChatRequests(sortedRequests);
//       } catch (err) {
//         setError('Failed to load chat requests');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChatRequests();
//   }, []);

//   const handleEnterChat = (requestId) => {
//     console.log(`Entering chat for request ${requestId}`);
//   };

//   const formatTime = (isoString) => {
//     const date = new Date(isoString);
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     }) + ' • ' + date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit'
//     }).toLowerCase();
//   };

//   if (loading) return (
//     <div className="flex justify-center items-center h-64">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
//     </div>
//   );

//   if (error) return (
//     <div className="flex justify-center items-center h-64">
//       <p className="text-red-500 text-lg">{error}</p>
//     </div>
//   );

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6 text-n-1">Chat Requests</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full">
//           <thead className="bg-n-7">
//             <tr>
//               <th className="py-4 px-6 text-left text-n-1 font-medium">Student</th>
//               <th className="py-4 px-6 text-left text-n-1 font-medium">Course</th>
//               <th className="py-4 px-6 text-left text-n-1 font-medium">Unit</th>
//               <th className="py-4 px-6 text-left text-n-1 font-medium">Date and Time</th>
//               <th className="py-4 px-6 text-left text-n-1 font-medium">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-n-6">
//             {chatRequests.map((request) => (
//               <tr key={request.id} className="hover:bg-n-7 transition-colors">
//                 <td className="py-4 px-6 text-n-1">{request.studentName}</td>
//                 <td className="py-4 px-6 text-n-1">{request.course}</td>
//                 <td className="py-4 px-6 text-n-1">{request.unit}</td>
//                 <td className="py-4 px-6 text-n-2">{formatTime(request.time)}</td>
//                 <td className="py-4 px-6">
//                   <button
//                     onClick={() => handleEnterChat(request.id)}
//                     className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded transition-colors"
//                   >
//                     Chat
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };






const Dashboard = () => {
  const userId = location.state?.userId || localStorage.getItem("userId");

  const role = location.state?.role || localStorage.getItem("role");
  const [activeTab, setActiveTab] = useState('courses');

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        {role === "student" ? <HeaderStudent /> : <HeaderInstructor />}
        
        {/* Tab Navigation */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex border-b border-n-3">
            <button
              className={`py-3 px-6 font-medium text-lg ${
                activeTab === 'courses' 
                  ? 'text-purple-500 border-b-2 border-purple-500' 
                  : 'text-n-2 hover:text-n-1'
              }`}
              onClick={() => setActiveTab('courses')}
            >
              My Courses
            </button>
            {/* {role === 'instructor' && (
              <button
                className={`py-3 px-6 font-medium text-lg ${
                  activeTab === 'chatRequests' 
                    ? 'text-purple-500 border-b-2 border-purple-500' 
                    : 'text-n-2 hover:text-n-1'
                }`}
                onClick={() => setActiveTab('chatRequests')}
              >
                Chat Requests
              </button>
            )} */}
            {role === 'student' && (
              <button
                className={`py-3 px-6 font-medium text-lg ${
                  activeTab === 'pastConversations' 
                    ? 'text-purple-500 border-b-2 border-purple-500' 
                    : 'text-n-2 hover:text-n-1'
                }`}
                onClick={() => setActiveTab('pastConversations')}
              >
                Past Conversations
              </button>
            )}
          </div>
        </div>

      {/* Tab Content */}
<div className="container mx-auto px-4 pb-10">
  {activeTab === 'courses' ? (
    <Courses />
  ) : role === 'student' ? (
    <PastConversationsTable userId={userId} />
  ) : (
    <ChatRequestsTable />
  )}
</div>

      </div>
    </>
  );
};

export default Dashboard;