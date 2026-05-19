import {

  Component,

  Input,

  Output,

  EventEmitter

} from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl:
    './data-table.component.html',

  styleUrls: [
    './data-table.component.scss'
  ]
})

export class DataTableComponent {

  @Input() columns: any[] = [];

  @Input() rows: any[] = [];

  @Input() loading = false;

  @Input() getActions:
  any;

@Output() actionClick =
  new EventEmitter<any>();
  @Output() rowClick =
  new EventEmitter<any>();

}