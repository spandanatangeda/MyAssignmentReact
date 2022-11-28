import React, { useState, useEffect } from "react";
import fetch from '../api/myService';
import {DataTable} from './DataTable'
import "./App.css";

const App = () => {
  const [value, setValue] = useState(null);
  useEffect(() => { 
    fetch().then((value)=> {             
      const info = PageData(value);      
      setValue(info);
    });
  },[]);

  if (value == null) {
    return <div>Updating...!</div>;   
  }

  return <div>   
      <div>
        <div className="myTable">
          <div>
            <DataTable
             data={value}
               />             
            </div>
          </div>
        </div>     
    </div>
  ;
}

const valueTotal = (cusData, CustPoints) => {
  let summary = [];
  for (let item in cusData) {    
    cusData[item].forEach(cRow=> {
      cRow.CustPoints = CustPoints[item];
      summary.push(cRow);
    });    
  }
  return summary;
}
const PageData = (value) => {
  const CustPointsVal = value.map(trans=> {
    let points = PointsCalculate(trans.amt);
    const month = new Date(trans.transDate).getMonth();
    return {...trans, points, month};
  });
  let cusData = {};
  let CustPoints = {};
  CustPointsVal.forEach(CustPointsVal => {
    let {id, name, month, points, transDate} = CustPointsVal;   
    if (!cusData[id]) {
      cusData[id] = [];      
    }    
    if (!CustPoints[id]) {
      CustPoints[id] = 0;
    }
   
    CustPoints[id] += points;
    
    if (cusData[id][month]) {
      cusData[id][month].points += points;
      cusData[id][month].monthNumber = month;
      cusData[id][month].numTransactions++;      
    } else {
      cusData[id][month] = {
        id,
        name,
        month:new Date(transDate).toLocaleString('en-us',{month:'long'}),
        numTransactions: 1,        
        points
      }
    }    
  });
  
  return {
    CustUpdate: valueTotal(cusData, CustPoints),
    CustPointsVal
  };
}

const PointsCalculate = (val) => {
  let points = 0;
  if (val > 100) {    
    points = 2*(val-100)+50;
  } else if (val > 50 && val<=100) {
    points = val - 50;      
  }
  else{
    points = 0;
  }
  return points;
}



export default App;
