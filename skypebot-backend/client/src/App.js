import React, {
Component
} from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import { useDispatch, useSelector, connect} from 'react-redux'
import Header from './components/containers/Header';
import Aside from './components/presental/Aside/Aside';
import Main from './components/presental/Main';
import Login from './components/presental/Login';
import {changeForm,onLogin,onLogout} from '../src/actions/user';


// const App = () => {
// const dispatch = useDispatch();
// // TODO 需要在想下進入時是否需要測試是否登入
// // useEffect(()=>dispatch(onLogout()),)
// const {userform, isLogin} = useSelector(state=>state.user);
// const app = isLogin? (<>
//   <Header onLogout={()=>dispatch(onLogout())}/>
//     <div style={{display:"flex"}}>
//     <Aside />
//     <Main />
//     </div>
//   </>):
//   (<Login handleChange={e => name => dispatch(changeForm({[name]: e.target.value}))} userform={userform} onLogin={onLogin}/>)
//   return (<Router>
//     {app}
//   </Router>
//   );
// }


class App extends Component {
  // componentDidMount(){
  //   this.props.onLogin()
  // }
 
  handleChange(name){
    return e=>this.props.changeForm({[name]: e.target.value})
  }
  render() {
    const { isLogin, userform, onLogin, onLogout } = this.props;
    
    // test
    const app = isLogin? (<>
    <Header onLogout={onLogout}/>
      <div style={{display:"flex"}}>
      <Aside />
      <Main />
      </div>
    </>):
    (<Login handleChange={this.handleChange.bind(this)} userform={userform} onLogin={onLogin}/>)
    return (<Router>
      {app}
    </Router>
    );
  }
}


const mapStateToProps=state=>({
  isLogin: state.user.isLogin,
  userform: state.user.form
})

const mapDispatchToProps=(dispatch)=>({
  changeForm: (form)=>dispatch(changeForm(form)),
  onLogin:()=>dispatch(onLogin()),
  onLogout:()=>dispatch(onLogout())
})

export default connect(mapStateToProps,mapDispatchToProps)(App);