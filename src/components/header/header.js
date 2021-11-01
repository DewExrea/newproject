import React from 'react';
import UserPanel from '../user-panel/user-panel';
import '././header.scss';
import $ from 'jquery';
import logo from '../images/logo.png';
import { get_Menu } from '../../store/dataStore';
import Button from 'devextreme-react/button';

import { navi } from '../../app-navigation';
var dataNavi = navi;  // ดึ่งจากไฟล์ app-navigation

// var dataNavi = [];

// get_Menu.then(result => {   ///// ดึ่งจาก db 
//   dataNavi = result.items;
// }).catch(err => { });

$(function () {
  $('.dx-drawer-panel-content').hover(function () {
    $(this).css({ width: "250px" });
  }, function () {
    if (!$('.dx-drawer-left').hasClass('dx-drawer-opened')) {
      $(this).css({ width: "70px" });
    }
  });

});

function getTitle(path) {
  var name = '';
  dataNavi.every(el => el.subMenu.every(ele => {
    if (ele.menuPath === path) {
      name = ele.text;
      return false;
    }
    return true;
  }))
  return name;
}

const titleName = () => {

  var path = ($('.p-name').text()) ? $('.p-name').text() : '#/home'; //'#/home'; 
  var name = getTitle(path);
  return name;
}

export default ({ menuToggleEnabled, title, toggleMenu, userMenuItems, userlogin }) => (
  <header className={'header-component'}>
    <div className="col-md-12">
      <div className="col-md-3 visible-lg">
        <div className="logo-container">
          <div className="visible-md visible-lg">
            <span className="logo">
              <img src={logo} alt="JSOFT Admin" height="70" />
            </span>
          </div>
          <div className="visible-xs toggle-sidebar-left" data-toggle="sidebar-left-opened" data-target="html"
            data-fire-event="sidebar-left-opened">
            <i className="fa fa-bars" aria-label="Toggle sidebar"></i>
          </div>
        </div>
      </div>
      <div className="col-md-9 col-xs-12 col-sm-12" style={{ padding: '0px' }}>
        <div className="wrap-header-right">
          <div className="header-right">

            <Button
              className={'user-button authorization'}
              width={170}
              height={'100%'}
              stylingMode={'text'}
            >
              <UserPanel menuItems={userMenuItems} menuMode={'context'} userlogin={userlogin} />
            </Button>
          </div>
        </div>
      </div>
    </div>

    <div className="row">
      <div className={'col-md-8 col-xs-12 col-sm-8 page-header-left'}>
        <div style={{ 'display': 'flex' }}>
          <div className="dx-item dx-toolbar-item dx-toolbar-button menu-button toggle-ham">
            <div className="dx-item-content dx-toolbar-item-content">
              <div className="dx-button dx-button-normal dx-button-mode-text dx-widget dx-button-has-icon" role="button" aria-label="menu">
                <div className="dx-button-content"><span onClick={toggleMenu}><i className="dx-icon dx-icon-menu icon-white"></i></span></div>
              </div>
            </div>
          </div>
          <div>
            <span className="kw-text-HD">{titleName()}</span>
          </div>
        </div>
      </div>
      <div className={'col-md-4 col-sm-3 page-header-right visible-lg'}>
        <div className="right-wrapper">
          <ol className="breadcrumbs">
            <li>
              <span>
                <i className="fa fa-home"></i>
              </span>
            </li>
            {
              (titleName() !== 'Home') &&
              <li><span>{titleName()}</span></li>
            }
          </ol>
        </div>
      </div>
    </div>
  </header >
);