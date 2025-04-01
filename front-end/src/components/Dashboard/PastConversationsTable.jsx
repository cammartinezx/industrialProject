import { useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../../constants';
import { XMLParser } from "fast-xml-parser";




export const handleDownload = async (userId) => {
    try {
      // Request a signed URL from your backend
      const res = await axios.get(`${url}/student-s3Url-list`, {
        params: { studentId: userId },
      });
  
      const listURL = res.data.urlS3?.listURL;
      if (!listURL) {
        throw new Error("Failed to retrieve the file URL.");
      }
  
      // Fetch the XML response from S3
      const response = await axios.get(listURL);
      const xmlData = response.data;
  
      // Convert XML to JSON
      const parser = new XMLParser();
      const jsonResult = parser.parse(xmlData);
      console.log(jsonResult);
  
      // Extract file keys (paths)
      const files =
        jsonResult.ListBucketResult.Contents?.map((item) => item.Key) || [];
  
      console.log("Files:", files);
      return files;
    } catch (error) {
      console.error("List failed:", error);
      alert("Failed to retrieve the file list.");
      return [];
    }
  };


const PastConversationsTable = () => {
  const [fileRequests, setFileRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFileRequests = async () => {
      try {
        setLoading(true);
        // Mock data - replace with actual API call
        const mockRequests = [
          {
            id: 1,
            course: "Applied Linear Statistical Models",
            fileName: "unit1_representation.pdf",
            fileUrl: "https://example.com/unit1_representation.pdf"
          },
          {
            id: 2,
            course: "Introduction to Computer Systems",
            fileName: "unit2_representation.md",
            fileUrl: "https://example.com/unit2_representation.md"
          },
          {
            id: 3,
            course: "Distributed Computing",
            fileName: "unit2_xyz.pdf",
            fileUrl: "https://example.com/unit2_xyz.pdf"
          }
        ];
        
        setFileRequests(mockRequests);
      } catch (err) {
        setError('Failed to load file requests');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFileRequests();
  }, []);


  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-red-500 text-lg">{error}</p>
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-n-1">File Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-n-7">
            <tr>
              <th className="py-4 px-6 text-left text-n-1 font-medium">Course</th>
              <th className="py-4 px-6 text-left text-n-1 font-medium">File Name</th>
              <th className="py-4 px-6 text-left text-n-1 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-n-6">
            {fileRequests.map((request) => (
              <tr key={request.id} className="hover:bg-n-7 transition-colors">
                <td className="py-4 px-6 text-n-1">{request.course}</td>
                <td className="py-4 px-6 text-n-1">{request.fileName}</td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => handleDownload("7c2b2198-4f7c-4fd7-907b-880ff31dc9cc")}
                    className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded transition-colors"
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default PastConversationsTable;