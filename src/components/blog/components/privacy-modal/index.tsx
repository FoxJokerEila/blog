import * as React from 'react';
import { Form, Modal, ModalProps, Radio } from 'antd';
import { BlogType } from '../..';
import { updateBlogPrivacy } from '@/services/blog';

const { Item } = Form

type IProps = {
  blogPrivacy: Pick<BlogType, 'blog_id' | 'user_id' | 'blog_privacy_level' | 'comment_privacy_level' | 'is_commentable'>
  refetch?: () => void
  closeModal?: () => void
} & ModalProps

const BlogPrivacyModal: React.FC<IProps> = ({ blogPrivacy, refetch, open, closeModal }) => {
  const [form] = Form.useForm()
  React.useEffect(() => {
    if (open) {
      form.setFieldsValue({
        ...blogPrivacy
      })
    }
  }, [blogPrivacy, form, open])
  const handleSubmit = (values: any) => {
    updateBlogPrivacy(blogPrivacy.blog_id, blogPrivacy.user_id!, values).then(() => {
      refetch?.()
      closeModal?.()
    })
  }
  return <Modal title="博客权限设置" open={open} onCancel={closeModal} onOk={form.submit} okText="保存" >
    <Form form={form} onFinish={handleSubmit} >
      <Item label="博客是否公开" name="blog_privacy_level">
        <Radio.Group>
          <Radio value={0}>私密</Radio>
          <Radio value={1}>公开</Radio>
        </Radio.Group>
      </Item>
      <Item label="允许公开评论" name="comment_privacy_level">
        <Radio.Group>
          <Radio value={0}>禁止</Radio>
          <Radio value={1}>允许</Radio>
        </Radio.Group>
      </Item>
      <Item label="开启评论区" name="is_commentable">
        <Radio.Group>
          <Radio value={0}>关闭</Radio>
          <Radio value={1}>开启</Radio>
        </Radio.Group>
      </Item>
    </Form>
  </Modal>
}

export default BlogPrivacyModal
