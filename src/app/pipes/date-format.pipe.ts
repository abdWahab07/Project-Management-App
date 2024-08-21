import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | Date, format: 'full' | 'long' | 'medium' | 'short' = 'medium'): string {
    if (!value) return '';
    const date = new Date(value);

    const dateStyle: Record<'full' | 'long' | 'medium' | 'short', 'full' | 'long' | 'medium' | 'short'> = {
      full: 'full',
      long: 'long',
      medium: 'medium',
      short: 'short'
    };

    return date.toLocaleDateString('en-US', { dateStyle: dateStyle[format] });
  }
}
