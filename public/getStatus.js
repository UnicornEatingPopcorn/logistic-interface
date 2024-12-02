export default function getStatusClass(status) {
  switch (status) {
    case "В пути":
      return "btn-primary";
    case "Ожидает отправки":
      return "btn-warning";
    case "Доставлен":
      return "btn-success";
    default:
      return "btn-secondary";
  }
}
