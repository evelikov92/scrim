import { connect } from 'react-redux';
import Edit from '../../../components/dashboard/languages/Edit';
import removeError from '../../../../../public/src/actions/error';
import { getTranslateLanguagesResources, updateTranslateText } from "../../../../../public/src/actions/language";

const mapStateToProps = (state, ownProps) => {
    const lang = ownProps.match.params.lang;
    const userLanguage = window.localStorage.getItem('lang');

    return {
        strings: state.strings
    };
};

export default connect(
    mapStateToProps,
    {
        removeError,
        getTranslateLanguagesResources,
        updateTranslateText
    }
)(Edit);
