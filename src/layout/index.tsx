import * as React from 'react';
import { Button, Layout, Menu, Select } from 'antd';
import {
  NavLink,
  useRoutes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import useFavorStore from '@/store/useFavorStore';
import { UserType } from '@/components/user';
import { getFavor, updateFavor } from '@/services/user';
import { SettingOutlined } from '@ant-design/icons';
import { router } from '@/router';
import { menu, minHeight, loginHeight, editHeight } from './config';
import styles from './index.module.less'
import UserPop from './user-pop';
import FavorModal from './favor-modal';
import useBoolean from '@/hooks/useBoolean';

const { Header, Content, Footer } = Layout;

type IProps = any

const App: React.FC<IProps> = () => {
  const routeElement = useRoutes(router)
  const navigate = useNavigate()
  const location = useLocation()
  // const { userInfo, setUserInfo } = useUser()
  const { setFvr } = useFavorStore()
  const [state, setState] = React.useState({
    selectedKey: '',
    // 是否处于 login 或 register 页面
    isLogin: true,
    isEdit: false,
  })
  const [favor, setFavor] = React.useState<UserType['favor']>({ current: 0, list: [] })
  const { state: favorModalVisible, setT: showFavorModal, setF: closeFavorModal } = useBoolean()
  const height = React.useMemo(() => {
    if (state.isLogin) {
      return loginHeight
    }
    if (state.isEdit) {
      return editHeight
    }
    return minHeight
  }, [state.isEdit, state.isLogin])

  const favorList = React.useMemo(() => {
    if (!favor) return
    const { list } = favor
    return list.map(it => ({ label: it.name, value: it.id }))
  }, [favor])

  React.useEffect(() => {
    setState({
      selectedKey: location.search.startsWith('?') ? '***' : location.pathname.slice(1),
      isLogin: ['login', 'register'].includes(location.pathname.slice(1)),
      isEdit: ['blog-edit'].includes(location.pathname.slice(1)),
    })
  }, [location.search, location.pathname])

  const fetchFavor = React.useCallback(() => {
    getFavor().then((res) => {
      setFavor(res.favor)
    })
  }, [])

  React.useEffect(() => {
    if (favorList?.length || favor?.list?.length) return
    if (localStorage.getItem('token')) {
      fetchFavor()
    }
  }, [favorList?.length, fetchFavor, favor?.list?.length])

  React.useEffect(() => {
    if (!localStorage.getItem('token') && !['login', 'register'].includes(location.pathname.slice(1))) {
      navigate('/login')
    }
  }, [location.pathname, navigate])

  return (
    <Layout className={styles.layout}>
      {!state.isLogin && !state.isEdit
        && <Header className={styles.header} style={{ background: 'linear-gradient(90deg, #343434, black)' }}>
          <span className={styles.favorLabel}>当前偏好：</span><Select className={styles.favor} options={favorList} value={favor?.current} onChange={(value) => {
            setFavor((pre) => ({ current: value, list: pre?.list || [] }))
            updateFavor(value).then(res => {
              setFvr(value)
            })
          }} />
          <Button onClick={() => showFavorModal()} className={styles.setFavor}><span style={{ color: '#fff' }}><SettingOutlined /></span></Button>
          <FavorModal favors={favor?.list || []} open={favorModalVisible} closeModal={closeFavorModal} refetchFavor={fetchFavor} />
          <div className={styles.emptyDivider}></div>
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
