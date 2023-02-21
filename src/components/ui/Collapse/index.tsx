import { Children, createContext, PropsWithChildren, useEffect, useRef, useState } from "react"
import { joinClass } from "../../utility/joinClass"
import "./style.css"

export type CollapseProps = PropsWithChildren<{
    appear?: boolean, 
    disapear?: boolean,
    onClose?: () => void,
    onOpen?: () => void  
}>

export const CollapseContent = createContext<{open: () => void, close: () => void, state: boolean}>({open: ()=> {}, close: () => {}, state: false})

export const Collapse = (props: CollapseProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const [state, setState] = useState(!!props.appear)
    const open = () => {
        props.onOpen  && props.onOpen() 
        setState(true)
    }
    const close = () => {
        props.onClose && props.onClose();
        setState(false);
    }
    const value = {open, close, state}
    const hasChildren = Children.count(props.children) > 0
    const className = joinClass("collapse", !hasChildren && props.disapear ? "disappear" : undefined, state ? "appear" :  undefined)
    return (
      <CollapseContent.Provider value={value}>
        <div ref={ref} className={className}>{props.children}</div>
      </CollapseContent.Provider>
    );
}