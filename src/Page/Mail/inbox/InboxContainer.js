import { connect } from "react-redux";
import Inbox from "./Inbox";
import { InboxList, InboxMailShow, DownloadAttachment, InboxErrorMessageClose } from "../../../redux/actions/actions";

const mapStateToProps = (state) => {
    return {

        emailShowMessage: state.data.emailShowMessage,
        emaiIsPending: state.data.emaiIsPending,
        emailMessage: state.data.emailMessage,
        emailShowColor: state.data.emailShowColor,
        InboxDataList: state.data.InboxDataList,
        InboxEmailContent: state.data.InboxEmailContent,
        InboxEmailBody: state.data.InboxEmailBody,
    }
}

const mapDispatchToProps = (dispatch) => ({
    InboxList: () => dispatch(InboxList()),
    InboxMailShow: (a) => dispatch(InboxMailShow(a)),
    DownloadAttachment: (a, b) => dispatch(DownloadAttachment(a, b)),
    InboxErrorMessageClose: () => dispatch(InboxErrorMessageClose())
})

const InboxContainer = connect(mapStateToProps, mapDispatchToProps)(Inbox)

export default InboxContainer