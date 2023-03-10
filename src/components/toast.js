import React, { useRef } from "react";

export function useToast() {
    const toast = useRef(null);
  
    function showMessage(tipo, title, msg) {
      toast.current.show({ severity: tipo, summary: title, detail: msg, life: 3000 });
    }
  
    function showMessageSuccess(msg) {
      showMessage('success', 'Sucesso', msg)
    }
  
    function showMessageAlert(msg) {
      showMessage('warn', 'Alerta', msg)
    }
  
    function showMessageError(msg) {
      showMessage('error', 'Error', msg)
    }
  
    return {
      showMessageSuccess,
      showMessageAlert,
      showMessageError
    }
  }
  



