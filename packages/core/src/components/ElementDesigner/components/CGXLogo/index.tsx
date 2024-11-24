import { CcIcon } from "@cgx-designer/icons";
import { logoName } from "../../../../constant/index";

const CGXLogo = () => {
  return (
    <div class="w-full h-10 bg-white flex items-center dark:bg-darkMode pl-8 pr-4">
      <div class="flex-1 flex items-center">
        <CcIcon
          class="mr-1 w-[24px] h-[24px]"
          // #3c3c3c
          style={{ filter: "drop-shadow(2px 2px 6px #409eff)" }}
        />
        <span
          class="dark:text-[#5a9cf8]"
          style={{ filter: "drop-shadow(2px 2px 6px #409eff)" }}
        >
          {logoName}
        </span>
      </div>
      <div class="flex-1 flex justify-end">帮助</div>
    </div>
  );
};

export default CGXLogo;
