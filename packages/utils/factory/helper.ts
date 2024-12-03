import { format } from "prettier";

export const formatCode = (code: string, parser = "typescript") => {
  return format(code, {
    parser,
    semi: false,
    singleQuote: true,
  });
};
