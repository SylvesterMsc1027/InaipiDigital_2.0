import { connect } from "react-redux";
import Dashboard from './Dashboard';

const mapStateToProps = (state) => {
  return {
    InboxDataList:state.data.InboxDataList,
  }
  
}
const mapDispatchToProps = (dispatch) => ({

})
const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard)

export default DashboardContainer


