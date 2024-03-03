import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const CustomerTable = () => {
  const [data , setData] = useState([])
  const [sort, setSort] = useState();
  const [search, setSearch] = useState();
  const [page, setPage] = useState(1);
  let totalpages;

  // useEffect(() => {
  //   const getInfo = async () => {

  //     const respo = await axios.get(
  //       `http://localhost:5000/api/customers`
  //     );
  //     const backenddate = await respo.data.rows;
  //     console.log(backenddate);
  //     setData(backenddate);
      
  //   };
  //   getInfo();
  // }, []);
useEffect(() => {
  const getInfo = async () => {

    const respo = await axios.get(
      `http://localhost:5000/api/customers`,  {
        params: { page, limit: 20, search , sort :  sort } 
      }
    );
    const backenddate = await respo.data;
    totalpages = backenddate.total / 20
    setData(backenddate.rows);
  };
  getInfo()
}, [search, sort , page]
)



  const handleSortByDate = () => {
    setSort('date');
  };

  const handleSortByTime = () => {
    setSort('time');
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleNext = () => {
    if(page + 1 < 4){
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0 && page - 1 > 0 ) {
      setPage(page - 1);
    }
  };

  return (
  <>
   <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Customer Data</h2>
      <div className="mb-4">
        <input
          onChange={handleSearch}
          name="search"
          placeholder="Search name or location"
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <button onClick={handleSortByDate} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Sort by Date</button>
        <button onClick={handleSortByTime} className="bg-blue-500 text-white px-4 py-2 rounded">Sort by Time</button>
      </div>
      <table className="w-full border border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">sno</th>
            <th className="border px-4 py-2">Customer Name</th>
            <th className="border px-4 py-2">Age</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Location</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((customer, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{customer.sno}</td>
              <td className="border px-4 py-2">{customer.customer_name}</td>
              <td className="border px-4 py-2">{customer.age}</td>
              <td className="border px-4 py-2">{customer.phone}</td>
              <td className="border px-4 py-2">{customer.location}</td>
              <td className="border px-4 py-2">{customer.created_at.split('T')[0]}</td>
              <td className="border px-4 py-2">{customer.created_at.split('T')[1].split('.')[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <button onClick={handlePrev} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Prev</button>
        <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </div>
  </>
  );
};

export default CustomerTable;
