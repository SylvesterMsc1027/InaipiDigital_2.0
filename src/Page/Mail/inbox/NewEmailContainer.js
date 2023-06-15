import { connect } from "react-redux";
import NewEmail from "./NewEmail";

const mapStateToProps = (state) => {
    return {
        NewEmailDataList:state.data.NewEmailDataList,
    }
}

const mapDispatchToProps = (dispatch) => ({

})

const NewEmailContainer = connect(mapStateToProps, mapDispatchToProps)(NewEmail)

export default NewEmailContainer