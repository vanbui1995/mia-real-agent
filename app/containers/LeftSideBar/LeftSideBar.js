import { connect } from 'react-redux';
import { actions } from 'reducers/admin';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import LeftSideBar from 'components/LeftSideBar';
import { toggleLeftSideBar } from 'selectors/admin';

const mapStateToProps = (state, ownProps) => ({
  toggleLeftSideBar: toggleLeftSideBar(state),
  pathname: ownProps.location.pathname,
});


const mapDispatchToProps = {
  handleToggle: actions.handleToggle,
};


export default compose()(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(LeftSideBar);
