import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Label, FormGroup, Input } from 'reactstrap';
import { getLanguageResources } from '../../../../../public/src/utils/language';

/**
 * Component which is show the information about RMA expired item
 */
class Expired extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            style: {
                color: 'red'
            }
        };

        this.isAgreeCost = this.isAgreeCost.bind(this);
    }

    /**
     * Is user agree to cost the repair
     * @param {Boolean} checked do checkbox is checked
     */
    isAgreeCost (checked) {
        if (checked) {
            this.setState({ style: { } });
        } else {
            this.setState({ style: { color: 'red' } });
        }
        this.props.isAgreeCost(checked);
    }

    render () {
        const {agree} = getLanguageResources('labels');

        return (
            <Row>
                <Col>
                    <Label md={10}>{this.props.title}</Label>
                    <FormGroup>
                        <Label style={this.state.style} md={12} className='ux-checkbox'>
                            <Input type='checkbox' className='material-checkbox'
                                   onChange={(e) => this.isAgreeCost(e.target.checked)}/> &nbsp;
                            <span style={this.state.style} className='material-checkbox-title'>{agree}</span>
                        </Label>
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}

Expired.propTypes = {
    /**
     * The text which will show to the client
     */
    title: PropTypes.string.isRequired,
    /**
     * Function to set do user is agree to pay for RMA
     */
    isAgreeCost: PropTypes.func.isRequired
};

export default Expired;
