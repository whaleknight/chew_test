import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddAccountsModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'accounts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // DepartmentId:null,
                // DepartmentName:event.target.DepartmentName.value,
                userName: event.target.UserName1.value,
                initialBalance: event.target.InitialBalance1.value,
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(JSON.stringify(result));
            },
                (error) => {
                    alert('Failed');
                })
        fetch(process.env.REACT_APP_API + 'accounts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // DepartmentId:null,
                // DepartmentName:event.target.DepartmentName.value,
                userName: event.target.UserName2.value,
                initialBalance: event.target.InitialBalance2.value,
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            },
                (error) => {
                    alert('Failed');
                })
    }
    render() {
        return (
            <div className="container">

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Multiple Account
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="UserName1">
                                        <Form.Label>UserName1</Form.Label>
                                        <Form.Control type="text" name="UserName1" required
                                            placeholder="UserName1" />
                                    </Form.Group>

                                    <Form.Group controlId="InitialBalance1">
                                        <Form.Label>InitialBalance1</Form.Label>
                                        <Form.Control type="number" step="0.01" name="InitialBalance1" required
                                            placeholder="InitialBalance1" />
                                    </Form.Group>
                                    <Form.Group controlId="UserName2">
                                        <Form.Label>UserName2</Form.Label>
                                        <Form.Control type="text" name="UserName2" required
                                            placeholder="UserName2" />
                                    </Form.Group>

                                    <Form.Group controlId="InitialBalance2">
                                        <Form.Label>InitialBalance2</Form.Label>
                                        <Form.Control type="number" step="0.01" name="InitialBalance2" required
                                            placeholder="InitialBalance2" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Account
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }

}