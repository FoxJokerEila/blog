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
import { menu, minHeight, loginHeight, editHeight } from './config';
import styles from './index.module.less'
import { ExportOutlined, MailOutlined } from '@ant-design/icons';
import { UserType } from '@/components/user';
import UserContext from '@/store/userContext';
import UserPop from './user-pop';

const { Header, Content, Footer } = Layout;

type IProps = any

const App: React.FC<IProps> = () => {
  const routeElement = useRoutes(router)
  const navigate = useNavigate()
  const location = useLocation()
  const { userInfo, setUserInfo } = useUser()

  const [state, setState] = React.useState({
    selectedKey: '',
    // 是否处于 login 或 register 页面
    isLogin: true,
    isEdit: false,
  })

  const height = React.useMemo(() => {
    if (state.isLogin) {
      return loginHeight
    }
    if (state.isEdit) {
      return editHeight
    }
    return minHeight
  }, [state.isEdit, state.isLogin])

  // const UserPart = (userInfo: UserType) => {
  //   console.log({ userInfo });
  //   return <Popover arrowPointAtCenter overlayClassName={styles.user} placement="bottom" title={<div className={styles.username}>{userInfo.username}</div>}
  //     content={<div className={styles.popoverCon}>
  //       <div className={styles.follow}>
  //         <span><Link to='/fans'>粉丝：{userInfo?.fans}</Link></span>
  //         <span><Link to='/follows'>关注：{userInfo?.following}</Link></span>
  //       </div>
  //       <Divider style={{ margin: '12px 0' }} />
  //       <span className={styles.description}>{userInfo.description}</span>
  //       <span className={styles.email}><MailOutlined />&nbsp;&nbsp;{userInfo.email}</span>
  //       <div className={styles.logOutBtn}><Button icon={<ExportOutlined />} onClick={() => {
  //         localStorage.clear();
  //         window.location.href = '/login'
  //       }}>退出登录</Button>
  //       </div>
  //     </div>}
  //   >
  //     <div className={styles.userInfo}>
  //       {userInfo.username}
  //     </div>
  //   </Popover>
  // }

  React.useEffect(() => {
    setState({
      selectedKey: location.search.startsWith('?') ? '***' : location.pathname.slice(1),
      isLogin: ['login', 'register'].includes(location.pathname.slice(1)),
      isEdit: ['blog-edit'].includes(location.pathname.slice(1)),
    })
  }, [location])

  React.useEffect(() => {
    if (!state.isLogin && !localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [navigate, state])

  return (
    <Layout className={styles.layout}>
      {!state.isLogin && !state.isEdit
        && <Header className={styles.header} style={{ background: 'linear-gradient(90deg, #343434, black)' }}>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[state.selectedKey]}
            items={menu.map((item) => {
              return {
                key: item.path,
                label: <NavLink
                  onClick={() => setState((pre) => ({ ...pre, selectedKey: String(item.path) }))}
                  to={item.path}>{item.name}</NavLink>,
              };
            })}
          />
          <div className={styles.divider}></div>
          <UserPop />
        </Header>}
      <Content style={{ padding: state.isLogin || state.isEdit ? 0 : '0 50px', minHeight: height }}>
        <div className={styles.siteLayoutContent} style={{ minHeight: height }}>
          {routeElement}
        </div>
      </Content>
      {!state.isEdit && <Footer style={{ color: 'white', textAlign: 'center', background: 'transparent' }}>Blog ©2023 Created by Star</Footer>}
    </Layout >
  );
};

export default App;
