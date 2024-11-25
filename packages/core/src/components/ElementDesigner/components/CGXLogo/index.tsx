import { CcIcon } from "@cgx-designer/icons";
import { logoName } from "../../../../constant/index";
import { inject } from "vue";
import { ThemeManage } from "@cgx-designer/hooks/src/useTheme";

const CGXLogo = () => {
  const themeManage = inject("themeManage") as ThemeManage;
  return (
    <div class="w-full h-10 bg-white flex items-center dark:bg-darkMode pl-8 pr-4">
      <div class="flex-1 flex items-center">
        <CcIcon
          class="mr-1 w-[24px] h-[24px]"
          // #3c3c3c
          style={{
            filter: themeManage.isDark.value
              ? "drop-shadow(2px 2px 6px #409eff)"
              : "drop-shadow(2px 2px 6px #3c3c3c)",
          }}
        />
        <span
          class="dark:text-[#5a9cf8]"
          style={{
            filter: themeManage.isDark.value
              ? "drop-shadow(2px 2px 6px #409eff)"
              : "drop-shadow(2px 2px 6px #3c3c3c)",
          }}
        >
          {logoName}
        </span>
      </div>
      <div class="flex-1 flex justify-end">帮助</div>
    </div>
  );
};

export default CGXLogo;
