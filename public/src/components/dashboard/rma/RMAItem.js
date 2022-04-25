import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardBody, CardHeader, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { getLanguageResources } from '../../../../../public/src/utils/language';
import { SUB_DOMAIN, setCorrectRmaStatusPossibilities } from "../../../../../public/src/utils/common";

import Spinner from '../../../../../public/src/components/elements/spinner/index';
import ClientInfo from './clientInfo';
import ProductInfo from './productInfo';
import AddNote from './AddNote';
import ManyProductStates from './ManyProductStates';

import './rma.css';

class RMAItem extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isFetchingData: false,
            items: [],
            activeTemplateIndex: 0,
            isOpenModal: false
        };

        this.progress = this.progress.bind(this);

        this.changeStatus = this.changeStatus.bind(this);
        this.changeMessage = this.changeMessage.bind(this);
        this.changeFile = this.changeFile.bind(this);

        this.updateRmaStatus = this.updateRmaStatus.bind(this);

        this.toggleModal = this.toggleModal.bind(this);
        this.saveManyItemsState = this.saveManyItemsState.bind(this);
    }

    componentDidMount () {
        if (!this.props.rma || this.props.rma.id !== this.props.match.params.id) {
            this.props.getActiveRMA(this.props.match.params.id, this.progress);
        } else if (this.props.rma.id) {
            this.progress();
        }
    }

    componentWillUnmount () {
        this.props.resetError();
    }

    progress () {
        const items = Object.keys(this.props.items).map(id => {
            let status = 0;
            if (this.props.items[id].notes.length) {
                status = Number(this.props.items[id].notes[this.props.items[id].notes.length - 1].status_id);
            }

            return { id, status, message: '', file: null, isUpdated: false };
        });

        this.setState({ isFetchingData: true, items });
    }

    updateRmaStatus () {
        this.setState({ isFetchingData: false });
        const { items } = this.state;

        let data = new window.FormData();
        for (let i = 0, len = items.length; i < len; i++) {
            let { file, message, status, id, isUpdated } = items[i];

            if (!isUpdated) {
                continue;
            }

            if (file && file.name) {
                data.append(`file-${id}`, file, file.name);
            }

            data.append(`message-${id}`, message);
            data.append(`status-${id}`, status);
            data.append(`itemRma-${id}`, id);
        }

        this.props.updateRmaItemStatus(data, () => this.props.history.push('/dashboard/rma/'), () => this.setState({ isFetchingData: true }));
    }

    changeFile (file, itemIndex) {
        this.setState({
            items: this.state.items.map((item, i) => {
                if (i === itemIndex) {
                    return { ...item, file, isUpdated: true };
                }
                return item;
            })
        });
    }

    changeMessage (message, itemIndex) {
        if (message.length > 1000) {
            return;
        }

        this.setState({
            items: this.state.items.map((item, i) => {
                if (i === itemIndex) {
                    return { ...item, message, isUpdated: true };
                }
                return item;
            })
        });
    }

    changeStatus (status, itemIndex) {
        this.setState({
            items: this.state.items.map((item, i) => {
                if (i === itemIndex) {
                    return { ...item, status, isUpdated: true };
                }
                return item;
            })
        });
    }

    toggleModal () {
        this.setState({ isOpenModal: !this.state.isOpenModal });
    }

    saveManyItemsState (items, state) {
        let statuses = this.state.items;

        for (let i = 0, len = items.length; i < len; i++) {
            let possibleStatus = setCorrectRmaStatusPossibilities(statuses[Number(items[i])].status);

            // check do is in array;
            for (let j = 0, jLen = possibleStatus.length; j < jLen; j++) {
                if (possibleStatus[j].id === state) {
                    statuses[Number(items[i])].status = Number(state);
                    statuses[Number(items[i])].isUpdated = true;
                }
            }
        }

        this.setState({ items: statuses });
    }

    render () {
        const { labels: { none, createDate, lastUpdate, items }, titles: { rmaItem }, buttons: { update, pdf } } = getLanguageResources();

        if (this.state.isFetchingData) {
            return (
                <Row>
                     <Col id='rma-item-page'>
                         <Card>
                             <CardHeader className='text-center card-header-first'>{rmaItem} {this.props.rma.id}</CardHeader>

                             <CardBody>
                                 <Card>
                                     <CardHeader className={'card-header-second'}>
                                         <Row>
                                             <Col sm={6} className='text-center font-italic'>
                                                 {createDate}: <strong>{this.props.rma.created_at}</strong>
                                             </Col>
                                             <Col sm={6} className='text-center font-italic'>
                                                 {lastUpdate}: <strong>{this.props.rma.updated_at}</strong>
                                             </Col>
                                         </Row>
                                         <Row>
                                             <Col className={'text-center font-italic'}>
                                                 {pdf}: <strong><a href={`${SUB_DOMAIN}/build/uploads/rma/${this.props.rma.pdf_file || ''}`} target={'_blank'}>PDF</a></strong>
                                             </Col>
                                         </Row>
                                     </CardHeader>
                                 </Card>

                                 <br />

                                 <ClientInfo client={this.props.rma.client} />

                                 <br />

                                 <Row>
                                     <Col className={'text-center'}>
                                        <Button
                                            onClick={this.toggleModal}
                                            color={'info'}
                                            style={{ width: '60%' }}>
                                            Edit Many States
                                        </Button>
                                     </Col>
                                 </Row>

                                 <Modal isOpen={this.state.isOpenModal} toggle={this.toggleModal}>
                                     <ModalHeader className={'text-center'} toggle={this.toggleModal}>Edit Many Items</ModalHeader>
                                     <ModalBody>
                                         <ManyProductStates
                                             changeStatus={this.saveManyItemsState}
                                             toggle={this.toggleModal}
                                             items={this.props.items} />
                                     </ModalBody>
                                     <ModalFooter />
                                 </Modal>

                                 <br />

                                 <Card>
                                     <CardHeader className='text-center card-header-second'>
                                         {items}
                                     </CardHeader>
                                     <CardBody>
                                         {this.state.items && this.state.items.map((item, i) => {
                                            const product = this.props.items[item.id];
                                            const itemStatus = product.notes.length ? Number(product.notes[product.notes.length - 1].status_id) : 0;
                                            return [
                                                <hr  key={item.id * 1000} />,
                                                <Card key={item.id}>
                                                    <CardHeader className='text-center card-header-third'>{product.Name} - {product.serialNumber}</CardHeader>
                                                    <CardBody>
                                                        <ProductInfo item={product} status={itemStatus} />
                                                        <br />
                                                        <AddNote
                                                            changeStatus={this.changeStatus}
                                                            changeMessage={this.changeMessage}
                                                            changeFile={this.changeFile}
                                                            item={item}
                                                            itemIndex={i}
                                                            status={itemStatus}
                                                            templates={[ { id: 0, title: none }, ...this.props.rma.templates ]} />
                                                    </CardBody>
                                                </Card>
                                             ];
                                         })}
                                     </CardBody>
                                 </Card>

                                 <br />

                                 <Row>
                                     <Col>
                                         <Button color='success' onClick={this.updateRmaStatus} className='float-right'>{update}</Button>
                                     </Col>
                                 </Row>
                             </CardBody>
                         </Card>
                     </Col>
                </Row>
            );
        }

        return (
            <Row>
                <Col id='rma-item-page'>
                    <Spinner headTagId='rma-item-page' />
                </Col>
            </Row>
        )
    }
}

export default RMAItem;
