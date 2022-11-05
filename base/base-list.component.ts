import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ConfirmationDialogService } from 'app/shared/dialog/confirmation-dialog.service';
import { ObservableDestroyComponent } from 'app/shared/observable-destroy/observable-destroy.component';
import { {{{base}}} } from './{{{base|lowercase}}}.class';
import { {{{base}}}PayloadDto, {{{base}}}Dto } from './{{{base|lowercase}}}-dto.model';
import { {{{base}}}Service } from './{{{base|lowercase}}}.service';
import { {{{base|uppercase}}}_CONFIG } from './{{{base|lowercase}}}-config';

@Component({
  selector: 'app-{{{base|lowercase}}}-list',
  templateUrl: './{{{base|lowercase}}}-list.component.html',
  styleUrls: ['./{{{base|lowercase}}}-list.component.scss']
})
export class {{{base}}}ListComponent extends ObservableDestroyComponent implements OnInit {

  public readonly config = {{{base|uppercase}}}_CONFIG;
  public readonly entity = {{{base}}};

  public {{{base|plural}}}: {{{base}}}[] = [];
  public totalRecords: number;
  public loading = true;

  private loadData$: BehaviorSubject<{{{base}}}PayloadDto> = new BehaviorSubject(null);
  private payload: {{{base}}}PayloadDto;

  constructor(
    private readonly confirmationDialogService: ConfirmationDialogService,
    private readonly {{{base|lowercase}}}Service: {{{base}}}Service,
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadData$.pipe(
      tap(() => this.loading = true),
      debounceTime(500),
      switchMap((event) => this.{{{base|lowercase}}}Service.getMany(event)),
      takeUntil(this.destroyed$)
    ).subscribe(response => {
      this.setList(response);
    });
  }

  public loadData(event: LazyLoadEvent): void {
    this.payload = {
      first: event.first,
      rows: event.rows,
      sortOrder: event.sortOrder as 1 | -1,
      sortField: event.sortField,
      filters: event.filters ? JSON.stringify(event.filters) : ''
    };
    this.loadData$.next(this.payload);
  }

  public onDelete(ids: string[]): void {
    const deleteCb = () => this.deleteMany(ids);
    this.confirmationDialogService.open(
      {
        message: 'You are about to delete one or more {{{base|lowercase}}}. Continue?',
        accept: deleteCb
      },
    );
  }

  public onSave(item: {{{base}}}): void {
    if (item.id) {
      this.update(item);
    } else {
      this.create(item);
    }
  }

  private create(item: {{{base}}}): void {
    this.{{{base|lowercase}}}Service.create(item).subscribe(response => {
      console.log(response);
    });
  }

  private update(item: {{{base}}}): void {
    this.{{{base|lowercase}}}Service.update(item).subscribe(response => {
      if (response.id) {
        this.loadData$.next(this.payload);
      }
    });
  }

  private deleteMany(ids: string[]): void {
    this.{{{base|lowercase}}}Service.deleteMany(ids).subscribe(response => {
      if (response.ids) {
        this.loadData$.next(this.payload);
      }
    });
  }

  private setList(response: {{{base}}}Dto): void {
    this.{{{base|plural}}} = response?.data || [];
    this.totalRecords = Number(response?.totalRecords || 0);
    this.loading = false;
  }
}
