import { ToastProgrammatic as Toast } from 'buefy'
export function showToastMessage(message, type) {
    Toast.open({
        duration: 5000,
        message: message,
        position: "is-top",
        type: type,
    });
}