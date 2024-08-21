// src/app/pipes/pipes.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToUpperCasePipe} from './to-uppercase.pipe'
import { DateFormatPipe } from './date-format.pipe';

@NgModule({
  declarations: [
    ToUpperCasePipe,
    DateFormatPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToUpperCasePipe,
    DateFormatPipe
  ]
})
export class PipesModule { }
