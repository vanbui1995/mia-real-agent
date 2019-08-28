import TableManagement from 'components/TableManagement';
import { connect } from 'react-redux';
import { actions } from 'reducers/cannedResponse';
import { createStructuredSelector } from 'reselect';
import {
  reselectCannedResponses,
  getIsLoading,
  getTotalCount,
  getSelectedPage,
  getSizePerPage,
} from 'selectors/cannedResponse';
import { COLUMN_TYPE } from 'utils/constants';
import { toI18n } from '../../utils/func-utils';

const userColumns = [
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: 'shortcut',
    columnAttr: {
      value: toI18n('CANNED_RESPONSE_ADMIN_SHORTCUT'),
      percent: '20',
    },
  },
  {
    type: COLUMN_TYPE.TEXT,
    dataKey: 'content',
    columnAttr: {
      value: toI18n('CANNED_RESPONSE_ADMIN_CONTENT'),
    },
  },
];

const mapDispatchToProps = {
  fetchList: actions.fetchListCannedResponse,
  changePage: actions.changePage,
};

const structureSelectorFunc = createStructuredSelector({
  items: reselectCannedResponses,
  isLoading: getIsLoading,
  totalCount: getTotalCount,
  selectedPage: getSelectedPage,
  sizePerPage: getSizePerPage,
});

const mapStateToProps = (state) => {
  const structureSelector = structureSelectorFunc(state);

  return {
    ...structureSelector,
    columns: userColumns,
    endpoint: 'admin/canned-responses',
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableManagement);
