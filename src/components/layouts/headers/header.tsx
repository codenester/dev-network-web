import { FC, Fragment, PropsWithChildren, ReactNode } from "react";
const Header: FC<{ children: ReactNode }> = ({ children }) => {
    return (<Fragment>
        {children}
    </Fragment>)
}
export default Header;