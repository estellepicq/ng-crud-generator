import { Injectable } from '@angular/core';
import { {{{base}}} } from './{{{base_lowercase}}}.class';
import { {{{base}}}Dao } from './{{{base_lowercase}}}.dao';
import { {{{base}}}PayloadDto, {{{base}}}Dto } from './{{{base_lowercase}}}-dto.model';
import { SnackbarService } from 'app/shared/snackbar/snackbar.service';
import { Observable, tap } from 'rxjs';

@Injectable()
export class {{{base}}}Service {

  constructor(
    private readonly {{{base_lowercase}}}Dao: {{{base}}}Dao,
    private readonly snackbarService: SnackbarService,
  ) { }

  public getMany(searchParams: {{{base}}}PayloadDto): Observable<{{{base}}}Dto> {
    return this.{{{base_lowercase}}}Dao.getMany(searchParams).pipe(
      tap(this.handleError)
    );
  }

  public getOne(id: string): Observable<{{{base}}}> {
    return this.{{{base_lowercase}}}Dao.getOne(id).pipe(
      tap(this.handleError)
    );
  }

  public createOne(item: {{{base}}}): Observable<{ id: string }> {
    return this.{{{base_lowercase}}}Dao.createOne(item).pipe(
      tap(this.handleError)
    );
  }

  public updateOne(item: {{{base}}}): Observable<{ id: string }> {
    return this.{{{base_lowercase}}}Dao.updateOne(item).pipe(
      tap(this.handleError)
    );
  }

  public deleteOne(id: string): Observable<{ id: string }> {
    return this.{{{base_lowercase}}}Dao.deleteOne(id).pipe(
      tap(this.handleError)
    );
  }

  public deleteMany(ids: string[]): Observable<{ ids: string[] }> {
    return this.{{{base_lowercase}}}Dao.deleteMany(ids).pipe(
      tap(this.handleError)
    );
  }

  private handleError<T>(res: T): void {
    if (!res) {
      this.snackbarService.displayError();
    }
  }
}
