import { connect } from "react-redux";
import SentItems from "./SentItems";

const mapStateToProps = (state) => {
    return {
        SentItemList:state.data. SentItemList,
    }
}

const mapDispatchToProps = (dispatch) => ({

})

const SentItemsContainer = connect(mapStateToProps, mapDispatchToProps)(SentItems)

export default SentItemsContainer