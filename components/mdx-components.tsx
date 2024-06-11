import * as runtime from "react/jsx-runtime";
import Image from "next/image";

import { Callout } from "./callout";
import { cn } from "@/lib/utils";

/**
 * Generate MDX string into React Component
 *
 * @param code MDX string
 * @returns React Component
 */
const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

// To allow us to use JSX inside MDX code
const components = {
  Image,
  Callout,
  /** you can customize the standard html tag whatever you want */
  //   h1: ({ className, ...props }) => (
  //     <h1
  //       className={cn(
  //         "mt-2 scroll-m-20 text-4xl font-bold tracking-tight text-red-500",
  //         className
  //       )}
  //       {...props}
  //     />
  //   ),
};

interface Props {
  code: string;
}

export function MDXContent({ code }: Props) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
