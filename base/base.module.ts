import { NgModule } from '@angular/core';
import { {{{base_plural_capitalized}}}Component } from './{{{base_lowercase}}}.component';
import { {{{base_plural_capitalized}}}Service } from './{{{base_lowercase}}}.service';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [{{{base_plural_capitalized}}}Component],
  imports: [
    SharedModule
  ],
  providers: [
    {{{base_plural_capitalized}}}Service
  ]
})
export class {{{base_plural_capitalized}}}Module { }
