import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Home';

export default defineMessages({
  webTitle: {
    id: `${scope}.webTitle`,
    defaultMessage: '纸上的彩虹',
    description: 'Rainbow In Paper',
  },
  subTitle: {
    id: `${scope}.subTitle`,
    defaultMessage: '摸不到的颜色是彩虹吗？',
    description: 'Is the invisible color a rainbow?',
  },
  changeLang: {
    id: `${scope}.changeLang`,
    defaultMessage: '切换语言',
    description: 'Change Language',
  },
  changeTheme: {
    id: `${scope}.changeTheme`,
    defaultMessage: '切换主题',
    description: 'Change Theme',
  },
});
