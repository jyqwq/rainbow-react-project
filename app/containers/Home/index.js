/**
 React.memo(...)是React v16.6引进来的新属性。
 它的作用和React.PureComponent类似，是用来控制函数组件的重新渲染的。
 React.memo(...) 其实就是函数组件的React.PureComponent。
 用memo包装组件就是尽可能优化组件的性能，避免不必要的无用或者重复的渲染
 */
import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { makeSelectHome } from './selectors';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import { defaultAction } from './actions';
import messages from './messages';
import Nodes from './nodes';
import { Button, PageHeader } from 'antd';
import { changeLocale } from '../LanguageProvider/actions';
import ThemeSelect from '../../components/ThemeSelect/Loadable';

export function Home(props) {
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });
  useEffect(() => {
    props.defaultAction();
    console.log('组件加载');
    return () => {
      console.log('组件卸载');
    };
  }, []);
  return (
    <div>
      <FormattedMessage {...messages.webTitle}>
        {title => (
          <Helmet>
            <title>{title}</title>
            <meta name="description" content="Description of Home" />
          </Helmet>
        )}
      </FormattedMessage>
      <PageHeader
        onBack={() => window.history.back()}
        title={<FormattedMessage {...messages.webTitle} />}
        subTitle={<FormattedMessage {...messages.subTitle} />}
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={() => {
              props.changeLang(props.locale === 'zh' ? 'en' : 'zh');
            }}
          >
            <FormattedMessage {...messages.changeLang} />
          </Button>,
          <ThemeSelect key="2" type="circle" />,
        ]}
      >
        <Nodes.Container>
          <Nodes.Title>
            <FormattedMessage {...messages.webTitle} />
          </Nodes.Title>
        </Nodes.Container>
      </PageHeader>
    </div>
  );
}

/**
 使用属性类型来记录传递给组件的属性的预期类型。
 运行时对props进行类型检查。
 */
// eslint-disable-next-line react/no-typos
Home.PropTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  home: makeSelectHome(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    defaultAction: () => {
      dispatch(defaultAction());
    },
    changeLang: lang => {
      dispatch(changeLocale(lang));
    },
  };
}

/**
 连接 React 组件与 Redux store。
 连接操作不会改变原来的组件类。
 反而返回一个新的已与 Redux store 连接的组件类。

 mapStateToProps: 如果定义该参数，组件将会监听 Redux store 的变化。
 任何时候，只要 Redux store 发生改变，mapStateToProps 函数就会被调用。
 该回调函数必须返回一个纯对象，这个对象会与组件的 props 合并。
 如果你省略了这个参数，你的组件将不会监听 Redux store。

 mapDispatchToProps: 如果传递的是一个对象，
 那么每个定义在该对象的函数都将被当作 Redux action creator，对象所定义的方法名将作为属性名；
 每个方法将返回一个新的函数，函数中dispatch方法会将action creator的返回值作为参数执行。
 这些属性会被合并到组件的 props 中。

 根据配置信息，返回一个注入了 state 和 action creator 的 React 组件。
 */
const withConnect = connect(mapStateToProps, mapDispatchToProps);

/**
 从右到左来组合多个函数。

 这是函数式编程中的方法，为了方便，被放到了 Redux 里。
 当需要把多个 store 增强器 依次执行的时候，需要用到它。

 返回值: 从右到左把接收到的函数合成后的最终函数。
 */
export default compose(withConnect, memo)(Home);
