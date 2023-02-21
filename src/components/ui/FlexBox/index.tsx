import { ForwardedRef, forwardRef, PropsWithChildren, useRef } from "react";
import { Box, BoxProps } from "../Box"
import { joinClass } from "../../utility/joinClass";
import "./style.css"

export type FlexBoxProps = BoxProps & {
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  justifyContent?: "center" | "start" | "end" | "left" | "right" | "normal" | "space-between" | "space-around" | "space-evenly" | "stretch",
  alignItems?: "normal" | "stretch" | "center" | "start" | "end" | "baseline",
  center?: boolean 
};

export const FlexBox = forwardRef((props: PropsWithChildren<FlexBoxProps>, ref:ForwardedRef<HTMLDivElement>) => {
    const {direction, justifyContent, alignItems, className, center, children, ...boxProps} = props
    const dClass = direction ? `flex-d-${direction}` : undefined 
    const jClass = justifyContent ? `flex-j-${justifyContent}` : undefined 
    const aClass = alignItems ? `flex-a-${alignItems}`: undefined
    const cName = center ? joinClass("flex", dClass, "flex-j-center", "flex-a-center", className) : joinClass("flex", dClass, jClass, aClass, className) 
    const p:BoxProps = {...boxProps, className: cName}
    return <Box {...p} ref={ref}>{children}</Box>;
})
