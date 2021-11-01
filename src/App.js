import './themes/generated/dx.generic.base.css'
import './themes/generated/theme.additional.css';
import 'devextreme/dist/css/dx.common.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/vendor/bootstrap/css/bootstrap.css';
import './components/vendor/font-awesome/css/font-awesome.css';
import './components/vendor/magnific-popup/magnific-popup.css';
import './components/vendor/bootstrap-datepicker/css/datepicker3.css';
// Specific Page Vendor CSS
import './components/vendor/jquery-ui/css/ui-lightness/jquery-ui-1.10.4.custom.css';
import './components/vendor/bootstrap-multiselect/bootstrap-multiselect.css';
import './components/vendor/morris/morris.css';
// Theme CSS
import './components/stylesheets/theme.css';
// Skin CSS
import './components/stylesheets/skins/default.css';
// Theme Custom CSS
import './components/stylesheets/theme-custom.css';
import 'react-widgets/dist/css/react-widgets.css';
import 'react-widgets/dist/react-widgets';
import 'react-widgets-globalize/dist/react-widgets-globalize';

import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import appInfo from './app-info';
import routes from './app-routes';
import './App.scss';
import './dx-styles.scss';
import './kw-styles.scss';
import { Footer, LoginForm } from './components';
import {
  SideNavOuterToolbar as SideNavBarLayout,
  SingleCard
} from './layouts';
import { sizes, subscribe, unsubscribe } from './utils/media-query';
import { Get_auth_Token, get_Menu } from './store/dataStore';
import notify from 'devextreme/ui/notify';
import { BrowserRouter, Redirect } from 'react-router-dom';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { navi } from '../src/app-navigation';

const LoginContainer = ({ logIn }) => <LoginForm onLoginClick={logIn} />;
const storage = localStorage.getItem('username');
const NotAuthPage = (props) => (
  <SingleCard>
    <Route render={() => <LoginContainer {...props} />} />
  </SingleCard>
);

const AuthPage = (props) => (
  <SideNavBarLayout title={appInfo.title} userlogin={'1111'} {...props}>
    <Switch>
      {routes.map(item => (
        <Route
          exact
          key={item.path}
          path={item.path}
          component={item.component}
        />
      ))}
    </Switch>
    <Footer>
    </Footer>
  </SideNavBarLayout>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: (storage === null ? false : true), //Get_auth_Token,
      screenSizeClass: this.getScreenSizeClass(),
      userlogin: '',
      dataMenu: [],
      updatemenu: true,
      menuItems: [],
      group: storage != undefined ? storage.group : '',
    };
    this.userMenuItems = [
      {
        text: 'Logout',
        icon: 'runner',
        onClick: this.logOut
      }
    ];
  }

  componentDidMount() {
    if (this.state.loggedIn) {
      // this.getMenu(); //API Menu
      this.setState({ dataMenu: navi });
    }
    subscribe(this.screenSizeChanged);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dataMenu.length === 0 && prevState.updatemenu) {
      this.menuItem();
    }
  }

  componentWillUnmount() {
    unsubscribe(this.screenSizeChanged);
  }

  menuItem() {
    if (this.state.dataMenu.length > 0 && this.state.updatemenu) {
      const menu = [];
      this.state.dataMenu.forEach((el, i) => {
        if (el.subMenu.length > 0) {
          menu[i] = {
            'text': el.menuGroupName,
            'icon': el.menuGroupIcon,
            'path': el.menuGroupPath,
            'items': []
          }

          el.subMenu.forEach((ele, x) => {
            menu[i].items[x] = {
              'text': ele.menuItemTh,
              'path': ele.menuPath
            }
          });
        }
      });
      this.setState({
        menuItems: menu,
        updatemenu: false
      });
    }
  }

  renderRedirect = () => {
    let path = ($('.p-name').text() !== '') ? '#' + $('.p-name').text() : '#/home';  

    if (this.state.loggedIn) {
      return <BrowserRouter><Redirect to={appInfo.urlPathSV + path} /></BrowserRouter>
    }
    else {
      return <BrowserRouter><Redirect to={appInfo.urlPathSV + '#/'} /></BrowserRouter>
    }
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <div className={`app ${this.state.screenSizeClass}`}>
        <Router>{loggedIn ? <AuthPage userMenuItems={this.userMenuItems} menuItems={this.state.menuItems} /> : <NotAuthPage logIn={this.logIn} />}</Router>
        {this.renderRedirect()}
      </div>
    );
  }

  getMenu() {
    get_Menu.then(result => {
      this.setState({ dataMenu: result.items });
    })
      .catch(err => {
        notify(`${appInfo.errAlertMsg}`, 'error', 3000);
      });
  }

  getScreenSizeClass() {
    const screenSizes = sizes();
    return Object.keys(screenSizes).filter(cl => screenSizes[cl]).join(' ');
  }

  screenSizeChanged = () => {
    this.setState({
      screenSizeClass: this.getScreenSizeClass()
    });
  }

  logIn = () => {
    this.setState({ loggedIn: true });
  };

  logOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('user');
    this.setState({ loggedIn: false });
  };
}

export default App;
