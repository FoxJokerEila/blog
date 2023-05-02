import { Tooltip } from "antd";
import React, { useState, useEffect } from "react";
import styles from "./index.module.less";

interface Props {
  title: React.ReactNode
  titleSize?: number
  size?: number; // 球的大小，默认为 100px
  color?: string; // 球的颜色，默认为渐变色
  paddingTop?: number
  maxPT?: number
  titleLine?: number
  titleWidth?: number | string
  floatSizeRangeConst?: number
  floatMarginConst?: number
  wrapWidth?: number
  onClick?: () => void
}

const colors = [['#FFCB52', '#FF7B02'], ['#C165DD', '#5C27FE'], ['#2AFEB7', '#0BC792'], ['#5581F1', '#1153FC'], ['#FACD68', '#FC76B3'], ['#00F7A7', '#04F5ED'], ['#1DE5E2', '#B588F7'], ['#FFE324', '#FFB533']]

const Bubble: React.FC<Props> = ({ title, titleSize = 14, size = 100, floatSizeRangeConst = 1, floatMarginConst = 1, wrapWidth, titleLine = 3, titleWidth = '95%', onClick }) => {
  const [position, setPosition] = useState(0); // 球的位置
  const [border] = useState(Math.random() * 20);
  const [direction, setDirection] = useState(1); // 球的运动方向，1 表示向下，-1 表示向上
  const [speed] = useState(Math.random() * 1)
  const [idx] = useState(window.crypto.getRandomValues(new Uint8Array(1))[0] % 8)
  const [opacity] = useState(Math.random() + 0.8)
  const [innerSize] = useState(size + 10 + floatSizeRangeConst * Math.random() * 50)
  const [outerHeight] = useState(innerSize + Math.random() * 50)
  const [outerWeight] = useState(wrapWidth || (0.16 * Math.random() + 0.16) * 100 + '%')
  const [paddingL] = useState(floatMarginConst * 0.5 * Math.random() + '%')
  const [paddingT] = useState((outerHeight - innerSize) * Math.random())
  useEffect(() => {
    // 每 10ms 更新一次球的位置和运动方向
    const interval = setInterval(() => {
      if (position >= border || position <= 0) {
        setDirection(-direction);
      }

      setPosition(position + direction * speed);
    }, 10);

    return () => clearInterval(interval);
  }, [position, direction, speed, border]);

  return (

    <div className={styles.bubble} style={{ width: outerWeight, height: outerHeight, paddingLeft: paddingL, paddingTop: paddingT }}>
      <div className={styles.ball} onClick={onClick} style={{ opacity: opacity, width: innerSize, height: innerSize, background: `linear-gradient(45deg, ${colors[idx][0]}, ${colors[idx][1]})`, transform: `translateY(${position}%)` }}>
        <Tooltip title={title} color={colors[idx][1]} mouseEnterDelay={0.5}>
          <div className={styles.title} style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitBoxOrient: 'vertical',
            display: '-webkit-box',
            lineClamp: titleLine,
            WebkitLineClamp: titleLine,
            width: titleWidth,
            fontSize: titleSize,
          }}>
            {title}
          </div>
        </Tooltip>
      </div>
    </div>



  );
};

export default Bubble;
