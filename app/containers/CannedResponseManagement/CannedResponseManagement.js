import itemManagementHoc from 'hoc/ItemManagementHoc';
import { connect } from 'react-redux';
import { actions } from 'reducers/cannedResponse';
import {
  reselectSorting,
} from 'selectors/cannedResponse';
import { SORT } from 'utils/constants';
import CannedResponseTable from './CannedResponseTable';
import { toI18n } from '../../utils/func-utils';

const { CANNED_RESPONSE_SORT } = SORT;

const mapStateToProps = state => ({
  currentSorting: reselectSorting(state),
  title: toI18n('CANNED_RESPONSE_ADMIN_ALL'),
  sortItems: CANNED_RESPONSE_SORT,
});


const mapDispatchToProps = {
  handleSort: actions.cannedResponseSorting,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(itemManagementHoc(CannedResponseTable));
