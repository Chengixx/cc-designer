//获取一个元素距离顶部距离
export const getDistanceFromTop = (element: HTMLElement): number => {
  const elementRect = element!.getBoundingClientRect();
  const elementTopPosition = elementRect!.top + window.pageYOffset; // 加上页面的滚动偏移量
  return elementTopPosition;
};
