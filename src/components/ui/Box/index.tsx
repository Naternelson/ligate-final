import {
  CSSProperties,
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
} from "react";
import { joinClass } from "../../utility/joinClass";
import "./style.css";

export type BoxProps = PropsWithChildren<{
  id?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler;
  onHover?: string;
  fullPage?: boolean;
  container?: boolean;
}>;

export const Box = forwardRef(
  (props: PropsWithChildren<BoxProps>, ref: ForwardedRef<HTMLDivElement>) => {
    const { children, className, onHover, fullPage, container, ...bProps } =
      props;

    const divProps: DetailedHTMLProps<
      HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > = bProps;

    if (onHover) {
      divProps.onMouseOver = (e) => {
        e.currentTarget.classList.add(onHover);
      };
      divProps.onMouseLeave = (e) => {
        e.currentTarget.classList.remove(onHover);
      };
    }

    divProps.className = joinClass(
      container ? "container" : undefined,
      fullPage ? "fullpage" : undefined,
      className
    );
    return (
      <div {...divProps} ref={ref}>
        {children}
      </div>
    );
  }
);
