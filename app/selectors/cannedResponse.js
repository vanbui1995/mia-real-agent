import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
// lodash

const emptyMap = fromJS({});
const emptyList = fromJS([]);

const getCannedResponses = ({ cannedResponse: cannedResponsesState }) => cannedResponsesState.get('cannedResponse', emptyMap);

const getIsLoading = ({ cannedResponse: cannedResponsesState }) => cannedResponsesState.get('isLoading', false);

const getSorting = ({ cannedResponse: cannedResponsesState }) => cannedResponsesState.get('sorting', emptyMap);

const getAddNewContext = ({ cannedResponse: cannedResponsesState }) => cannedResponsesState.get('addNew', emptyMap);

const getUpdateContext = ({ cannedResponse: cannedResponsesState }) => cannedResponsesState.get('update', emptyMap);

const getVisibleCannedResponseIds = ({ cannedResponse: cannedResponsesState }) => cannedResponsesState.get('visibleCannedResponseIds', emptyList);

const getTotalCount = ({ cannedResponse: cannedResponsesState }) => cannedResponsesState.get('totalCount', 0);

const getSelectedPage = ({ cannedResponse: cannedResponsesState }) => cannedResponsesState.getIn(['pagination', 'selectedPage'], 1);

const getSizePerPage = ({ cannedResponse: cannedResponsesState }) => cannedResponsesState.getIn(['pagination', 'sizePerPage']);

const reselectUpdateContext = createSelector(getUpdateContext, update => update.toJS());

const reselectAddNewContext = createSelector(getAddNewContext, addNew => addNew.toJS());

const reselectSorting = createSelector(getSorting, sorting => sorting.toJS());

const reselectCannedResponses = createSelector(
  getCannedResponses,
  getVisibleCannedResponseIds,
  (cannedResponses, visibleCannedResponseIds) => {
    const plainCannedResponseById = cannedResponses.toJS();
    const plainVisibleCannedResponseIds = visibleCannedResponseIds.toJS();
    return plainVisibleCannedResponseIds.map(id => plainCannedResponseById[id]);
  },
);

const getCannedResponsesForUser = ({ cannedResponse: cannedResponsesState }) => Array.from(cannedResponsesState.get('cannedResponseForUser'));


export {
  getCannedResponses,
  getIsLoading,
  getTotalCount,
  getSizePerPage,
  getSelectedPage,
  reselectCannedResponses,
  reselectUpdateContext,
  reselectAddNewContext,
  reselectSorting,
  getCannedResponsesForUser,
};
