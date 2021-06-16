import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddAccountModal extends Component {
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
                userName: event.target.UserName.value,
                initialBalance: event.target.InitialBalance.value,
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(JSON.stringify(result));
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
                            Add Account
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="UserName">
                                        <Form.Label>UserName</Form.Label>
                                        <Form.Control type="text" name="UserName" required
                                            placeholder="UserName" />
                                    </Form.Group>

                                    <Form.Group controlId="InitialBalance">
                                        <Form.Label>InitialBalance</Form.Label>
                                        <Form.Control type="number" step="0.01" name="InitialBalance" required
                                            placeholder="InitialBalance" />
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