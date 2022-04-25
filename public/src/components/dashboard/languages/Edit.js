import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardHeader, CardBody, Table, Button, Input } from 'reactstrap';

import Spinner from '../../../../../public/src/components/elements/spinner';

const languages = {
    en: 'English',
    de: 'Deutsch',
    fr: 'France',
    es: 'Espanol',
    it: 'Italiano',
    bg: 'Български'
};

class EditLanguageText extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isFetchingData: false,
            changes: {}
        };

        this.changeText = this.changeText.bind(this);
        this.saveText = this.saveText.bind(this);
    }

    componentDidMount () {
        this.props.getTranslateLanguagesResources(this.props.match.params.lang, () => this.setState({ isFetchingData: true }));
    }

    changeText (element, key, value) {
        this.setState({
            changes: {
                ...this.state.changes,
                [element]: {
                    ...this.state.changes[element],
                    [key]: value
                }
            }
        });
    }

    saveText () {
        if (Object.keys(this.state.changes).length > 0) {
            this.setState({ isFetchingData: false });
            this.props.updateTranslateText(
                this.props.match.params.lang,
                this.state.changes,
                () => this.setState({ isFetchingData: true, changes: { } })
            );
        }
    }

    render () {
        if (!this.state.isFetchingData) {
            return (
                <div id={'language-translate'}>
                    <Spinner headTagId={'language-translate'} />
                </div>
            );
        }

        let userLanguage = window.localStorage.getItem('lang');
        let translateLanguage = this.props.match.params.lang;

        return (
            <Col>
                <Row>
                    <Col>
                        {Object.keys(this.props.strings[userLanguage]).map((group, i) => {
                            let value = group.charAt(0).toUpperCase() + group.substr(1);

                            return (
                                <Fragment key={i}>
                                    <Card>
                                        <CardHeader className={'text-center'}>{value.replace(/([a-z](?=[A-Z]))/g, '$1 ')}</CardHeader>
                                        <CardBody>
                                            <Table bordered>
                                                <thead>
                                                    <tr>
                                                        <th className={'text-center'} style={{ width: '10%' }}>№</th>
                                                        <th className={'text-center'} style={{ width: '45%' }}>{languages[userLanguage]}</th>
                                                        <th className={'text-center'} style={{ width: '45%' }}>{languages[translateLanguage]}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.keys(this.props.strings[userLanguage][group]).map((key, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td className={'text-center'}>{i + 1}</td>
                                                                <td>{this.props.strings[userLanguage][group][key]}</td>
                                                                <td>
                                                                    <textarea
                                                                        onBlur={(e) => this.changeText(group, key, e.target.value)}
                                                                        style={{ display: 'block', width: '100%' }}>
                                                                            {this.props.strings[translateLanguage][group][key]}
                                                                    </textarea>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </Table>
                                            <Button className={'float-right'} onClick={this.saveText}>Save</Button>
                                        </CardBody>
                                    </Card>
                                    <br />
                                </Fragment>
                            );
                        })}
                    </Col>
                </Row>
            </Col>
        );
    }
}

export default EditLanguageText;
