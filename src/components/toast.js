import React, { useRef } from "react";

const useToast = () => {
  const toast = useRef(null);
  const lista = [];
  const showMessage = (tipo, title, msgs) => {

    if (Array.isArray(msgs)) {
      msgs.forEach(msg => {
        lista.push({ severity: tipo, summary: title, detail: msg, life: 3000 })
      });
      toast.current.show(lista);
    } else {
      toast.current.show({ severity: tipo, summary: title, detail: msgs, life: 3000 });
    }


  }

  const showMessageSuccess = (msg) => {
    showMessage('success', 'Sucesso', msg)
  }

  const showMessageAlert = (msg) => {
    showMessage('warn', 'Alerta', msg);
  }

  const showMessageError = (msgs) => {
    showMessage('error', 'Erro', msgs);
  }

  return { showMessage, showMessageSuccess, showMessageAlert, showMessageError, toast };
}
export default useToast;

