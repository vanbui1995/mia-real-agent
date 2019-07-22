import itemDetailListHoc from 'hoc/ItemDetailHoc/ItemDetailListHoc';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { actions } from 'reducers/application';
import {
  reselectSorting,
  getIsFetching,
  reselectApplications,
  getApplicationIdFromRoute,
  getTotalCount,
  getSelectedPage,
  getSizePerPage,
} from 'selectors/application';
import { SORT } from 'utils/constants';
import ApplicationDetailListItem from 'components/ApplicationDetail/ApplicationDetailListItem';
const { APPLICATION_SORT } = SORT;

const structureSelectorFunc = createStructuredSelector({
  currentSorting: reselectSorting,
  isLoading: getIsFetching,
  selectedId: getApplicationIdFromRoute,
  items: reselectApplications,
  totalCount: getTotalCount,
  selectedPage: getSelectedPage,
  sizePerPage: getSizePerPage,
});

const mapStateToProps = (state) => {
  const structureSelector = structureSelectorFunc(state);

  return {
    ...structureSelector,
    sortItems: APPLICATION_SORT,
    title: 'All Applications',
  };
};

const mapDispatchToProps = {
  handleSort: actions.sortApplication,
  fetchList: actions.applicationAdminGetAll,
  changePage: actions.changePage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(itemDetailListHoc(ApplicationDetailListItem));
