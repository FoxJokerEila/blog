import React, { useState, useEffect } from "react";
import styles from "./index.module.less";

interface Props {
  size?: number; // 球的大小，默认为 100px
  color?: string; // 球的颜色，默认为渐变色
}

const colors = [['#FFCB52', '#FF7B02'], ['#C165DD', '#5C27FE'], ['#2AFEB7', '#0BC792'], ['#5581F1', '#1153FC'], ['#FACD68', '#FC76B3'], ['#00F7A7', '#04F5ED'], ['#1DE5E2', '#B588F7'], ['#FFE324', '#FFB533']]

const Bubble: React.FC<Props> = ({ size, color }) => {
  const [position, setPosition] = useState(0); // 球的位置
  const [border] = useState(Math.random() * 20);
  const [direction, setDirection] = useState(1); // 球的运动方向，1 表示向下，-1 表示向上
  const [speed] = useState(Math.random() * 1)
  const [idx] = useState(Math.floor(Math.random() * 8))
  const [opacity] = useState(Math.random() + 0.5)
  const [innerSize] = useState(110 + Math.random() * 50)
  const [outerHeight] = useState(110 + Math.random() * 50)
  const [outerWeight] = useState((0.16 * Math.random() + 0.16) * 100 + '%')
  const [paddingR] = useState(Math.random() + '%')
  const [paddingT] = useState(24 + Math.random() * 48)
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
    <div className={styles.bubble} style={{ width: outerWeight, height: outerHeight, paddingLeft: paddingR, paddingTop: paddingT }}>
      <div className={styles.ball} style={{ opacity: opacity, width: size || innerSize, height: size || innerSize, background: `linear-gradient(45deg, ${colors[idx][0]}, ${colors[idx][1]})`, transform: `translateY(${position}%)` }}></div>
    </div>

  );
};

export default Bubble;
