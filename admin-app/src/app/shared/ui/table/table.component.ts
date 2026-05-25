import {

  Component,
  EventEmitter,
  Input,
  Output

} from '@angular/core';

@Component({

  selector: 'app-table',

  templateUrl:
    './table.component.html',

  styleUrls:
    ['./table.component.scss']

})
export class TableComponent {

  @Input()
  columns: any[] = [];

  @Input()
  data: any[] = [];

  @Input()
  loading = false;

  @Input()
  total = 0;

  @Input()
  page = 1;

  @Input()
  limit = 10;

  @Output()
  pageChange =
    new EventEmitter<number>();

  changePage(
    page: number
  ): void {

    this.pageChange.emit(
      page
    );

  }

}