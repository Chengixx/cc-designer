import { CcIcon } from "@cgx-designer/icons";
import { logoName } from "../../../../constant/index";

const CGXLogo = () => {
  return (
    <div class="w-full h-10  flex justify-center items-center">
      <CcIcon class="mr-1 w-[18px] h-[18px]" />
      <span>{logoName}</span>
    </div>
  );
};

export default CGXLogo;
