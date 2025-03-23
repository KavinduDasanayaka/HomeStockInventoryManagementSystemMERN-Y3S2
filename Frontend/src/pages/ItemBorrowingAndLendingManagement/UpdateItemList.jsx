import React from 'react'

export default function UpdateItemList() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 text-[#0F0E47]">
        Update Grocery Item
      </h1>
    <form className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          required
          className="border p-3 rounded-lg"
        />
        
        <input
          type="text"
          name="quantity"
          placeholder="Quantity"
          required
          className="border p-3 rounded-lg"
        />
        
        <input
          type="text"
          name="place"
          placeholder="Place"
          required
          className="border p-3 rounded-lg"
        />
        
        <input
          type="date"
          name="date"
          placeholder="Date"
          required
          className="border p-3 rounded-lg"
        />

        <div className="">
          <label className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="borrow"
                name="category"
                value="borrow"
                className="mr-2"
              />
              <label htmlFor="borrow">Borrow</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="lent"
                name="category"
                value="lent"
                className="mr-2"
              />
              <label htmlFor="lent">Lent</label>
            </div>
          </div>
        </div>
            
        <button
          type="submit"
          className=" bg-green-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          Update Item
          
        </button>
        
      </form>
      </div>
  )
}
