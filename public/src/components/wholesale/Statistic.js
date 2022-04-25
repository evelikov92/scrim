import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table } from 'reactstrap';
import { getLanguageResources } from "../../../../public/src/utils/language";

import { Pie } from 'react-chartjs';
import Spinner from '../../../../public/src/components/elements/spinner';

/**
 * Component to show the statistic about how many we preduced and how many client returns (Defects) for Shop view.
 */
class Statistic extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            /**
             * Is show do we wait for response from the server
             */
            isFetchingData: false
        };

        /**
         * The size of one statistic Pie diagram
         * @type {{ width: number, height: number }}
         */
        this.size = {
            width: window.innerWidth || document.body.clientWidth,
            height: window.innerHeight || document.body.clientHeight
        }
    }
	
	componentDidMount () {
		this.props.getStatistics(() => this.setState({ isFetchingData: true }));
	}

	componentWillUnmount () {
        this.props.removeError();
    }

    render () {
        {/* Show the Spinner while the data is fetching from server. */}
		if (!this.state.isFetchingData) {
			return (
				<div id='statistics'>
					<Spinner headTagId='statistics' />
				</div>
			);
		}

		const { labels: { produced, returned, oldProduct }, navigation: { statistic } } = getLanguageResources();

        return (
            <Col>
                <Row>
                    {Object.keys(this.props.statistic).map(name => {
						let data = [
							{
								value: Number(this.props.statistic[name].produced).toFixed(5),
								color: '#F7464A',
								highlight: '#FF5A5E',
								label: produced
							},
							{
								value:  Number(this.props.statistic[name].returned).toFixed(5),
								color: '#46BFBD',
								highlight: '#5AD3D1',
								label: returned
							}
						];
						
                        return (
                            <Col lg={4} sm={6} key={name} style={{ marginTop: '1%' }}>
                                <Card>
                                    <CardHeader className={'text-center'}>{name || oldProduct}</CardHeader>
                                    <CardBody className={'text-center'}>
                                        <Row>
                                            <Col className={'statistic-table'}>
                                                <Table bordered>
                                                    <thead>
                                                        <tr>
                                                            <th className={'text-center'}>{statistic} {returned}:</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className={'text-center'}>{returned} {`${this.props.statistic[name].returned.toFixed(5)} %`}</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </Col>
                                        </Row>

                                        <br />

                                        <Row>
                                            <Col className={'statistic-pie'}>
                                                <Pie tooltip data={data} width={this.size.width / 4} height={this.size.height / 4} />
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Col>
        );
    }
}

Statistic.propTypes = {
    /**
     * All products with information how many is produced and returned
     */
    statistic: PropTypes.object,
    /**
     * Get the statistic for the Produce/Returned GSE products
     * @param {Function} finish Action which will execute when the request is finish
     */
    getStatistics: PropTypes.func.isRequired,
    /**
     * Remove the errors from the Redux store
     */
    removeError: PropTypes.func.isRequired
};

export default Statistic;
