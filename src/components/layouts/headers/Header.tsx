import { FC, Fragment, PropsWithChildren } from "react";
export type THeaderProps = PropsWithChildren & {
    name: string,
}
export type THeader = FC<THeaderProps>
const Header: THeader = ({ name, children }) => {
    return (<Fragment>
        <p>{name}</p>
        {children}
    </Fragment>)
}
export default Header;