import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment'

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddTransferModal } from './AddTransferModal';
import { AddTransfersModal } from './AddTransfersModal';

export class Transfer extends Component {

    constructor(props) {
        super(props);
        this.state = { emps: [], addModalShow: false, editModalShow: false }
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'accounts/transfers')
            .then(response => response.json())
            .then(data => {
                this.setState({ emps: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        // this.refreshList();
    }

    hardcodeTest() {
        Array(5).fill(0).forEach(() => fetch("https://localhost:5001/api/accounts/transfer", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                "sourceAccountId": 1,
                "DestinationAccountId": 2,
                "transferAmount": 10.00
            })
        }));
        Array(5).fill(0).forEach(() => fetch("https://localhost:5001/api/accounts/transfer", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                "sourceAccountId": 2,
                "DestinationAccountId": 1,
                "transferAmount": 10.00
            })
        }));
    }
    render() {
        const { emps } = this.state;
        // let addModalClose = () => this.setState({ addModalShow: false });
        // let addModal2Close = () => this.setState({ addModal2Show: false });
        let addModalClose = () => {
            this.setState({ addModalShow: false });
            this.refreshList();
        }
            ;
        let addModal2Close = () => {
            this.setState({ addModal2Show: false });
            this.refreshList();
        }
            ;
        return (
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Source Id</th>
                            <th>Destination Id</th>
                            <th>Transfer Amount</th>
                            <th>Transaction Date Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp =>
                            <tr key={emp.transactionId}>
                                <td>{emp.transactionId}</td>
                                <td>{emp.sourceAccountId}</td>
                                <td>{emp.destinationAccountId}</td>
                                <td>{emp.transferAmount}</td>
                                <td>{moment(emp.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>

                                {/* <td>{emp.createdAt}</td> */}


                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}>
                        Add Transfer</Button>

                    <AddTransferModal show={this.state.addModalShow}
                        onHide={addModalClose} />

                    <br />

                    <Button variant='primary'
                        onClick={() => this.setState({ addModal2Show: true })}>
                        Add Multiple Transfer</Button>

                    <AddTransfersModal show={this.state.addModal2Show}
                        onHide={addModal2Close} />

                    <br />

                    <Button variant='primary'
                        onClick={() => this.hardcodeTest()}>
                        HardCoded condition given </Button>
                </ButtonToolbar>
            </div>
        )
    }
}