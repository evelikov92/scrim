import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import './button.css';

/**
 * Show unique button inside the OldEngine. Designed by G-Systems OldEngineering
 */
class GSEButton extends React.Component {
    constructor (props) {
        super(props);

        this.clicked = this.clicked.bind(this);
    }

    /**
     * Execute when is click on the component
     */
    clicked (e) {
        if (this.props.click) {
            this.props.click();
        }
    }

    render () {
        return (
            <div style={this.props.style} className={`gse-btn ${this.props.type}`}>
                <this.props.component
                    {...this.props.componentProps}
                    onClick={this.clicked}
                    className={`btn btm-sm ${this.props.type}`}
                    size='sm'
                    type={this.props.btnType}>
                        {this.props.title}
                </this.props.component>
            </div>
        );
    }
}

GSEButton.defaultProps = {
    component: Button
};

GSEButton.propTypes = {
    /**
     * What component will show inside the OldEngine of the element
     */
    component: PropTypes.element
};

export default GSEButton;
