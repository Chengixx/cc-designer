export const vuetifyConfig: Record<string, any> = {
  hideDetails: true,
  variant: "outlined",
  inset: true,
  color: "primary",
  // tile: true,
  // style: {
  //   transform: "scale(0.875)",
  //   transformOrigin: "left",
  // },
};

export const vuetifyProps = (key: string) => {
  return key !== "colorPicker" && vuetifyConfig;
};
