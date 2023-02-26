import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import { get } from '@/services/request';
import { login } from '@/services/user';
import alertNotification from '@/components/common/notification';
import styles from './index.module.less';
import Label from '@/components/common/common-label';
import { UserOutlined, LockOutlined } from '@ant-design/icons';


const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const Login: React.FC = () => {
  const navigate = useNavigate()

  const onFinish = (values: any) => {
    console.log('Success:', values);
    login(values).then((res) => {
      if (!res) {
        alertNotification('提示', '登陆过期')
        return
      }
      if (res.data.code !== 0) {
        alertNotification('提示', res.data.msg)
        return
      }
      localStorage.setItem('token', res.data.data.token)
      localStorage.setItem('userinfo', window.btoa(encodeURIComponent(JSON.stringify(res.data.data.userinfo))))
      navigate('/')
    }).catch(err => {
      console.log(err);
    })

  };

  return <div className={styles.box}>
    <div className={styles.container}>
      <div className={styles.background}>
      </div>
      <Form
        name="basic"
        className={styles.form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="vertical"
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label={<Label className={styles.text}><b>用户名</b></Label>}
          name="username"
          colon={false}
          required={false}
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} />
        </Form.Item>

        <Form.Item
          label={<Label className={styles.text}><b>密码</b></Label>}
          name="password"
          colon={false}
          required={false}
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" >
          <Checkbox className={styles.checkbox}>{<Label className={styles.text}>记住密码</Label>}</Checkbox>
        </Form.Item>

        <Form.Item >
          <Button type="primary" htmlType="submit" style={{ marginRight: 10, background: '#000', boxShadow: 'none' }}>
            登录
          </Button>
          <Button htmlType="button" style={{ boxShadow: 'none' }} onClick={() => navigate('/register')}>
            注册
          </Button>
        </Form.Item>
        <div><h1><b><i>Write Something Good.</i></b></h1></div>
      </Form>
    </div>

  </div>
}

export default Login;
