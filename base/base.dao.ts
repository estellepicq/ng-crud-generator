import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { catchError } from 'rxjs/operators';
import { {{{base}}} } from './{{{base_lowercase}}}.class';
import { {{{base}}}PayloadDto, {{{base}}}Dto } from './{{{base_lowercase}}}-dto.model';

@Injectable()
export class {{{base}}}Dao {
  private readonly endPoint: string = environment.endPoint + '{{{base_lowercase}}}';

  constructor(
    private readonly http: HttpClient
  ) { }

  public getMany(searchParams: {{{base}}}PayloadDto): Observable<{{{base}}}Dto> {
    let params = new HttpParams();
    params = params.appendAll(searchParams as any);
    return this.http.get<{{{base}}}Dto>(this.endPoint, {params}).pipe(
      catchError(() => of(null))
    );
  }

  public getOne(id: string): Observable<{{{base}}}> {
    return this.http.get<{{{base}}}>(`${this.endPoint}/${id}`).pipe(
      catchError(() => of(null))
    );
  }

  public createOne(item: {{{base}}}): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(this.endPoint, item).pipe(
      catchError(() => of(null))
    );
  }

  public updateOne(item: {{{base}}}): Observable<{ id: string }> {
    return this.http.patch<{ id: string }>(this.endPoint, item).pipe(
      catchError(() => of(null))
    );
  }

  public deleteOne(id: string): Observable<{ id: string }> {
    return this.http.delete<{ id: string }>(`${this.endPoint}/${id}`).pipe(
      catchError(() => of(null))
    );
  }

  public deleteMany(ids: string[]): Observable<{ ids: string[] }> {
    return this.http.delete<{ ids: string[] }>(`${this.endPoint}/${ids.toString()}`).pipe(
      catchError(() => of(null))
    );
  }
}
