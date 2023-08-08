export function convertToDate(str) {
    const [datePart, timePart] = str.split(' ');
    const [month, day, year] = datePart.split('-');
    const timeValue = timePart.slice(0, -2);
    const period = timePart.slice(-2);
    let [hours, minutes] = timeValue.split(':');

    if (period === 'PM') {
        hours = (hours % 12) + 12;
    } else {
        hours = hours % 12;
    }

    return new Date(year, month - 1, day, hours, minutes);
}

export function getFormattedBusinessDays(business_hours) {
  const days = business_hours.days;

  // Definimos el orden correcto de los días de la semana
  const weekDaysOrder = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  // Ordenamos los días según el orden correcto
  const orderedDays = weekDaysOrder.filter((day) => days.includes(day));

  // Agrupamos los días consecutivos
  const dayGroups = [];
  let currentGroup = [];

  for (let i = 0; i < orderedDays.length; i++) {
    if (currentGroup.length === 0) {
      currentGroup.push(orderedDays[i]);
    } else if (
      weekDaysOrder.indexOf(orderedDays[i]) -
        weekDaysOrder.indexOf(currentGroup[currentGroup.length - 1]) ===
      1
    ) {
      currentGroup.push(orderedDays[i]);
    } else {
      dayGroups.push(currentGroup);
      currentGroup = [orderedDays[i]];
    }
  }
  dayGroups.push(currentGroup);

  // Formateamos para mostrar
  const formattedDays = dayGroups
    .map((group) => (group.length > 1 ? `${group[0]} a ${group[group.length - 1]}` : group[0]))
    .join(", ");

  return `Abierto de ${formattedDays} ${business_hours.from} - ${business_hours.to}`;
}