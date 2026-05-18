import { Component } from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent {
  barChartData = {

    labels: [
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sun'
    ],

    datasets: [

      {
        data: [
          1200,
          1900,
          800,
          2200,
          3100,
          2800,
          3500
        ],

        label: 'Revenue'
      }

    ]

  };

}
