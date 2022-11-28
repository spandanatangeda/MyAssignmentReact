import React,{Component} from "react";
import ReactTable from 'react-table';
import {cols,colsData} from './condition'
import "react-table/react-table.css";  
import _ from 'lodash';
export class DataTable extends Component{
      updateTrans = (row) => {
        let dataUp = _.filter(this.props.data.CustPointsVal, (val)=>{    
          return row.original.id === val.id && row.original.monthNumber === val.month;
        });
        return dataUp;
      }
    render(){
        return(
            <div>
              <div>
              <h1>Points Rewarded</h1>
              </div>
            <ReactTable
              showPagination={false}
              data={this.props.data.CustUpdate}
              defaultPageSize={this.props.data.CustUpdate.length}
              columns={cols}
              SubComponent={row => {
                return (
                      <ReactTable
                      showPagination={false}
                      defaultPageSize={this.updateTrans(row).length}
                      data={this.updateTrans(row)}
                      columns={colsData}/>
                )
              }}
              />  
            </div> 
        )
    }
}
