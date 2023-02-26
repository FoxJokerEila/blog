import * as React from 'react';

type IProps = {
  className?: string,
  style?: React.CSSProperties,
  children: any
}

const Label: React.FC<IProps> = ({ children, className, style }) => {
  return <span className={className} style={style}>{children}</span>
}

export default Label