import React, { Component } from 'react';
import { IconSettings, DataTable, DataTableColumn, DataTableCell, Input } from '@salesforce/design-system-react';
import { Dropdown } from '@salesforce/design-system-react'
import './style.css';
const moment = require("moment")

class Names extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedInput: ''
		}
	}


	render() {
		return (
			<div>
				<div className="namedp">
					<IconSettings>
						<Dropdown
							align="right"
							iconCategory="utility"
							iconName="down"
							iconPosition="right"
							label="Team"
							width="small"
							onSelect={(selected) => {
								this.props.changed(selected.value);
							}}
							options={[
								{ label: 'AMER', type: 'header' },
								{ label: 'tazhnae', value: 'tazhnae' },
								{ label: 'jane', value: 'jane' },
								{ label: 'general kenobi', value: 'general kenobi' },
								{ label: 'steve irwin', value: 'steve irwin' },
								{ type: 'divider' },
								{ label: 'EMEA', type: 'header' },
								{ label: 'Menu Item Four', value: 'D0' },
								{ label: 'Menu Item Five', value: 'E0' },
								{ label: 'Menu Item Six', value: 'F0' },
								{ type: 'divider' },
								{ label: 'APAC', type: 'header' },
								{ label: 'Menu Item Seven', value: 'G0' },
							]}
						/>
						{this.state.selectedInput}
					</IconSettings>
				</div>
			</div>
		)
	}
}


const bigColumns = [
	<DataTableColumn key="" label="Multi" property="" width="5rem" />,
	<DataTableColumn key="" label="Single" property="" width="2rem" />,
	<DataTableColumn key="" label="UC" property="" width="2rem" />,
	<DataTableColumn key="" label="Ecomm" property="" width="2rem" />,

]

// make an input cell component
const CustomDataTableCell = ({ children, ...props }) => (
	<DataTableCell {...props}>
		<Input value={children}></Input>
	</DataTableCell>
);

// idk what this line does but it breaks if you remove it so dont touch it 
CustomDataTableCell.displayName = DataTableCell.displayName;

// define the columns
// key = anything, as long as it is unique
// label = what you want to show on the top bar
// property = the value used to match from the items (see items in state)
const columns = [
	<DataTableColumn key="time" label="UTC Time" property="time">
	</DataTableColumn>,
	<DataTableColumn key="1" label="Multi - IC" property="1">
		<CustomDataTableCell />
	</DataTableColumn>,
	<DataTableColumn key="2" label="Multi - BO" property="2">
		<CustomDataTableCell />
	</DataTableColumn>,
	<DataTableColumn key="3" label="Multi - LNO" property="3">
		<CustomDataTableCell />
	</DataTableColumn>,
	<DataTableColumn key="4" label="Multi - Scribe" property="4">
		<CustomDataTableCell />
	</DataTableColumn>,
	<DataTableColumn key="5" label="Multi - OR" property="5">
		<CustomDataTableCell />
	</DataTableColumn>,
	<DataTableColumn key="6" label="Single - IC" property="6">
		<CustomDataTableCell />
	</DataTableColumn>,
	<DataTableColumn key="7" label=" Single - Ex Esc" property="7">
		<CustomDataTableCell />
	</DataTableColumn>,
	<DataTableColumn key="8" label="UC - Pri" property="8">
		<CustomDataTableCell />
	</DataTableColumn>,
	<DataTableColumn key="9" label="UC - Sec" property="9">
		<CustomDataTableCell />
	</DataTableColumn>,
	<DataTableColumn key="10" label="Ecomm - Pri" property="10">
		<CustomDataTableCell />
	</DataTableColumn>,
	<DataTableColumn key="11" label="Ecomm - Sec" property="11">
		<CustomDataTableCell />
	</DataTableColumn>,
];

class RoleTable extends React.Component {
	static displayName = 'Grid';

	constructor(props) {
		super(props)
		// there are 2 values that are pretty obvious, row and time
		// the rest (1, 2, 3, etc..) correspond to the COLUMN
		// each object in this.items correspond to a ROW
		// each ROW has 12 COLUMNS
		// we're now going by 'row':'col', will need DB changes but dont worry about it yet
		this.state = {
			items: [],
		};
	}

	// do the for loop to get all the rows down where they supposed to be
	componentWillMount() {
		for (var rows = 1, time = moment("00:30", "HH:mm"); rows <= 24; rows++, time = moment(time).add(1, "h")) {
			this.state.items.push(
				{
					"row": rows,
					"time": time.format("HH:mm"),
					"1": null,
					"2": null,
					"3": null,
					"4": null,
					"5": null,
					"6": null,
					"7": null,
					"8": null,
					"9": null,
					"10": null,
					"11": null,
					"12": null,
				}
			)
		}
	}


	async handleSelectChange(value) {
		let date = document.getElementById("date").getAttribute("data-day")
		let formatDate = moment(date).format("YYYY-MM-DD");
		console.log(formatDate);
		const response = await fetch(`/query?name=${value}&date=${formatDate}`);
		const body = await response.json();
		if (response.status !== 200) {
			throw Error(body.message)
		}
		this.handleNameData(body.data[0]);


	}


	handleNameData(data) {
		data.x.forEach((row, index) => {
			let rowCopy = this.state.items[parseInt(row) - 1]
			rowCopy[data.y[index]] = data.name
			console.log(rowCopy)
			this.state.items.splice(parseInt(row) - 1, 1)
			this.state.items = [rowCopy, ...this.state.items]

		})
		//sort the columns/rows back
		this.state.items.sort(function (x, y) {
			if (x.row < y.row) {
				return -1
			}
			if (x.row > y.row) {
				return 1
			}
			return 0
		})
		this.setState({
			items: this.state.items
		})
	}

	handleClick() {
		let date = document.getElementById("date").getAttribute("data-day")
		let formatDate = moment(date).format("YYYY-MM-DD");
		// console.log("h2o")
		console.log("water")
	}


	async save() {
		console.log(this.state.items)
		let date = document.getElementById("date").getAttribute("data-day")
		let formatDate = moment(date).format("YYYY-MM-DD");
		// const response = await fetch('/query_save', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: {
		// 		items: this.state.items,
		// 		date: date
		// 	}
		// });
		fetch('/query_save', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				items: this.state.items,
				date: date
			})
		})
		// const body = await response.json();
		// if (response.status !== 200) {
		// 	throw Error(body.message)
		// }
	}


	render() {
		return (
			<IconSettings iconPath="/assets/icons">
				<Names
					changed={this.handleSelectChange.bind(this)}
				></Names>
				<button class="slds-button slds-button_neutral" onClick={this.save.bind(this)}>Save</button>
				<div style={{ overflow: 'auto' }}>
					<DataTable columnBordered>
						{bigColumns}
					</DataTable>
					<DataTable columnBordered items={this.state.items} id="Grid-columnBordered" noRowHover>
						{columns}
					</DataTable>
				</div>
			</IconSettings>
		);
	}
}


export default RoleTable;