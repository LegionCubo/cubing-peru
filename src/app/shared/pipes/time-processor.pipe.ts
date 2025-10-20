import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeProcessor',
})
export class TimeProcessorPipe implements PipeTransform {

  transform(value: number, cat:string = "", modality:string =""): unknown {
    if(value == 0)return ''
    if(value == -1)return 'DNF'
    if(value == -2)return 'DNS'
    if(cat == "333fm" && modality=="") return value
    if(cat == "333mbf") {
      const segundosTotales = Math.floor((value % 10000000) / 100);
      const minutos = Math.floor(segundosTotales / 60);
      const segundos = segundosTotales % 60;

      const segundosStr = String(segundos).padStart(2, '0'); // "07" si segundos = 7
      const minutosStr = String(minutos).padStart(2, '0');   // opcional, "01" en vez de "1"

      const cubosNoResueltos = Math.floor(value % 100);
      const cubosResueltos = 99 - Math.floor(value / 10000000) + cubosNoResueltos;

      return `${cubosResueltos}/${cubosResueltos + cubosNoResueltos} ${minutosStr}:${segundosStr}`;
    }
    const segundos = value * 0.01
    const minutos = Math.floor(segundos / 60)
    if(segundos>=60){

      const restarSegundos = segundos - (minutos * 60)
       return `${minutos>=1? minutos.toFixed(0)+':':''}${restarSegundos < 10 ? '0' + restarSegundos.toFixed(2) : restarSegundos.toFixed(2)}`
    }
   return segundos.toFixed(2)
  }

}
