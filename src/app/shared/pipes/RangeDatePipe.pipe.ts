import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rangeDate'
})
export class RangeDatePipe implements PipeTransform {

  private months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

  transform(startDate: string | Date, endDate: string | Date): string {
    if (!startDate) return '';

    const start = new Date(startDate + 'T00:00:00');
    const end = endDate ? new Date(endDate + 'T00:00:00') : start;

    const startDay = start.getDate();
    const endDay = end.getDate();
    const startMonth = this.months[start.getMonth()];
    const endMonth = this.months[end.getMonth()];
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();

    // Caso: mismo día
    if (startDay === endDay && startMonth === endMonth && startYear === endYear) {
      return `${startDay} ${startMonth} ${startYear}`;
    }

    // Caso: mismo mes y año
    if (startMonth === endMonth && startYear === endYear) {
      return `${startDay} - ${endDay} ${startMonth} ${startYear}`;
    }

    // Caso: mismo año, distinto mes
    if (startYear === endYear) {
      return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${startYear}`;
    }

    // Caso: distinto año
    return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`;
  }
}
