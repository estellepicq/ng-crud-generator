import { NgModule } from '@angular/core';
import { {{{base}}}ListComponent } from './{{{base|lowercase}}}-list.component';
import { {{{base}}}Dao } from './{{{base|lowercase}}}.dao';
import { {{{base}}}Service } from './{{{base|lowercase}}}.service';

@NgModule({
  declarations: [{{{base}}}ListComponent],
  imports: [],
  providers: [
    {{{base}}}Dao,
    {{{base}}}Service
  ]
})
export class {{{base}}}Module { }
