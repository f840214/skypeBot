import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { fetchUser, deleteUser, createUser, changeForm, emptyForm } from '../../actions/user';
import { toggleSubmit } from '../../actions/state';
import UserForm from '../presental/UserForm';
import UserList from '../presental/UserList';

class User extends React.Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    componentDidUpdate(prevProps) {
        // 如果進來的時候把isSubmit設為false，方便之後跳轉。
        if (this.props.isSubmit) {
           this.props.toggleSubmit()
        }
        //if (this.props.match.params.page === 'add' && this.props.match.params.page !== prevProps.match.params.page){
        //    this.props.emptyForm();
        //}
    }

    handleChange(name){
        return e => this.props.changeForm({[name]: e.target.value})
    }

    render() {
        const page = { all: { header: '使用者列表' }, add: { header: '新增使用者' }};
        const { match, userList, createUser, deleteUser, form, isSubmit, user } = this.props;
        console.log(match)
        const header = page[match.params.page].header;
        const present = (match.params.page === 'all') ?
            (<UserList
                header={header}
                userList={userList}
                deleteUser={deleteUser}
                user={user}
            />)
            : (isSubmit) ? (<Redirect to="/user/all" />) : (<UserForm
                header={header}
                createUser={createUser}
                form={form}
                handleChange={this.handleChange.bind(this)}
            />)
        return (<>{present}</>)
    }
}

const mapStateToProps = (state) => {
    return {
        isSubmit: state.state.isSubmit,
        userList: state.user.total,
        form: state.user.form,
        user: state.user.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return ({
        fetchUser:() => dispatch(fetchUser()),
        changeForm:(form)=>dispatch(changeForm(form)),
        createUser:(form)=>dispatch(createUser(form)),
        toggleSubmit:()=>dispatch(toggleSubmit()),
        deleteUser:(_id)=>dispatch(deleteUser(_id))
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(User);


