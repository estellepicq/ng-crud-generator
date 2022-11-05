import { Injectable } from '@angular/core';
import { {{{base}}} } from './{{{base|lowercase}}}.class';
import { {{{base}}}Dao } from './{{{base|lowercase}}}.dao';
import { {{{base}}}PayloadDto, {{{base}}}Dto } from './{{{base|lowercase}}}-dto.model';
// import { SnackbarService } from 'app/shared/snackbar/snackbar.service';
import { Observable } from 'rxjs';

@Injectable()
export class {{{base}}}Service {

  constructor(
    private readonly {{{base|lowercase}}}Dao: {{{base}}}Dao,
    // private readonly snackbarService: SnackbarService,
  ) { }

  public getMany(searchParams: {{{base}}}PayloadDto): Observable<{{{base}}}Dto> {
    return this.{{{base|lowercase}}}Dao.getMany(searchParams);
  }

  public getOne(id: string): Observable<{{{base}}}> {
    return this.{{{base|lowercase}}}Dao.getOne(id);
  }

  public create{{{base}}}(item: {{{base}}}): Observable<{ id: string }> {
    return this.{{{base|lowercase}}}Dao.create(item);
  }

  public update(item: {{{base}}}): Observable<{ id: string }> {
    return this.{{{base|lowercase}}}Dao.update(item);
  }

  public deleteOne(id: string): Observable<{ id: string }> {
    return this.{{{base|lowercase}}}Dao.delete(id);
  }

  public deleteMany{{{base}}}(ids: string[]): Observable<{ ids: string[] }> {
    return this.{{{base|lowercase}}}Dao.deleteMany(ids);
  }
}
