import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Popover, Button, message } from 'antd';
import { BlockPicker } from 'react-color';
import Nodes from './nodes';

function ThemeSelect() {
  const [visible, setVisible] = useState(false);

  const handleColorChange = color => {
    window.less
      .modifyVars({ '@primary-color': color.hex, '@btn-primary-bg': color.hex })
      .then(() => {
        setVisible(false);
        message.success('主题变更成功');
      })
      .catch(error => {
        message.error(error);
      });
  };

  const handleVisibleChange = v => {
    setVisible(v);
  };

  return (
    <>
      <Popover
        content={<BlockPicker onChange={handleColorChange} />}
        trigger="click"
        visible={visible}
        onVisibleChange={handleVisibleChange}
      >
        <Button key="2" type="primary">
          <FormattedMessage {...messages.changeTheme} />
        </Button>
      </Popover>
      <Nodes.ContainerStyle />
    </>
  );
}

ThemeSelect.propTypes = {};

export default memo(ThemeSelect);
