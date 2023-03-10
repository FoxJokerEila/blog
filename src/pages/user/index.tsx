import * as React from 'react';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import UserCard from '@/components/user';
import useUser from '@/hooks/useUser'
import { get } from '@/services/request';
import styles from './index.module.less'
import { minHeight } from '@/layout/config';
import { updateUser } from '@/services/user';
import useLogin from '@/hooks/useLogin';


type IProps = any

const User: React.FC<IProps> = function () {
  const [form] = useForm()
  const { userInfo } = useUser()
  const { loginFn } = useLogin()
  const handleClick = () => {
    console.log(userInfo);
  }

  React.useEffect(() => {
    form.setFieldsValue({
      ...userInfo
    })
  }, [form, userInfo])

  const onFinish = () => {
    const { username, email, description } = form.getFieldsValue()
    console.log(username, email, description);

    updateUser(userInfo.user_id, username, email, description).then((res) => {
      loginFn(res)
    })
  }

  return <div className={styles.box} style={{ height: minHeight }}>
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="username" label="用户名" required={false} rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="email" label="邮箱" required={false} rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="description" label="简介" required={false} rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item >
        <Button type="primary" htmlType="submit">
          修改
        </Button>
      </Form.Item>
    </Form>
  </div>
}

export default User
