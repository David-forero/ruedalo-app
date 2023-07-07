export const formatDollar = (amount) => {
  // convierte el número a una cadena
  let numberString = amount.toFixed(2);

  // Divide la cadena en partes enteras y decimales
  let [whole, decimal] = numberString.split('.');

  // Añade comas a la parte entera
  whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Junta las partes entera y decimal y añade el signo del dólar
  return "$" + whole + "." + decimal;
};
