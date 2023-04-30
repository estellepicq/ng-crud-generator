import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { {{{base_capitalized}}} } from './{{{base_lowercase}}}.class';
import { {{{base_plural_capitalized}}}PayloadDto, {{{base_plural_capitalized}}}Dto } from './{{{base_lowercase}}}-dto.model';
import { SnackbarService } from 'app/shared/utils/snackbar/snackbar.service';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable()
export class {{{base_plural_capitalized}}}Service {

  private readonly endPoint: string = `${environment.apiGateway}{{{base_plural}}}`;

  constructor(
    private readonly http: HttpClient,
    private readonly snackbarService: SnackbarService,
  ) { }

  public getMany(searchParams: {{{base_plural_capitalized}}}PayloadDto): Observable<{{{base_plural_capitalized}}}Dto | null> {
    let params = new HttpParams();
    params = params.appendAll(searchParams as unknown as Record<string, string>);
    return this.http.get<{{{base_plural_capitalized}}}Dto>(this.endPoint, {params}).pipe(
      catchError(() => of(null)),
      tap(this.handleError)
    );
  }

  public getOne(id: string): Observable<{{{base_capitalized}}} | null> {
    return this.http.get<{{{base_capitalized}}}>(`${this.endPoint}/${id}`).pipe(
      catchError(() => of(null)),
      tap(this.handleError)
    );
  }

  public createOne(item: {{{base_capitalized}}}): Observable<{ id: string } | null> {
    return this.http.post<{ id: string }>(this.endPoint, item).pipe(
      catchError(() => of(null)),
      tap(this.handleError)
    );
  }

  public updateOne(item: {{{base_capitalized}}}): Observable<{ id: string } | null> {
    return this.http.patch<{ id: string }>(this.endPoint, item).pipe(
      catchError(() => of(null)),
      tap(this.handleError)
    );
  }

  public deleteOne(id: number): Observable<{ id: number } | null> {
    return this.http.delete<{ id: number }>(`${this.endPoint}/${id}`).pipe(
      catchError(() => of(null)),
      tap(this.handleError)
    );
  }

  public deleteMany(ids: number[]): Observable<{ ids: number[] } | null> {
    return this.http.delete<{ ids: number[] }>(`${this.endPoint}/${ids.toString()}`).pipe(
      catchError(() => of(null)),
      tap(this.handleError)
    );
  }

  private handleError<T>(res: T): void {
    if (!res) {
      this.snackbarService.displayError();
    }
  }
}
