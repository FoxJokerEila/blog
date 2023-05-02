import * as React from 'react';
import { Button, Divider, Form, Input, Modal, Tag } from 'antd';
import styles from './index.module.less'
import { addFavor, deleteFavor, renameFavor, resetFavor } from '@/services/user';

type IProps = {
  open: boolean
  favors: { id: number, name: string, [key: string]: any }[]
  closeModal: () => void
  refetchFavor: () => void
}

const FavorModal: React.FC<IProps> = ({ open, favors, closeModal, refetchFavor }) => {
  const [form] = Form.useForm()
  const add = () => {
    Modal.confirm({
      title: '添加偏好',
      content: <div style={{ display: 'flex', alignItems: 'center', paddingTop: 12 }}>
        <Form form={form}>
          <Form.Item name='name' label="配置名称">
            <Input maxLength={8} showCount></Input>
          </Form.Item>
        </Form>
      </div>,
      onOk: () => {
        const name = form.getFieldValue('name')
        addFavor(name).then(() => {
          refetchFavor()
          form.resetFields()
        })
      },
      okText: '创建',
      closable: true,
    })
  }
  const confirmDeleteFavor = (id: number) => {
    Modal.confirm({
      title: '提示',
      content: '确认要删除此偏好配置？',
      onOk: () => {
        deleteFavor(id).then(() => {
          refetchFavor()
        })
      }
    })
  }
  const reset = (id: number) => {
    Modal.confirm({
      title: '提示',
      content: '确认要重置此偏好配置？',
      onOk: () => {
        resetFavor(id).then(() => {
          refetchFavor()
        })
      }
    })
  }
  const confirmRenameFavor = (id: number, name: string) => {
    form.setFieldValue('name', name)
    Modal.confirm({
      title: '重命名',
      content: <div style={{ display: 'flex', alignItems: 'center', paddingTop: 12 }}>
        <Form form={form}>
          <Form.Item name='name' label="配置名称">
            <Input maxLength={8} showCount></Input>
          </Form.Item>
        </Form>
      </div>,
      onOk: () => {
        const newname = form.getFieldValue('name')
        renameFavor(id, newname).then(() => {
          refetchFavor()
          form.resetFields()
        })
      },
      okText: '创建',
      closable: true,
    })
  }

  const onConfirm = () => {
    refetchFavor();
    closeModal()
  }
  return <Modal title="偏好设置" open={open} onCancel={closeModal} onOk={onConfirm} bodyStyle={{ paddingTop: 12 }}>
    {favors.map((favor) => {
      return <div key={favor.id}>
        <div className={styles.favor}>
          <div className={styles.favorName}>{favor.name}</div>
          <div className={styles.divider}>

          </div>
          <div className={styles.btns}>
            <Button onClick={() => confirmRenameFavor(favor.id, favor.name)} type='default' className={styles.btn}>重命名</Button>
            <Button onClick={() => reset(favor.id)} type='default' className={styles.btn}>重置</Button>
            <Button onClick={() => confirmDeleteFavor(favor.id)} type='primary' className={styles.btn} danger>删除</Button>
          </div>

        </div><Divider style={{ marginTop: 6 }} />
      </div>
    })}
    <Button type='primary' onClick={add}>添加偏好</Button>
  </Modal>
}

export default FavorModal
