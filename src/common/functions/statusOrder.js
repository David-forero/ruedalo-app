export default function statusOrder(status) {
  switch (status) {
    case "waitingP":
      return "Esperando Pago";
    case "in_process":
      return "En proceso";
    case "product_send":
      return "Producto enviado";
    case "completed":
      return "Completado";
    default:
      break;
  }
}
