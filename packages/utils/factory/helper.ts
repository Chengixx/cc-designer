//Todo 只能在node环境下使用啊
import { format } from "prettier";

export const formatCode = (code: string, parser = "typescript") => {
  return format(code, {
    parser,
    semi: false,
    singleQuote: true,
  });
};
