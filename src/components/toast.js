import { useRef } from "react";

const useToast = () => {
  const toast = useRef(null);

  const showMessage = (tipo, title, msg) => {
    toast.current.show({ severity: tipo, summary: title, detail: msg, life: 2000 });
  }

  const showMessageSuccess = (msg) => {
    showMessage('success', 'Sucesso', msg)
  }

  const showMessageAlert = (msg) => {
    showMessage('warn', 'Alerta', msg);
  }

  const showMessageError = (msg) => {
    showMessage('error', 'Erro', msg);
  }

  return { showMessage, showMessageSuccess, showMessageAlert, showMessageError, toast };
}
export default useToast;

