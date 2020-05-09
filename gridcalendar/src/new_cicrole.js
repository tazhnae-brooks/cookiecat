import React, { Component } from 'react';
// import { IconSettings, DataTable, DataTableColumn, DataTableCell, Input } from '@salesforce/design-system-react';
// import { Dropdown } from '@salesforce/design-system-react'
import './style.css';
const moment = require("moment")

var toUpdate = {
    // 'gene': {
    //     'row': [],
    //     'column': [],
    // }
}

//child to <Save/>
class TableCell extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            row: this.props.row,
            column: this.props.column
        };
    }

    handleChange(e) {
        var name = this.state.name = e.target.value
        console.log("Value: " + this.state.name)
        console.log("Row: " + this.props.row)
        console.log("Column: " + this.props.column)
    }

    handleSave() {
        // if (!e.currentTarget.contains(e.relatedTarget)) {
        //     var name = this.state.name
        //     if (name in toUpdate) {
        //         toUpdate[name]['row'].push(this.state.row)
        //         toUpdate[name]['column'].push(this.state.column)
        //     } else {
        //         toUpdate[name] = {
        //             'row': [this.state.row],
        //             'column': [this.state.column]
        //         }
        //     }
        //     console.log("TO UPDATE FROM TABLE CELL")
        //     console.log(toUpdate)
        // }

    }

    render() {
        return (
            <th data-row={this.props.row} data-column={this.props.column} scope="row">
                <div class="slds-form-element">
                    <div class="slds-form-element__control">
                        <input type="text" class="slds-input" value={this.state.name} onChange={e => this.handleChange(e)} />
                    </div>
                </div>
            </th>
        )
    }
}

class TableRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [
                <TableCell row={this.props.row} column='1'></TableCell>,
                <TableCell row={this.props.row} column='2'></TableCell>,
                <TableCell row={this.props.row} column='3'></TableCell>,
                <TableCell row={this.props.row} column='4'></TableCell>,
                <TableCell row={this.props.row} column='5'></TableCell>,
                <TableCell row={this.props.row} column='6'></TableCell>,
                <TableCell row={this.props.row} column='7'></TableCell>,
                <TableCell row={this.props.row} column='8'></TableCell>,
                <TableCell row={this.props.row} column='9'></TableCell>,
                <TableCell row={this.props.row} column='10'></TableCell>,
                <TableCell row={this.props.row} column='11'></TableCell>,
                <TableCell row={this.props.row} column='12'></TableCell>
            ]
        };
    }

    render() {
        return (
            <tr class="slds-hint-parent">
                {this.state.columns}
            </tr>
        )
    }
}


//parent to <TableCell/>
class Save extends Component {
    constructor(props) {
        super(props)
        this.child = React.createRef()
    }


    //query setup to save in database
    save = () => {
        // console.log("pp")
        // let date = document.getElementById("date").getAttribute("data-day")
        // let formatDate = moment(date).format("YYYY-MM-DD");

        // console.log("TO UPDATE FROM SAVE")
        // console.log(toUpdate)
    }


    render() {
        return (
            <div>
                {/* <button class="slds-button slds-button_neutral" onClick={this.props.triggerConsole} >Save</button> */}
                <button class="slds-button slds-button_neutral" onClick={this.save.bind(this)} >Save</button>

            </div>
        )
    }
}

class RoleTable2 extends React.Component {
    static displayName = 'Grid';

    constructor(props) {
        super(props)
        this.state = {
            rows: [
                <TableRow row='1'></TableRow>,
                <TableRow row='2'></TableRow>,
                <TableRow row='3'></TableRow>,
                <TableRow row='4'></TableRow>,
                <TableRow row='5'></TableRow>,
                <TableRow row='6'></TableRow>,
                <TableRow row='7'></TableRow>,
                <TableRow row='8'></TableRow>,
                <TableRow row='9'></TableRow>,
                <TableRow row='10'></TableRow>,
                <TableRow row='11'></TableRow>,
                <TableRow row='12'></TableRow>,
                <TableRow row='13'></TableRow>,
                <TableRow row='14'></TableRow>,
                <TableRow row='15'></TableRow>,
                <TableRow row='16'></TableRow>,
                <TableRow row='17'></TableRow>,
                <TableRow row='18'></TableRow>,
                <TableRow row='19'></TableRow>,
                <TableRow row='20'></TableRow>,
                <TableRow row='21'></TableRow>,
                <TableRow row='22'></TableRow>,
                <TableRow row='23'></TableRow>,
                <TableRow row='24'></TableRow>
            ]
        };
    }



    // do the for loop to get all the rows down where they supposed to be
    componentWillMount() {
        // for (var cellData = 1; cellData <= 24; cellData++) {
        //     cellData.push(
        //         {
        //             row: <TableRow />
        //         }
        //         // <TableRow />
        //         // console.log("pp")
        //     )
        // }
    }



    render() {
        return (
            <div>
                <div>
                    {/* <button class="slds-button slds-button_neutral" onClick={this.save.bind(this)}>Save</button> */}
                    <Save />
                </div>
                <table class="slds-table slds-table_bordered">

                    <thead>
                        <tr class="slds-line-height_reset">
                            <th class="" scope="col">
                                <div class="slds-truncate" title="Column 3">UTC</div>
                            </th>
                            <th class="" scope="col">
                                <div class="slds-truncate" title="Column 1">Multi IC - IC</div>
                            </th>
                            <th class="" scope="col">
                                <div class="slds-truncate" title="Column 2">Multi IC - BO</div>
                            </th>
                            <th class="" scope="col">
                                <div class="slds-truncate" title="Column 3">Multi IC - LNO</div>
                            </th>
                            <th class="" scope="col">
                                <div class="slds-truncate" title="Column 3">Multi IC - Scribe</div>
                            </th>
                            <th class="" scope="col">
                                <div class="slds-truncate" title="Column 3">Multi IC - OR</div>
                            </th>
                            <th class="" scope="col">
                                <div class="slds-truncate" title="Column 3">Single - IC</div>
                            </th>
                            <th class="" scope="col">
                                <div class="slds-truncate" title="Column 3">Single - Ex Esc</div>
                            </th>
                            <th class="" scope="col">
                                <div class="slds-truncate" title="Column 3">UC - Pri</div>
                            </th>
                            <th class="" scope="col">
                                <div class="slds-truncate" title="Column 3">UC - Sec</div>
                            </th>
                            <th class="" scope="col">
                                <div class="slds-truncate" title="Column 3">Ecomm - Pri</div>
                            </th>
                            <th class="" scope="col">
                                <div class="slds-truncate" title="Column 3">Ecomm Sec</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.rows}
                    </tbody>
                </table>
            </div>
        );
    }
}


export default RoleTable2;