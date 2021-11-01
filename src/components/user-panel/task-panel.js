import React from 'react';
import ContextMenu from 'devextreme-react/context-menu';
import './user-panel.scss';


export default class TaskPanel extends React.Component {
  render() {
    const { menuMode, menuItems} = this.props;

    return (
        <div className={'task-panel'}>
            <div className={'block-img'}>
            <i className={'fa fa-star-o'}></i>
            <span className={'badge'}>3</span>
            {/* <div className={'user-image'} /> */}
          </div>
        {menuMode === 'context' && (
          <ContextMenu
            items={menuItems}
            target={'.task-button'}
            showEvent={'dxclick'}
            width={170}
            position={{ my: 'top center', at: 'bottom center' }}
            cssClass={'task-menu'}
          />
        )}
      </div>
    );
  }
}
