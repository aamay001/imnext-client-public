import React from 'react';
import { Icon } from 'antd';


const CustomArrow = props => {
  const { currentSlide, slideCount, ...remainingProps } = props
    return (
      <Icon {...remainingProps} />
    )
}

export default CustomArrow;
