import { notification } from 'antd';

const alertNotification = (title: string, content: string, duration: number = 4.5, ...rest: any) => {
  notification.info({
    message: title,
    description: content,
    duration: duration,
    ...rest
  });
}

export default alertNotification