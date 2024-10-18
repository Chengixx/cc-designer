import SvgIcon from "../../../SvgIcon";
import { logoName } from "../../../../constant/index";

const CGXLogo = () => {
  return (
    <div class="w-full h-10  flex justify-center items-center border">
      <SvgIcon name="smile" class="mr-1" />
      <span>{logoName}</span>
    </div>
  );
};

export default CGXLogo;
