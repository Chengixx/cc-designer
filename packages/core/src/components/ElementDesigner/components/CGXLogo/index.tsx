import { CcIcon, LightIcon, DarkIcon, GithubIcon } from "@cgx-designer/icons";
import { logoName } from "../../../../constant/index";
import { inject } from "vue";
import { ThemeManage } from "@cgx-designer/hooks/src/useTheme";
import { ElSwitch } from "element-plus";
import { MoveIcon } from "@cgx-designer/extensions";

const CGXLogo = () => {
  const themeManage = inject("themeManage") as ThemeManage;
  return (
    <div class="c-w-full c-h-10 c-bg-white c-flex c-items-center dark:c-bg-[#141414] c-px-8">
      <div class="c-flex-1 c-flex c-items-center">
        <CcIcon
          class="c-mr-1 c-w-[24px] c-h-[24px]"
          style={{
            filter: themeManage.isDark.value
              ? "drop-shadow(2px 2px 6px #409eff)"
              : "drop-shadow(2px 2px 6px #999999)",
          }}
        />
        <span
          class="dark:text-[#5a9cf8] c-font-semibold"
          style={{
            filter: themeManage.isDark.value
              ? "drop-shadow(2px 2px 6px #409eff)"
              : "drop-shadow(2px 2px 6px #999999)",
          }}
        >
          {logoName}
        </span>
      </div>
      <div class="c-flex-1 c-flex c-justify-end c-items-center c-gap-x-6">
        <span class="c-cursor-pointer">文档</span>
        <ElSwitch
          size="large"
          v-model={themeManage.isDark.value}
          inline-prompt
          active-action-icon={DarkIcon}
          inactive-action-icon={LightIcon}
        />
        <MoveIcon label="Github" onClick={() => window.open("/")}>
          <GithubIcon class="c-w-[26px] c-h-[26px] c-fill-black dark:c-fill-white" />
        </MoveIcon>
      </div>
    </div>
  );
};

export default CGXLogo;
