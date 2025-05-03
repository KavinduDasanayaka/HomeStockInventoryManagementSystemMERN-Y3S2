import { useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import { Upload, FileText } from "lucide-react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function UploadReceipt() {
  const [code, setCode] = useState("Enter your ingredients here...");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);

    try {
      const response = await fetch("api/previewInventory/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      const jsonMatch = data.extractedData.match(/\[.*\]/s);
      if (!jsonMatch) throw new Error("No valid JSON array found.");

      const parsedData = JSON.parse(jsonMatch[0]);
      setData(parsedData);
      setCode(JSON.stringify(parsedData, null, 2));
    } catch (error) {
      console.error("Error:", error);
      setCode("Error processing data.");
    } finally {
      setLoading(false);
    }
  };

  // const UpdatePreviewInventorye = async () => {
  //   setLoading(true);
  //   const formData = await fetch("api/previewInventory/create", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })};

    const result = async () => {
      try {
        const response = await axios.post("api/previewInventory/create", { data });
        console.log(response.data); // .data holds the actual response content
        setTimeout(navigate('/grocery-list'),5000)
      } catch (error) {
        console.error("Error creating preview inventory:", error);
      }
    };
    

    // const[name,setName] = useState("");
 
    // const Change = (e) => {
    //       const input = e.target.value
    //       console.log(input)
    //       setName(input)
    // }

    // const upload = async function() {
    //   const Name = axios.post("api/api/previewInventory/create",{name}).then((res) => {
    //     console.log(res)
    //   })
    // }

  return (
    <div className="min-h-screen from-[#77b1d4] to-[#a1c6e8] text-gray-800 p-6 flex flex-col items-center gap-8">
      <header className="text-center w-full max-w-4xl">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl shadow-lg">
          🧾 Upload Receipt
        </h1> 
      </header>

      

      <div className="flex flex-wrap gap-8 justify-center w-full max-w-6xl">
        {/* Left Panel */}
        <div className="w-full md:w-[45%] bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-4">
          <label
            htmlFor="fileUpload"
            className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:opacity-90 transition"
          >
            <Upload className="w-5 h-5" /> Choose Image
          </label>


          <input
            type="file"
            id="fileUpload"
            accept=".jpg,.jpeg,.png"
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* <label>EnterName:</label>
          <input name = "name" type = "text" onChange = {Change} value = {name}/>
          <button onClick = {upload}> hi  </button> */}

          <button
            disabled={loading || !data}
            className={`w-full py-3 text-white font-semibold rounded-lg transition duration-300 ${
              loading || !data
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-500 hover:to-blue-600 shadow-lg hover:scale-105"
            }`}
             onClick={result}
          >
            {loading ? "Processing..." : "Update Inventory"}
          </button>
        </div>

        {/* Right Panel - Data Table */}
        <div className="w-full md:w-[50%] bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            📋 Parsed Receipt Items
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100 text-gray-800">
                <tr>
                  <th className="p-2 border">Quantity</th>
                  <th className="p-2 border">Item</th>
                  <th className="p-2 border">Unit Price</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data) && data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={index} className="text-center text-gray-700 even:bg-gray-50">
                      <td className="p-2 border">{item.quantity}</td>
                      <td className="p-2 border">{item.item}</td>
                      <td className="p-2 border">{item.unitPrice}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center p-3 text-gray-500">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}


export default UploadReceipt;
