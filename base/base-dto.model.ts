import { {{{base_capitalized}}} } from './{{{base_lowercase}}}.class';
import { TableLazyLoadEvent } from 'app/shared/ui/table/table-lazyload-event.model';

export interface {{{base_plural_capitalized}}}Dto {
  data: {{{base_capitalized}}}[];
  totalRecords: string;
}

export interface {{{base_plural_capitalized}}}PayloadDto extends TableLazyLoadEvent {
}