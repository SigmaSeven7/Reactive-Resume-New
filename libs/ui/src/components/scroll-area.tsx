// import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
// import { cn } from "@reactive-resume/utils";
// import { forwardRef } from "react";

// export const ScrollArea = forwardRef<
//   React.ElementRef<typeof ScrollAreaPrimitive.Root>,
//   React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
//     hideScrollbar?: boolean;
//     orientation?: "vertical" | "horizontal";
//   }
// >(
//   (
//     {
//       type = "scroll",
//       orientation = "vertical",
//       hideScrollbar = false,
//       className,
//       children,
//       dir,
//       ...props
//     },
//     ref,
//   ) => (
//     <ScrollAreaPrimitive.Root
//       ref={ref}
//       type={type}
//       className={cn("relative overflow-hidden", className)}
//       dir={dir}
//       {...props}
//     >
//       <ScrollAreaPrimitive.Viewport dir={dir} className="size-full rounded-[inherit] ll">
//         {children}
//       </ScrollAreaPrimitive.Viewport>
//       <ScrollBar orientation={orientation} className={cn(hideScrollbar && "opacity-0")} />
//       <ScrollAreaPrimitive.Corner />
//     </ScrollAreaPrimitive.Root>
//   ),
// );

// ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

// export const ScrollBar = forwardRef<
//   React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
//   React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
// >(({ className, orientation, ...props }, ref) => (
//   <ScrollAreaPrimitive.ScrollAreaScrollbar
//     ref={ref}
//     orientation={orientation}
//     className={cn(
//       "flex touch-none select-none transition-colors",
//       orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-px",
//       orientation === "horizontal" && "h-2.5 border-t border-t-transparent p-px",
//       className,
//     )}
//     {...props}
//   >
//     <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
//   </ScrollAreaPrimitive.ScrollAreaScrollbar>
// ));

// ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@reactive-resume/utils";
import { forwardRef, useEffect, useState } from "react";

type Direction = "ltr" | "rtl";
export const ScrollArea = forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
    hideScrollbar?: boolean;
    orientation?: "vertical" | "horizontal";
  }
>(
  (
    {
      type = "scroll",
      orientation = "vertical",
      hideScrollbar = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [dir, setDir] = useState<Direction>(() => {
      const htmlElement = document.querySelector("html");
      return (htmlElement?.dataset.dir ?? "ltr") as Direction;
    });

    useEffect(() => {
      const htmlElement = document.querySelector("html");

      const observer = new MutationObserver(() => {
        if (htmlElement) {
          const newDir = (htmlElement.dataset.dir ?? "ltr") as Direction;
          setDir(newDir);
        }
      });

      if (htmlElement) {
        observer.observe(htmlElement, {
          attributes: true,
          attributeFilter: ["dir"],
        });
      }

      return () => {
        observer.disconnect();
      };
    }, []);
    return (
      <ScrollAreaPrimitive.Root
        ref={ref}
        type={type}
        className={cn("relative overflow-hidden", className)}
        dir={dir}
        {...props}
      >
        <ScrollAreaPrimitive.Viewport dir={dir} className="size-full rounded-[inherit]">
          {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar orientation={orientation} className={cn(hideScrollbar && "opacity-0")} />
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>
    );
  },
);

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

export const ScrollBar = forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation, ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-px",
      orientation === "horizontal" && "h-2.5 border-t border-t-transparent p-px",
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
