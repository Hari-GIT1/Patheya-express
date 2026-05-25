import {

  Component,
  Input

} from '@angular/core';

@Component({

  selector: 'app-revenue-chart',

  templateUrl:
    './revenue-chart.component.html',

  styleUrls:
    ['./revenue-chart.component.scss']

})
export class RevenueChartComponent {

  @Input()
  chartData: any;

}