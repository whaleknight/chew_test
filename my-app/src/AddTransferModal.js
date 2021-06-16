import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddTransferModal extends Component {
    constructor(props) {
        super(props);
        this.state = { deps: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    photofilename = "anonymous.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH + this.photofilename;

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
                sourceAccountId: event.target.SourceAccountId.value,
                destinationAccountId: event.target.DestinationAccountId.value,
                transferAmount: event.target.TransferAmount.value,
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
                            Transfer
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="SourceAccountId">
                                        <Form.Label>SourceAccountId</Form.Label>
                                        <Form.Control as="select">
                                            {this.state.deps.map(dep =>
                                                <option key={dep.id}>{dep.id}</option>)}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="DestinationAccountId">
                                        <Form.Label>DestinationAccountId</Form.Label>
                                        <Form.Control as="select">
                                            {this.state.deps.map(dep =>
                                                <option key={dep.id}>{dep.id}</option>)}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="TransferAmount">
                                        <Form.Label>TransferAmount</Form.Label>
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