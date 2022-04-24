import { REMOVE_ERROR } from './types';

/**
 * Remove the Error alert from web content
 * @returns {{type: string}} The code for reducer for can remove the errors from web content
 */
export default function () {
    return { type: REMOVE_ERROR };
}
