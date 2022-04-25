import React from 'react';
import PropTypes from 'prop-types';

import './file.css';
import { getLanguageResources } from '../../../../public/src/utils/language';

/**
 * Component which is show information about uploaded file
 */
class File extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            /**
             * The name of the file
             */
            fileName: ''
        };

        this.setFile = this.setFile.bind(this);
    }

    /**
     * Set uploaded file on parent component state
     * @param {Array} files List of all uploaded files
     */
    setFile (files) {
        const file = files[0];

        if (file) {
            const { maxFileSize, notSupportFormat } = getLanguageResources('errors');

            if (file.size > this.props.maxFileSize * 1024 * 1024) {
                return window.alert(`${maxFileSize} ${this.props.maxFileSize}MB`);
            }

            if (this.props.supportFormats.indexOf(file.name.split('.').pop()) === -1) {
                return window.alert(notSupportFormat);
            }

            this.setState({ fileName: file.name });
            this.props.setFile(files, this.props.index);
        }
    }

    render () {
        const { supportFormats, maxFileSize, file } = getLanguageResources('labels');

        return (
            <div className={`gse-btn normal file-fields ${this.props.className}`}>
                <div className='btn btn-sm col'>
                    <input type='file' onChange={(e) => this.setFile(e.target.files)} accept={this.props.accept} />
                    {this.props.title}
                </div>
                {this.state.fileName &&
                <div className='col text-center'>
                    {file}: {this.state.fileName}
                </div>}
                {!this.state.fileName &&
                <div className='col text-center'>
                    {maxFileSize}: {this.props.maxFileSize}MB
                </div>}
                {!this.state.fileName &&
                <div className='col text-center'>
                    {supportFormats}: {this.props.supportFormats.join(', ')}
                </div>}
            </div>
        );
    }
}

File.propTypes = {
    /**
     * The index of the element on the array
     */
    index: PropTypes.number,
    /**
     * All file types which is accepted to upload
     */
    accept: PropTypes.string,
    /**
     * Title of the file
     */
    title: PropTypes.string.isRequired,
    /**
     * Maximum allowed file size
     */
    maxFileSize: PropTypes.number,
    /**
     * All support formats
     */
    supportFormats: PropTypes.array,
    /**
     * Set the uploaded file on component state
     */
    setFile: PropTypes.func
};

export default File;
