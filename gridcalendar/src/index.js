import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RoleTable from './cicrole.js';
import Tiny from './petitecalendrier.js';
import Dates from './grandsemaine.js';


class Index extends Component {
    state = {
        data: null,
    };

    componentDidMount() {
        this.callBackendAPI()
            .then(res => this.setState({ data: res.mind }))
            .catch(err => console.log(err));
    }
    callBackendAPI = async () => {
        const response = await fetch('/express_backend');
        const body = await response.json();
        console.log(body);
        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    render() {
        return (

            <div>
                <div class="slds-grid slds-wrap" >
                    <div class="slds-col slds-size_1-of-12" >
                        <Tiny />
                    </div>
                </div>

                {/* date alignment box */}
                <div class="slds-grid slds-wrap" >
                    <div class="slds-col slds-size_4-of-12" ></div>
                    <div class="slds-col slds-size_4-of-12" ><Dates /></div>
                    <div class="slds-col slds-size_4-of-12" ></div>
                </div>
                <br />
                <div><RoleTable /></div>

                <p>{this.state.data}</p>
            </div >
        )
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));