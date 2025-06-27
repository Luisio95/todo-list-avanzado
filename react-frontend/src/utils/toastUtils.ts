// utils/toastUtils.ts
import { Toast } from "primereact/toast";
import { type RefObject } from "react";

type ToastRef = RefObject<Toast | null>;

export const showErrorToast = (toastRef: ToastRef, message: string) => {
  toastRef.current?.show({
    severity: "error",
    summary: "Error",
    detail: message,
    life: 3000,
  });
};

export const showSuccessToast = (toastRef: ToastRef, message: string) => {
  toastRef.current?.show({
    severity: "success",
    summary: "Éxito",
    detail: message,
    life: 3000,
  });
};
