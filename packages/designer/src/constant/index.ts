//渲染节点的时候 用于判断是否需要存储父节点
export const useParentDomList: string[] = ["divider", "text", "button"];
//渲染节点的时候 用于判断是否需要有一个margin bottom的dom列表
export const noNeedMarginBottomDomList: string[] = [
  "card",
  "row",
  "divider",
  "tab",
];
//不让复制的节点
export const noCopyDomList: string[] = ["col", "tabPane"];
//需要展示找到上级的节点
export const findHigherLevelDomList: string[] = ["col", "tabPane"];
//logo名称
export const logoName = "CGX-Form-Design";
//数据源展示颜色
export const dataSourceColor = {
  ref: "#66bc5c",
  reactive: "#66bc5c",
  http: "#016dff",
};
