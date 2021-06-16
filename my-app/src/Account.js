import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddAccountModal } from './AddAccountModal';
import { AddAccountsModal } from './AddAccountsModal';

export class Account extends Component {

    constructor(props) {
        super(props);
        this.state = { deps: [], addModalShow: false, editModalShow: false }
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'accounts')
            .then(response => response.json())
            .then(data => {
                this.setState({ deps: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        // this.refreshList();
    }

    render() {
        const { deps } = this.state;
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
                            <th>User Name</th>
                            <th>Initial Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep =>
                            <tr key={dep.id}>
                                <td>{dep.id}</td>
                                <td>{dep.userName}</td>
                                <td>{dep.initialBalance}</td>
                                <td>
                                    {/* <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                depid: dep.DepartmentId, depname: dep.DepartmentName
                                            })}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.deleteDep(dep.DepartmentId)}>
                                            Delete
                                        </Button>

                                        <EditDepModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            depid={depid}
                                            depname={depname} />
                                    </ButtonToolbar> */}

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}>
                        Add Account</Button>

                    <AddAccountModal show={this.state.addModalShow}
                        onHide={addModalClose} />

                    <br />

                    <Button variant='primary'
                        onClick={() => this.setState({ addModal2Show: true })}>
                        Add Multiple Account</Button>

                    <AddAccountsModal show={this.state.addModal2Show}
                        onHide={addModal2Close} />
                </ButtonToolbar>

            </div>
        )
    }
}