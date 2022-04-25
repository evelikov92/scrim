import React from 'react';
import PropTypes from 'prop-types';

import { getLanguageResources } from "../../../../public/src/utils/language";

import Spinner from '../../../../public/src/components/elements/spinner';

class Extend extends React.Component {
    componentDidMount () {
        const { failed } = getLanguageResources('extends');
        this.props.extend(
            { code: this.props.match.params.number },
            () => this.props.history.push('/is-active'),
            () => window.alert(failed)
        );
    }

    render () {
        return (
            <div id={'extend-warranty'}>
                <Spinner headTagId={'extend-warranty'} />
            </div>
        )
    }
}

export default Extend;
