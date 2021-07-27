import { defineMessages } from 'react-intl';

export const scope = 'app.components.Button';

export default defineMessages({
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: '取消',
    description: 'Cancel',
  },
  select: {
    id: `${scope}.select`,
    defaultMessage: '选择主题',
    description: 'Select Theme',
  },
  changeTheme: {
    id: `${scope}.changeTheme`,
    defaultMessage: '切换主题',
    description: 'Change Theme',
  },
});
