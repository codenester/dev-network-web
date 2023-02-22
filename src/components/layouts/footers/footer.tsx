import { FC, ReactNode } from "react";

const Footer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}
export default Footer;