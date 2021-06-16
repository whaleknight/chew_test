import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddTransfersModal extends Component {
    constructor(props) {
        super(props);
        this.state = { deps: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API + 'accounts')
            .then(response => response.json())
            .then(data => {
                this.setState({ deps: data });
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'accounts/transfer', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sourceAccountId: event.target.SourceAccountId1.value,
                destinationAccountId: event.target.DestinationAccountId1.value,
                transferAmount: event.target.TransferAmount1.value,
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(JSON.stringify(result));
            },
                (error) => {
                    alert('Failed');
                })

        fetch(process.env.REACT_APP_API + 'accounts/transfer', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sourceAccountId: event.target.SourceAccountId2.value,
                destinationAccountId: event.target.DestinationAccountId2.value,
                transferAmount: event.target.TransferAmount2.value,
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
                            Transfers
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="SourceAccountId1">
                                        <Form.Label>SourceAccountId1</Form.Label>
                                        <Form.Control as="select">
                                            {this.state.deps.map(dep =>
                                                <option key={dep.id}>{dep.id}</option>)}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="DestinationAccountId1">
                                        <Form.Label>DestinationAccountId1</Form.Label>
                                        <Form.Control as="select">
                                            {this.state.deps.map(dep =>
                                                <option key={dep.id}>{dep.id}</option>)}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="TransferAmount1">
                                        <Form.Label>TransferAmount1</Form.Label>
                                        <Form.Control type="number" step="0.01" name="TransferAmount" required
                                            placeholder="TransferAmount" />
                                    </Form.Group>

                                    <br/>
                                    
                                    <Form.Group controlId="SourceAccountId2">
                                        <Form.Label>SourceAccountId2</Form.Label>
                                        <Form.Control as="select">
                                            {this.state.deps.map(dep =>
                                                <option key={dep.id}>{dep.id}</option>)}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="DestinationAccountId2">
                                        <Form.Label>DestinationAccountId2</Form.Label>
                                        <Form.Control as="select">
                                            {this.state.deps.map(dep =>
                                                <option key={dep.id}>{dep.id}</option>)}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="TransferAmount2">
                                        <Form.Label>TransferAmount2</Form.Label>
                                        <Form.Control type="number" step="0.01" name="TransferAmount" required
                                            placeholder="TransferAmount" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Submit
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