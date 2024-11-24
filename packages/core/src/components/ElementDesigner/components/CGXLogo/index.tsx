import { CcIcon } from "@cgx-designer/icons";
import { logoName } from "../../../../constant/index";

const CGXLogo = () => {
  return (
    <div class="w-full h-10 bg-white flex justify-center items-center dark:bg-[#141414]">
      <CcIcon class="mr-1 w-[18px] h-[18px]" />
      <span>{logoName}</span>
    </div>
  );
};

export default CGXLogo;
