import React from 'react';
import ContextMenu from 'devextreme-react/context-menu';
import List from 'devextreme-react/list';
import './user-panel.scss';
import appInfo from "../../app-info";


const getUsername = appInfo.username ;

export default class UserPanel extends React.Component {
  render() {
    const { menuMode, menuItems } = this.props;
    var userlogin = getUsername;
    return (
      <div className={'user-panel'}>

        {/* <div className={'block-img'}>
          <div className={'user-image'} />
        </div> */}
        <div className={'user-info'}>
          <span className="user-name">{userlogin}</span>
          <span className="role">Administator</span>
        </div>

        {menuMode === 'context' && (
          <ContextMenu
            items={menuItems}
            target={'.user-button'}
            showEvent={'dxclick'}
            width={170}
            position={{ my: 'top center', at: 'bottom center' }}
            cssClass={'user-menu'}
          />
        )}
        {menuMode === 'list' && (
          <List className={'dx-toolbar-menu-action'} items={menuItems} />
        )}
      </div>
    );
  }
}
