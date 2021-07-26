import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Home';

export default defineMessages({
  webTitle: {
    id: `${scope}.webTitle`,
    defaultMessage: '纸上的彩虹',
    description: 'Rainbow In Paper',
  },
  changeLang: {
    id: `${scope}.changeLang`,
    defaultMessage: '切换语言',
    description: 'Change Language',
  },
});
