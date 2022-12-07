import React, { useState, useEffect } from "react";
import { getTransactions, getCustomers } from '../api/myService';
import {DataTable} from './DataTable'
import { getTableData, months } from './../Utils'
import "./App.css";

const App = () => {
  const [rewardData, setRewardDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [tableData, setTableData] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState();

  // Filter based on the month change
  const handleOptionChange=({target:{value}})=>{
    setSelectedMonth(value)
    // const filterValue = getTableData(rewardData, value)
    let filterValue = [];
    if (selectedCustomer) {
      const _trasactionById = rewardData.filter(reward => parseInt(reward.id) === parseInt(selectedCustomer))
      filterValue = getTableData(_trasactionById, value)
    } else {
      filterValue = getTableData(rewardData, value)
    }
    setTableData(filterValue)
  }

  // Filter based on the selected Customer
  const handleCustomerChange=({target:{value}})=>{
    setSelectedCustomer(value);
    let filterValue=[];
    if(value){
      const _trasactionById = rewardData.filter(reward => parseInt(reward.id) === parseInt(value))
      filterValue = getTableData(_trasactionById, selectedMonth)
    }else{
      filterValue = getTableData(rewardData, selectedMonth)
    }
    setTableData(filterValue)
  }
  
  /*
      Hooks
  */
  useEffect(() => { 
    getTransactions().then((value)=> {             
      setRewardDate(value);
      const info = getTableData(value, selectedMonth);      
      setTableData(info)
    });

    getCustomers().then((response) => setCustomers(response));
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  if (tableData == null) {
    return <div>Updating...!</div>;   
  }
  return <div>   
      <div>
        <div className="myTable">
        <div className="title">
          <h1>Points Rewarded</h1>
        </div>
        <div className="select-option-container">
          <select className="select-options" name="month" value={selectedMonth} onChange={handleOptionChange}>
            {Object.keys(months).map((month) =>(
              <option value={month}key={month}>{months[month]}</option>
            ))}
          </select>
          <select className="select-options" name="customer" value={selectedCustomer} onChange={handleCustomerChange}>
            <option value="">All Customer</option>
            {customers.map((customer) =>(
              <option value={customer.id} key={customer.id}>{customer.customerName}</option>
            ))}
          </select>
        </div>
        <div>
            <DataTable data={tableData} selectedMonth={selectedMonth} />             
            </div>
          </div>
        </div>     
    </div>
  ;
}

export default App;
