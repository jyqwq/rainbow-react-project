import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Popover, Button, message } from 'antd';
import { BlockPicker, CirclePicker } from 'react-color';
import Nodes from './nodes';

function ThemeSelect(props) {
  const [visible, setVisible] = useState(false);
  const type = props.type === 'circle' ? 'circle' : 'default';

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
        content={
          type === 'circle' ? (
            <CirclePicker onChange={handleColorChange} />
          ) : (
            <BlockPicker onChange={handleColorChange} />
          )
        }
        trigger="click"
        visible={visible}
        onVisibleChange={handleVisibleChange}
      >
        <Button type="primary">
          <FormattedMessage {...messages.changeTheme} />
        </Button>
      </Popover>
      <Nodes.ContainerStyle />
    </>
  );
}

ThemeSelect.defaultProps = {
  type: 'default',
};

ThemeSelect.propTypes = {
  type: PropTypes.string,
};

export default memo(ThemeSelect);
