import React, { Component } from "react";
import ReactTable from 'react-table';
import { cols, colsData } from './tableHeader'
import { months } from "../Utils";
import "react-table/react-table.css";
import _ from 'lodash';

export class DataTable extends Component {
  constructor(props){
    super(props);
    this.state={
      CustUpdate: [], 
      CustPointsVal:[] 
    }
  }
  getMonths=()=>{
    const startMonth = this.props.selectedMonth;
    const endMonth = parseInt(startMonth) > 9 ? 11 : parseInt(startMonth) + 2;
    const _months = [];
    for(let i = startMonth; i<=endMonth; i++){
      _months.push(months[i])
    }
    return _months.join(', ')
  }

  updateTrans = (row) => {
    return _.filter(this.state.CustPointsVal, (val) => row.original.id === val.id);
  }
  setData = (newProps)=>{
    this.setState({
      CustUpdate: newProps.CustUpdate,
      CustPointsVal: newProps.CustPointsVal
    })
  }
  UNSAFE_componentWillReceiveProps(newProps){
    this.setState({
      CustUpdate: [], 
      CustPointsVal: [] 
    },()=>{ 
      this.setData(newProps.data)
    })
  }

  render() {
    return (
      <div>
        {!!this.state.CustUpdate.length ? (
          <>
            <h3>Reward data from <span className="months-label">{this.getMonths()}</span></h3>
            <ReactTable
              showPagination={false}
              data={this.state.CustUpdate}
              defaultPageSize={this.state.CustUpdate.length}
              columns={cols}
              SubComponent={row => {
                return (
                  <ReactTable
                    showPagination={false}
                    defaultPageSize={this.updateTrans(row).length}
                    data={this.updateTrans(row)}
                    columns={colsData} />
                )
              }}
            />
          </>
        ) : (
          <div className="title">
              <h3>No reward data from <span className="months-label">{this.getMonths()}</span>, please select a different month/user</h3>
          </div>
        )}
      </div>
    )
  }
}
