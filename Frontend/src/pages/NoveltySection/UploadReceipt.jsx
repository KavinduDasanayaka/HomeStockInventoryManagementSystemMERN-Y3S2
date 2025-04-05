


import { useState } from "react";
// import "prismjs/themes/prism-tomorrow.css";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";

function UploadReceipt() {
  const [code, setCode] = useState("Enter Your ingredients here");
  const [review, setReview] = useState([]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  // async function reviewCode() {
  //   setLoading(true);
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/ai/get-review/",
  //       { code }
  //     );
  //     console.log(response.data);

  //     const cleanedReview = response.data
  //       .replace(/<think>.*?<\/think>/gs, "")
  //       .trim();

  //     setReview(cleanedReview);
  //   } catch (error) {
  //     console.error("Error fetching review:", error);
  //     setReview([]);
  //   }
  //   setLoading(false);
  // }

  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;
  
  //   const formData = new FormData();
  //   formData.append("image", file);
  
  //   try {
  //     const response = await fetch("http://localhost:3002/upload", {
  //       method: "POST",
  //       body: formData,
  //     });
  //     const data = await response.json();
  //     console.log(data);
  
  //     let extractedData = data.extractedData;
  
  //     // Extract the JSON-like structure from the string
  //     const jsonMatch = extractedData.match(/\[.*\]/s); // Matches anything inside [ ... ]
  
  //     console.log("Hii" + jsonMatch);
  //     if (!jsonMatch) {
  //       throw new Error("No valid JSON array found in extracted data.");
  //     }
  
  //     const parsedData = JSON.parse(jsonMatch[0]); // Parse the matched JSON array
  //     console.log(parsedData); // Check if parsed data looks correct
  
  //     // Set the parsed data to state
  //     setData(parsedData);
  //     setCode(JSON.stringify(parsedData, null, 2)); // Format for readability
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //     setCode("Error processing extracted data.");
  //   }
  // };
  

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6 gap-6">
      <header className="w-full text-center py-4 text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg rounded-lg">
        AI Recipe Generator 👨‍🍳💻
      </header>

      <div className="flex flex-row gap-6 w-full max-w-6xl">
        {/* Left Panel */}
        <div className="w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto">
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
/*             onChange={handleImageUpload} */
            className="mb-4 text-sm text-gray-400 cursor-pointer bg-gray-700 p-2 rounded-lg"
          />

          {/* Code Editor */}
          <div className="border border-gray-600 rounded-lg p-4 bg-gray-900">
{/*             <p>{code}</p> */}
          </div>

          <button
/*             onClick={reviewCode} */
            className="w-full mt-4 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-500 hover:to-blue-600 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            Update Inventory
          </button>
        </div>

        {/* Right Panel */}

      </div>

      {/* Table */}
      <div className="w-full max-w-4xl">
        <table className="w-full border-collapse border border-gray-700 mt-6">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border border-gray-700 p-2">Quantity</th>
              <th className="border border-gray-700 p-2">Item</th>
              <th className="border border-gray-700 p-2">Unit Price</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="bg-gray-700 text-white">
                  <td className="border border-gray-700 p-2">
                    {item.quantity}
                  </td>
                  <td className="border border-gray-700 p-2">{item.item}</td>
                  <td className="border border-gray-700 p-2">{item.unitPrice}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-2">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UploadReceipt;
