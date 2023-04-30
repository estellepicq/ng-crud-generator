import { Component } from '@angular/core';
import { {{{base_capitalized}}} } from './{{{base_lowercase}}}.class';
import { {{{base_plural_capitalized}}}Service } from './{{{base_lowercase}}}.service';
import { {{{base_uppercase}}}_CONFIG } from './{{{base_lowercase}}}-config';
import { TableLazyLoadEvent } from 'app/shared/ui/table/table-lazyload-event.model';
import { HttpCalls } from 'app/shared/ui/table/table-loader.class';
import { Observable, of, map } from 'rxjs';

@Component({
  selector: 'app-{{{base_lowercase}}}',
  templateUrl: './{{{base_lowercase}}}.component.html'
})
export class {{{base_plural_capitalized}}}Component {

  public readonly conf = {{{base_uppercase}}}_CONFIG;
  public readonly entity = {{{base_capitalized}}};

  private get: (e: TableLazyLoadEvent) => Observable<{ data: {{{base_capitalized}}}[]; total: number }> = (e) => e ?
    this.{{{base_plural}}}Service.getMany(e).pipe(
      map((res) => res ? ({ data: res.data, total: +res.totalRecords }) : ({ data: [], total: 0 }))
    ) :
    of({ data: [], total: 0 });

  public httpCalls: HttpCalls<{{{base_capitalized}}}> = {
    get: (e) => this.get(e),
    create: ({{{base_lowercase}}}: {{{base_capitalized}}}) => this.{{{base_plural}}}Service.createOne({{{base_lowercase}}}),
    delete: (ids: (string | number)[]) => this.{{{base_plural}}}Service.deleteMany(ids as number[]),
    update: ({{{base_lowercase}}}: {{{base_capitalized}}}) => this.{{{base_plural}}}Service.updateOne({{{base_lowercase}}})
  }

  constructor(
    private readonly {{{base_plural}}}Service: {{{base_plural_capitalized}}}Service,
  ) {}

}
