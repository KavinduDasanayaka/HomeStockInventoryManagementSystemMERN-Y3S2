import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {FaSearch} from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function GroceryList() {
  const { currentUser } = useSelector((state) => state.user);
  const [itemHistory, setItemHistory] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  
  // Combined search state
  const [searchTerm, setSearchTerm] = useState('');
  
  // Report modal state
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  useEffect(() => {
    // Filter items whenever search criteria or itemHistory changes
    filterItems();
  }, [searchTerm, itemHistory]);

  const fetchData = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/itemlistings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setItemHistory(data);
      setFilteredItems(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const filterItems = () => {
    if (!searchTerm.trim()) {
      setFilteredItems([...itemHistory]);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const results = itemHistory.filter(item => 
      item.name.toLowerCase().includes(term) || 
      item.place.toLowerCase().includes(term)
    );
    
    setFilteredItems(results);
  };

  const handleDeleteConfirmation = (groceryId) => {
    setDeleteId(groceryId);
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
  };

  const handleGroceryDelete = async () => {
    try {
      const res = await fetch(`/api/item/delete/${deleteId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        return;
      }

      setItemHistory((prev) => prev.filter((grocery) => grocery._id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleReport = () => {
    setShowReport(!showReport);
  };

  // Function to generate a report summary
  const generateReportSummary = () => {
    const totalItems = itemHistory.length;
    const categoryCounts = {};
    const placeCounts = {};
    
    itemHistory.forEach(item => {
      // Count by category
      if (categoryCounts[item.category]) {
        categoryCounts[item.category]++;
      } else {
        categoryCounts[item.category] = 1;
      }
      
      // Count by place
      if (placeCounts[item.place]) {
        placeCounts[item.place]++;
      } else {
        placeCounts[item.place] = 1;
      }
    });
    
    return { totalItems, categoryCounts, placeCounts };
  };

  // Function to export items as CSV
  const exportToCSV = () => {
    // Create headers
    const headers = ["Name", "Quantity", "Place", "Category", "Remind Date"];
    
    // Format the data
    const csvData = itemHistory.map(item => [
      item.name,
      item.quantity,
      item.place,
      item.category,
      new Date(item.date).toLocaleDateString()
    ]);
    
    // Add headers to the beginning
    csvData.unshift(headers);
    
    // Convert to CSV format
    const csvContent = csvData.map(row => row.join(",")).join("\n");
    
    // Create a download link
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "items_report.csv");
    document.body.appendChild(link);
    
    // Trigger download and remove link
    link.click();
    document.body.removeChild(link);
  };

  // Function to export items as PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text("Home Stock Management System", 14, 22);
    
    // Add current date
    doc.setFontSize(11);
    doc.text(`Report generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    
    // Generate summary statistics
    const { totalItems, categoryCounts, placeCounts } = generateReportSummary();
    doc.setFontSize(14);
    doc.text(`Total Items: ${totalItems}`, 14, 40);
    
    // Generate the table
    const tableColumn = ["Name", "Quantity", "Place", "Category", "Remind Date"];
    const tableRows = itemHistory.map(item => [
      item.name,
      item.quantity,
      item.place,
      item.category,
      new Date(item.date).toLocaleDateString()
    ]);
    
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 50,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [81, 120, 145] },
      alternateRowStyles: { fillColor: [240, 240, 240] }
    });
    
    // Add category breakdown
    const categoryStartY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text("Items by Category", 14, categoryStartY);
    
    const categoryData = Object.entries(categoryCounts).map(([category, count]) => [category, count]);
    doc.autoTable({
      head: [["Category", "Count"]],
      body: categoryData,
      startY: categoryStartY + 5,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [81, 120, 145] }
    });
    
    // Add place breakdown
    const placeStartY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text("Items by Place", 14, placeStartY);
    
    const placeData = Object.entries(placeCounts).map(([place, count]) => [place, count]);
    doc.autoTable({
      head: [["Place", "Count"]],
      body: placeData,
      startY: placeStartY + 5,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [81, 120, 145] }
    });
    
    // Save the PDF
    doc.save("item_borrowing_and_lending_report.pdf");
  };

  // Calculate report data if report is showing
  const reportData = showReport ? generateReportSummary() : null;

  return (
    <div className='px-10'>
      <h1 className='text-3xl text-center font-semibold my-7 text-[#0F0E47]'>Borrowed And Lent Items List</h1>
      
      {/* Search and Action Buttons */}
      <div className="mb-7">
      <div className="relative w-full ">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search by name or place..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 pl-10 border border-[#517891] rounded focus:outline-none"
      />
    </div>
          
    
        <div className="flex justify-between mt-4">
          <div>
            <button 
              onClick={toggleReport} 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
            >
              {showReport ? "Hide Report" : "Show Report"}
            </button>
            <button 
              onClick={exportToCSV} 
              className="bg-purple-600 text-white px-4 py-2 rounded-lg mr-2"
            >
              Export CSV
            </button>
            <button 
              onClick={exportToPDF} 
              className="bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              Export PDF
            </button>
          </div>
          <Link to="/create-item-list">
            <button className="bg-green-700 text-white px-4 py-2 rounded-lg">Add Items</button>
          </Link>
        </div>
      </div>
      
      {/* Report Section */}
      {showReport && (
        <div className="bg-[#517891] p-4 mb-8 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-3">Items Report Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-bold text-lg pb-4">Total Items</h3>
              <p className="text-4xl font-bold text-blue-600">{reportData.totalItems}</p>
            </div>
            
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-bold text-lg pb-4">Items by Category</h3>
              <ul>
                {Object.entries(reportData.categoryCounts).map(([category, count]) => (
                  <li key={category} className="flex justify-between border-b py-1">
                    <span>{category}</span>
                    <span className="font-semibold">{count}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-bold text-lg pb-2">Items by Place</h3>
              <ul>
                {Object.entries(reportData.placeCounts).map(([place, count]) => (
                  <li key={place} className="flex justify-between border-b py-1">
                    <span>{place}</span>
                    <span className="font-semibold">{count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Items Table */}
      <table className="w-full border-2 border-[#77b1d4]">
        <thead>
          <tr className="bg-[#517891] text-white text-left">
            <th className="border border-[#517891] px-4 py-2">Name</th>
            <th className="border border-[#517891] px-4 py-2">Quantity</th>
            <th className="border border-[#517891] px-4 py-2">Place</th>
            <th className="border border-[#517891] px-4 py-2">Category</th>  
            <th className="border border-[#517891] px-4 py-2">Remind Date</th>  
            <th className="border border-[#517891] px-4 py-2">Edit</th>  
            <th className="border border-[#517891] px-4 py-2">Delete</th>  
          </tr>
        </thead>

        <tbody>
          {filteredItems.length > 0 ? (
            filteredItems.map((elem, index) => (
              <tr key={index} className='bg-[#77b1d4] text-black'>
                <td className='border-b-2 border-b-[#77b1d4] px-4 py-2'>{elem.name}</td>
                <td className='border-b-2 border-b-[#77b1d4] px-4 py-2'>{elem.quantity}</td>
                <td className='border-b-2 border-b-[#77b1d4] px-4 py-2'>{elem.place}</td>
                <td className='border-b-2 border-b-[#77b1d4] px-4 py-2'>{elem.category}</td>
                <td className='border-b-2 border-b-[#77b1d4] px-4 py-2'>
                  {new Date(elem.date).toLocaleDateString()}
                </td>
                <td className='border-b-2 border-b-[#77b1d4] px-4 py-2 text-center'>
                  <Link to={`/update-item-list/${elem._id}`}>
                    <button className="bg-green-700 flex text-white px-3 py-1 rounded-lg">Edit</button>
                  </Link>
                </td>
                <td className='border-b-2 border-b-[#77b1d4] px-4 py-2 text-center'>
                  <button 
                    onClick={() => handleDeleteConfirmation(elem._id)}
                    className="bg-red-700 flex text-white px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4">
                No items found matching your search criteria
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listings' : ''}
      </p>

      {/* Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg text-center">
            <p className="text-xl mb-4">Are you sure you want to delete this item?</p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={handleGroceryDelete}
                className="bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                OK
              </button>
              <button 
                onClick={handleCancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}