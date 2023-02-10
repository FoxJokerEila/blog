import * as React from 'react';

type IProps = {
  title: string
  date: string
  like: number
  comment: number
}

const Blog: React.FC<IProps> = ({ title, date, like, comment }) => {
  return <div>
    <div>{title}</div>
    <span>{date}</span>
    <span>{like}</span>
    <span>{comment}</span>
  </div>
}

export default Blog
