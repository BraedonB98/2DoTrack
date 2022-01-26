import React from 'react';
import { useSwipeable } from 'react-swipeable';

function SwipeableHook(props) {
  const { children, className, style, ...rest } = props;
  const eventHandlers = useSwipeable(rest);
  return (<div {...eventHandlers} style={style} className={className}>{children}</div>);
}

export default SwipeableHook;
