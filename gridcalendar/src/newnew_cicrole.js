import React, { Component } from 'react';
// import { IconSettings, DataTable, DataTableColumn, DataTableCell, Input } from '@salesforce/design-system-react';
// import { Dropdown } from '@salesforce/design-system-react'
import './style.css';
import ReactDataGrid from 'react-data-grid';

// const moment = require("moment")


// const columns = [
//     { key: 'id', name: 'ID' },
//     { key: 'title', name: 'Title' },
//     { key: 'count', name: 'Count' }];

// const rows = [{ id: 0, title: 'row1', count: 20 }, { id: 1, title: 'row1', count: 40 }, { id: 2, title: 'row1', count: 60 }];

// function RoleTable3() {
//     return (<ReactDataGrid
//         columns={columns}
//         rowGetter={i => rows[i]}
//         rowsCount={3}
//         minHeight={150} />);
// }

class RoleTable3 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                { key: 'id', name: 'ID' },
                { key: 'title', name: 'Title' },
                { key: 'count', name: 'Count' }]
            ,
            rows: [{ id: 0, title: 'row1', count: 20 }, { id: 1, title: 'row1', count: 40 }, { id: 2, title: 'row1', count: 60 }]


        }
    }



    // componentWillMount() {
    //     let rows = 0
    //     while (rows < this.state.numberRows) {
    //         let columns = 1
    //         let newRow = [{ readOnly: true, x: 1, y: 1 }]
    //         while (columns < this.state.numberColumns) {
    //             newRow.push({ value: "" })
    //             columns++
    //         }
    //         this.state.grid.push(newRow)
    //         rows++
    //     }
    // }


    render() {
        return (
            <div>
                <ReactDataGrid
                    columns={this.state.columns}
                    rowGetter={i => this.state.rows[i]}
                    rowsCount={3}
                    minHeight={150}
                    rowsCount={this.state.rows.length}

                />
            </div>
        )
    }

}

export default RoleTable3;