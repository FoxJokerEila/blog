import * as React from 'react';
import { Button, Divider, Layout, Menu, Popover, theme } from 'antd';
import clsx from 'clsx'
import {
  NavLink,
  useRoutes,
  useLocation,
  useNavigate,
  Link
} from "react-router-dom";
import { router } from '@/router';
import useUser from '@/hooks/useUser';
import { minHeight, menu, loginHeight } from './config';
import styles from './index.module.less'
import { MailOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

type IProps = any

const App: React.FC<IProps> = () => {
  const routeElement = useRoutes(router)
  const navigate = useNavigate()
  const location = useLocation()
  const { userInfo } = useUser()

  const [state, setState] = React.useState({
    selectedKey: '',
    // 是否处于 login 或 register 页面
    isLogin: true,
  })

  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  const UserPop = () => {
    return <div className={styles.popoverCon}>
      <div className={styles.follow}>
        <span><Link to='/fans'>粉丝：20</Link></span>
        <span><Link to='/follows'>关注：10</Link></span>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <span className={styles.description}>{userInfo.description}</span>
      <span className={styles.email}><MailOutlined />&nbsp;&nbsp;{userInfo.email}</span>
      <div className={styles.logOutBtn}><Button onClick={() => {
        localStorage.clear();
        window.location.href = '/login'
      }}>退出登录</Button>
      </div>
    </div>
  }

  React.useEffect(() => {
    setState({
      selectedKey: location.search.startsWith('?') ? '***' : location.pathname.slice(1),
      isLogin: ['login', 'register', 'blog-edit'].includes(location.pathname.slice(1))
    })
  }, [location])

  React.useEffect(() => {
    if (!state.isLogin && !localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [navigate, state])

  return (
    <Layout className={styles.layout}>
      {!state.isLogin
        && <Header className={styles.header}>
          <div className={styles.logo} />
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[state.selectedKey]}
            items={menu.map((item) => {
              return {
                key: item.path,
                label: <NavLink
                  onClick={() => setState((pre) => ({ selectedKey: String(item.path), isLogin: pre.isLogin }))}
                  to={item.path}>{item.name}</NavLink>,
              };
            })}
          />
          <div className={styles.divider}></div>
          <Popover arrowPointAtCenter overlayClassName={styles.user} placement="bottom" title={<div className={styles.username}>{userInfo.username}</div>}
            content={<UserPop />}
          >
            <div className={styles.userInfo}>
              {userInfo.username}
            </div>
          </Popover>
        </Header>}
      <Content style={{ padding: state.isLogin ? 0 : '0 50px', minHeight: state.isLogin ? loginHeight : minHeight }}>
        <div className={styles.siteLayoutContent} style={{ height: state.isLogin ? loginHeight : 'auto' }}>
          {routeElement}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Blog ©2023 Created by Star</Footer>
    </Layout >
  );
};

export default App;
