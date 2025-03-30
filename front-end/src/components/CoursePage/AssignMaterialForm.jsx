import React from "react";

import axios from "axios";
import { url } from "../../constants";

class AssignMaterialForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            file: null,
        };
    }

    handleFileChange = (e) => {
        this.setState({ file: e.target.files[0] });
    };

    handleTitleChange = (e) => {
        this.setState({ title: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        const { title, file } = this.state;
        const { courseId } = this.props; 

        if (!title || !file) {
            alert("Please enter a title and upload a file.");
            return;
        }

        try {
            // 1️⃣ Get a pre-signed URL from your backend
            const res = await axios.get(`${url}/s3Url`, {
                params: { fileName: `${courseId}/${title}`, fileType: file.type},
              });
              // Extract the uploadURL directly as a string
              const urlS3 = res.data.urlS3?.uploadURL;
        
            // 2️⃣ Upload the file directly to S3
            console.log("Uploading file to S3...");
            console.log(urlS3);
           
            const uploadResponse = await axios.put(urlS3, file, {
                headers: { "Content-Type": file.type }
            });

        if (uploadResponse.status === 200) {
            console.log("File uploaded successfully!");

            // 3️⃣ Extract the file URL from the pre-signed URL
            const fileUrl = urlS3.split("?")[0];
            console.log("Final file URL:", fileUrl);

            // 4️⃣ Add unit to course after successful upload
            await axios.post(`${url}/course/${courseId}/add-unit`, {
                unit_title: title,
                //fileUrl: fileUrl,
            });

            console.log("Unit added successfully!");

            this.props.closeModal(); // Close modal after success
        } else {
            throw new Error("File upload failed");
        }
          

        
            // 3️⃣ Extract the file URL from the pre-signed URL
            const fileUrl = urlS3.split("?")[0];
            console.log("Final file URL:", fileUrl);
        
            this.props.closeModal(); // Close modal after success
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to upload material.");
        }
        
    };

    render() {
        return (
            <form id={"Assign-material"} onSubmit={this.handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Enter Title"
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                    className="w-full px-4 py-2 border rounded-md bg-n-11"
                />

                <input
                    type="file"
                    onChange={this.handleFileChange}
                    className="w-full border p-3 rounded-md bg-n-11"
                />

            <div className="flex justify-center">
                <button type="submit" className="w-auto p-8 py-3 bg-n-11 rounded-md ">
                    Submit
                </button>
            </div>
            </form>
        );
    }
}

export default AssignMaterialForm;

