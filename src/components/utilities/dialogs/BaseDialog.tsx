import { FC, ReactNode } from "react";

export type TDialog = FC<TDialogProps>
export type TDialogProps = {
  children?: ReactNode
}
const BaseDialog: TDialog = ({ children }) => {
  return (
    <div>
      Dialog
      {children}
    </div>
  )
}
export default BaseDialog;