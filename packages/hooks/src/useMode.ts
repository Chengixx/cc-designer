import { ref } from "vue";

export type ModeManage = ReturnType<typeof useMode>;

export type ModeType = "pc" | "ipad" | "pe";

export enum ModeSize {
  pc = "100%",
  ipad = "780px",
  pe = "400px",
}

export const useMode = () => {
  const mode = ref<ModeType>("pc");
  const setMode = (newMode: ModeType) => {
    mode.value = newMode;
  };

  return {
    mode,
    setMode,
  };
};
