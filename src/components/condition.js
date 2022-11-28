import React from "react";
export const cols = [
    {
      Header:'Customer',
      accessor: 'name',     
      Cell: row => <div>{row.value}</div>
    },    
    {
      Header:'Month',
      accessor: 'month',
      Cell: row => <div>{row.value}</div>
    },
    {
      Header: "Num of Transactions",
      accessor: 'numTransactions',
      Cell: row => <div>{row.value}</div>
    },
    {
      Header:'Reward Points',
      accessor: 'points',
      Cell: row => <div>{row.value}</div>
    },
    {
        Header:'Total Rewards',
        accessor: 'CustPoints',
        Cell: row => <div>{row.value}</div>
      }
  ];

  export const colsData = [
    {
        Header:'Transaction Date',
        accessor:'transDate',
        Cell: row => <div>{row.value}</div>
    },
    {
        Header:'Amount',
        accessor:'amt',
        Cell: row => <div>{row.value}</div>
     },
     {
         Header:'Points',
         accessor:'points',
         Cell: row => <div>{row.value}</div>
     }

];