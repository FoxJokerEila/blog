import * as React from 'react';
import { Button, Form, Modal, ModalProps, Radio, Switch } from 'antd';
import { PrivacyType, UserType } from '../user';
import { updatePrivacy } from '@/services/user';

type IProps = {
  user?: UserType
  refreshData?: () => void
  closeModal?: () => void
} & ModalProps

const Item = Form.Item

const PrivacyModal: React.FC<IProps> = ({ user, refreshData, closeModal, ...rest }) => {
  const [form] = Form.useForm()

  React.useEffect(() => {
    if (rest.open) {
      form.setFieldsValue({
        ...user?.privacy
      })
    }
  }, [form, user, rest.open])

  const handleFinished = (values: PrivacyType) => {
    updatePrivacy(values).then(() => {
      refreshData?.()
      closeModal?.()
    })
    console.log({ values });

  }

  return <Modal {...rest} title="隐私设置" maskClosable={false} okText="保存" onOk={form.submit}>
    <Form form={form} onFinish={handleFinished}>
      <Item label="是否默认公开博客" name='blog_privacy_level'>
        <Radio.Group>
          <Radio value={1}>是</Radio>
          <Radio value={0}>否</Radio>
        </Radio.Group>
      </Item>
      <Item label="我博客下的评论，除评论者以外，他人是否可见" name="comment_privacy_level">
        <Radio.Group>
          <Radio value={1}>可见</Radio>
          <Radio value={0}>不可见</Radio>
        </Radio.Group>
      </Item>
      <Item label="发布新博客时，是否开启评论区" name="is_commentable">
        <Radio.Group>
          <Radio value={1}>开启</Radio>
          <Radio value={0}>关闭</Radio>
        </Radio.Group>
      </Item>
      <Item label="我发起的评论的隐私设置" name="is_my_comment_public">
        <Radio.Group>
          <Radio value={1}>所有人可见</Radio>
          <Radio value={0}>仅博客作者可见</Radio>
        </Radio.Group>
      </Item>
      <Item label="是否允许他人查看我的粉丝列表" name="fans_parivacy">
        <Radio.Group>
          <Radio value={1}>允许</Radio>
          <Radio value={0}>禁止</Radio>
        </Radio.Group>
      </Item>
      <Item label="是否允许他人查看我的关注列表" name="following_privacy">
        <Radio.Group>
          <Radio value={1}>允许</Radio>
          <Radio value={0}>禁止</Radio>
        </Radio.Group>
      </Item>
    </Form>
  </Modal>
}

export default PrivacyModal
