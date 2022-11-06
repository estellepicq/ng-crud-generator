import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ConfirmationDialogService } from 'app/shared/dialog/confirmation-dialog.service';
import { ObservableDestroyComponent } from 'app/shared/observable-destroy/observable-destroy.component';
import { {{{base}}} } from './{{{base_lowercase}}}.class';
import { {{{base}}}PayloadDto, {{{base}}}Dto } from './{{{base_lowercase}}}-dto.model';
import { {{{base}}}Service } from './{{{base_lowercase}}}.service';
import { {{{base_uppercase}}}_CONFIG } from './{{{base_lowercase}}}-config';

@Component({
  selector: 'app-{{{base_lowercase}}}-list',
  templateUrl: './{{{base_lowercase}}}-list.component.html',
  styleUrls: ['./{{{base_lowercase}}}-list.component.scss']
})
export class {{{base}}}ListComponent extends ObservableDestroyComponent implements OnInit {

  public readonly config = {{{base_uppercase}}}_CONFIG;
  public readonly entity = {{{base}}};

  public {{{base_plural}}}: {{{base}}}[] = [];
  public totalRecords: number;
  public loading = true;

  private loadData$: BehaviorSubject<{{{base}}}PayloadDto> = new BehaviorSubject(null);
  private payload: {{{base}}}PayloadDto;

  constructor(
    private readonly confirmationDialogService: ConfirmationDialogService,
    private readonly {{{base_lowercase}}}Service: {{{base}}}Service,
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadData$.pipe(
      tap(() => this.loading = true),
      debounceTime(500),
      switchMap((event) => this.{{{base_lowercase}}}Service.getMany(event)),
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
        message: 'You are about to delete one or more {{{base_lowercase}}}. Continue?',
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
    this.{{{base_lowercase}}}Service.createOne(item).subscribe(response => {
      console.log(response);
    });
  }

  private update(item: {{{base}}}): void {
    this.{{{base_lowercase}}}Service.updateOne(item).subscribe(response => {
      if (response.id) {
        this.loadData$.next(this.payload);
      }
    });
  }

  private deleteMany(ids: string[]): void {
    this.{{{base_lowercase}}}Service.deleteMany(ids).subscribe(response => {
      if (response.ids) {
        this.loadData$.next(this.payload);
      }
    });
  }

  private setList(response: {{{base}}}Dto): void {
    this.{{{base_plural}}} = response?.data || [];
    this.totalRecords = Number(response?.totalRecords || 0);
    this.loading = false;
  }
}
