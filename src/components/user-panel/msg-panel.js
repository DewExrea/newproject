import React from 'react';
import ContextMenu from 'devextreme-react/context-menu';
import './user-panel.scss';


export default class TaskPanel extends React.Component {
  render() {
    const { menuMode, menuItems} = this.props;

    return (
        <div className={'msg-panel'}>
            <div className={'block-img'}>
            <i className={'fa fa-home'}></i>
            <span className={'badge'}>4</span>
            {/* <div className={'user-image'} /> */}
          </div>
        {menuMode === 'context' && (
          <ContextMenu
            items={menuItems}
            target={'.msg-button'}
            showEvent={'dxclick'}
            width={170}
            position={{ my: 'top center', at: 'bottom center' }}
            cssClass={'msg-menu'}
          />
        )}
      </div>
    );
  }
}
