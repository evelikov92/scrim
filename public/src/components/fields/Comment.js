import React from 'react';
import PropTypes from 'prop-types';
import { Label, Input, FormGroup, FormFeedback } from 'reactstrap';
import { getLanguageResources } from '../../../../public/src/utils/language';

import '../../../../public/src/components/fields/fields.css';

/**
 * Show the Form for write comment for something
 */
class CommentField extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            /**
             * Remaining symbols for that comment field
             */
            characters: this.props.maxCharacters,
            /**
             * The value of the comment field
             */
            value: ''
        };

        this.changeCommentField = this.changeCommentField.bind(this);
    }

    /**
     * Change the textarea value
     * @param {String} value The value on textarea
     */
    changeCommentField (value) {
        if (value.length > this.props.maxCharacters) {
            // Get the value from 0 to maximum characters
            value = value.substring(0, this.props.maxCharacters);
        }

        this.setState({ characters: this.props.maxCharacters - value.length,  value });
    }

    render () {
        const { meta: { touched, error }, errorMessage } = this.props;

        let color = '';
        if ((error || errorMessage) && touched) { // Is invalid because has some error
            color = 'is-invalid';
        } else if (!error && touched) { // Is valid because is not have error and is on typing
            color = 'is-valid';
        }

        if (this.props.maxCharacters) {
            return (
                <FormGroup>
                    <Label htmlFor={this.props.id}>{this.props.label}</Label>
                    <Input placeholder={this.props.placeholder}
                           type='textarea'
                           {...this.props.input}
                           rows={this.props.rows}
                           className={`form-control ${color}`}
                           value={this.state.value}
                           onChange={(e) => this.changeCommentField(e.target.value)}
                           id={this.props.id} />

                    {/* Show the remaining characters */}
                    {this.props.maxCharacters && <div>{getLanguageResources('labels').maxCharacters}: {this.state.characters}</div>}

                    {/* Show the error message */}
                    {(touched && (error || errorMessage) && <FormFeedback>{error || errorMessage}</FormFeedback>)}
                </FormGroup>
            );
        } else {
            return (
                <FormGroup>
                    <Label htmlFor={this.props.id}>{this.props.label}</Label>
                    <Input placeholder={this.props.placeholder}
                           type='textarea'
                           {...this.props.input}
                           rows={this.props.rows}
                           className={`form-control ${color}`}
                           id={this.props.id} />

                    {/* Show the remaining characters */}
                    {this.props.maxCharacters && <div>{getLanguageResources('labels').maxCharacters}: {this.state.characters}</div>}

                    {/* Show the error message */}
                    {(touched && (error || errorMessage) && <FormFeedback>{error || errorMessage}</FormFeedback>)}
                </FormGroup>
            );
        }
    }
}

CommentField.propTypes = {
    /**
     * The maximum possible used characters on that comment field
     */
    maxCharacters: PropTypes.number
};

export default CommentField;
