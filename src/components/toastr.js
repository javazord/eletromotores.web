import toastr from "toastr"

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

export function showMessage(title, msg, tipo) {
    toastr[tipo](msg, title)
}

export function showMessageError(msg) {
    showMessage('Erro', msg, 'error')
}

export function showMessageSuccess(msg) {
    showMessage('Sucesso', msg, 'success')
}

export function showMessageAlert(msg){
    showMessage('Alerta', msg, 'warning')
}