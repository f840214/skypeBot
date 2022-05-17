import React from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { fetchAnnounce, deleteAnnounce, createAnnounce, changeForm, updateAnnounce, emptyForm } from '../../actions/announce';
import { toggleSubmit } from '../../actions/state'
import AnnounceList from '../presental/Announce/AnnounceList';
import AnnounceForm from '../presental/Announce/AnnounceForm';

class Announce extends React.Component {
    componentDidMount() {
        this.props.fetchAnnounce();
    }
    componentDidUpdate(prevProps) {
        if (this.props.isSubmit) {
            this.props.toggleSubmit()
        }
        if (this.props.match.params.page === 'add' && this.props.match.params.page !== prevProps.match.params.page){
            this.props.emptyForm();
        }
    }
    handleReq(announce) {
        // 如果是router是add的話就新增
        if (this.props.match.params.page === "add") {
            return (e) => this.props.createAnnounce(announce)
        }
        // 如果是router是update的話就更新
        if (this.props.match.params.page === "update") {
            return (e) => this.props.updateAnnounce(announce)
        }
        console.log('submit not match')
    }
    handleChange(name){
        return e => this.props.changeForm({[name]: e.target.value})
    }
    // 選取渠道=>跳轉進入formDetail
    handleSelect(_id){
        return e => this.props.changeForm(this.props.announceList.filter(announce=>announce._id===_id)[0])
    }
    render() {
        const page = { all: { header: '維護通知' }, add: { header: '新增公告' }, update: { header: '更新公告' } };
        const { match, announceList, deleteAnnounce, form, isSubmit, user } = this.props;
        const header = page[match.params.page].header;
        const present = (match.params.page === 'all') ?
            (<AnnounceList
                announceList={announceList}
                deleteAnnounce={deleteAnnounce}
                header={header}
                handleSelect={this.handleSelect.bind(this)}
                user={user}
            />)
            : (isSubmit) ? (<Redirect to="/announce/all" />) : (<AnnounceForm
                header={header}
                handleReq={this.handleReq.bind(this)}
                form={form}
                handleChange={this.handleChange.bind(this)}
                username={user.username}
            />)
        return (<>{present}</>)
    }
}

const mapStateToProps = (state) => {
    return {
        announceList: state.announce.total,
        form:  state.announce.form,
        isSubmit: state.state.isSubmit,
        user: state.user.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return ({
        fetchAnnounce: () => dispatch(fetchAnnounce()),
        deleteAnnounce: (_id) => dispatch(deleteAnnounce(_id)),
        createAnnounce: (form) => dispatch(createAnnounce(form)),
        toggleSubmit: () => dispatch(toggleSubmit()),
        changeForm: (form) => dispatch(changeForm(form)),
        updateAnnounce: (form) => dispatch(updateAnnounce(form)),
        emptyForm: ()=> dispatch(emptyForm())
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Announce)