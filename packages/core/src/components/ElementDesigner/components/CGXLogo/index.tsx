import { CcIcon, LightIcon, DarkIcon, GithubIcon } from "@cgx-designer/icons";
import { logoName } from "../../../../constant/index";
import { inject } from "vue";
import { ThemeManage } from "@cgx-designer/hooks/src/useTheme";
import { ElSwitch } from "element-plus";
import { MoveIcon } from "@cgx-designer/extensions";

const CGXLogo = () => {
  const themeManage = inject("themeManage") as ThemeManage;
  return (
    <div class="w-full h-10 bg-white flex items-center dark:bg-darkMode px-8">
      <div class="flex-1 flex items-center">
        <CcIcon
          class="mr-1 w-[24px] h-[24px]"
          style={{
            filter: themeManage.isDark.value
              ? "drop-shadow(2px 2px 6px #409eff)"
              : "drop-shadow(2px 2px 6px #999999)",
          }}
        />
        <span
          class="dark:text-[#5a9cf8] font-semibold"
          style={{
            filter: themeManage.isDark.value
              ? "drop-shadow(2px 2px 6px #409eff)"
              : "drop-shadow(2px 2px 6px #999999)",
          }}
        >
          {logoName}
        </span>
      </div>
      <div class="flex-1 flex justify-end items-center gap-x-6">
        <span class="cursor-pointer">文档</span>
        <ElSwitch
          size="large"
          v-model={themeManage.isDark.value}
          inline-prompt
          active-action-icon={DarkIcon}
          inactive-action-icon={LightIcon}
        />
        <MoveIcon label="Github" onClick={() => window.open("/")}>
          <GithubIcon class="w-[24px] h-[24px] fill-black dark:fill-white" />
        </MoveIcon>
      </div>
    </div>
  );
};

export default CGXLogo;
