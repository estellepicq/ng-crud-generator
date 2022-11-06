import { NgModule } from '@angular/core';
import { {{{base}}}ListComponent } from './{{{base_lowercase}}}-list.component';
import { {{{base}}}Dao } from './{{{base_lowercase}}}.dao';
import { {{{base}}}Service } from './{{{base_lowercase}}}.service';

@NgModule({
  declarations: [{{{base}}}ListComponent],
  imports: [],
  providers: [
    {{{base}}}Dao,
    {{{base}}}Service
  ]
})
export class {{{base}}}Module { }
