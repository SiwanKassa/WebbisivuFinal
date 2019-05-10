import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Logout from './views/Logout';
import {getAllMedia, getFilesByTag} from './utils/MediaApi';
import Profile from './views/Profile';
import Login from './views/Login';
import Home from './views/Home';
import Nav from './components/Nav';
import Upload from './views/Upload';
import MyFiles from './views/MyFiles';
import Single from './views/Single';

class App extends React.Component {

  state = {
    user: null,
  };

  setUser = (user) => {
    getFilesByTag('profile').then((files) => {
      const profilePic = files.filter((file) => {
        let outputFile = null;
        if (file.user_id === this.state.user.user_id) {
          outputFile = file;
        }
        return outputFile;
      });
      this.setState((prevState) => {
        return {
          user: {
            ...prevState.user,
            profilePic: profilePic[0],
          },
        };
      });
    });
    this.setState({user});
  };

  setUserLogout = (user) => {
    this.setState({user});
  };

  checkLogin = () => {
    return this.state.user !== null;
  };

  updateImages = () => {
    getAllMedia().then((pics) => {
      console.log(pics);
      this.setState({picArray: pics});
    });
  };

  componentDidMount() {
    this.updateImages();
  }

  render() {
    return (
        <Router basename='/~lauriaus/projektij4'>
          <div>
            <Nav checkLogin={this.checkLogin}/>
            <Route path="/home" render={(props) => (
                <Home {...props} user={this.state.user}/>
            )}/>
            <Route path="/upload" render={(props) => (
                <Upload {...props} updateImages={this.updateImages}/>
            )}/>
            <Route path="/single/:id" component={Single}/>

            <Route path="/profile" render={(props) => (
                <Profile {...props} user={this.state.user}/>
            )}/>

            <Route exact path="/" render={(props) => (
                <Login {...props} setUser={this.setUser}/>
            )}/>

            <Route path="/logout" render={(props) => (
                <Logout {...props} setUserLogout={this.setUserLogout}/>
            )}/>
            <Route path="/my-files" render={(props) => (
                <MyFiles {...props} user={this.state.user}/>
            )}/>
          </div>
        </Router>
    );
  }
}

export default App;