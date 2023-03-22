import * as React from 'react';
import { message } from 'antd'
import { ArgsProps, NoticeType } from 'antd/es/message/interface'

type FnType = (params: {
  msg: React.ReactNode
  type?: NoticeType
} & Omit<ArgsProps, 'content' | 'type'>) => void

const alertMessage: FnType = ({ msg = '', type = 'success', ...config }) => {
  message.open({
    ...(config || {}),
    type,
    content: msg,
  })
}

export default alertMessage