import { {{{base}}} } from './{{{base|lowercase}}}.class';

export interface {{{base}}}Dto {
  data: {{{base}}}[];
  totalRecords: string;
}

export interface {{{base}}}PayloadDto {
  first: number;
  rows: number;
  sortOrder: -1 | 1;
  sortField: string;
  filters: string;
}