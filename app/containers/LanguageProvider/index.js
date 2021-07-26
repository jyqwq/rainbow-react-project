import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import enGB from 'antd/es/locale/en_GB';
import zhCN from 'antd/es/locale/zh_CN';

import { makeSelectLocale } from './selectors';

export function LanguageProvider(props) {
  const [antdLanguage, setAntdLanguage] = useState(zhCN);
  useEffect(() => {
    setAntdLanguage(props.locale === 'en' ? enGB : zhCN);
  }, [props.locale]);
  return (
    <IntlProvider locale={props.locale} key={props.locale} messages={props.messages[props.locale]}>
      <ConfigProvider locale={antdLanguage}>{React.Children.only(props.children)}</ConfigProvider>
    </IntlProvider>
  );
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({ locale }));

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageProvider);
