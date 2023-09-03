import { Component, Input, OnChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-budget-pie-chart',
  templateUrl: './budget-pie-chart.component.html',
  styleUrls: ['./budget-pie-chart.component.sass']
})
export class BudgetPieChartComponent implements OnChanges {
  isMobile = this.deviceDetector.isMobile();
  public options: EChartsOption
  public chartData: any;
  @Input() data: any;
  constructor(private deviceDetector: DeviceDetectorService) { }

  ngOnChanges() {
    this.createChartOptions();
  }

  private createChartOptions() {
    let data:any = Object.values(this.data)[0]
    this.options = {
      color: [ '#AF9FEF','#6202EE', '#dec0f1', '#ffd6ff','#b79ced', '#957fef', '#c8b6ff', '#b8c0ff', '#bbd0ff'],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: "horizontal",
        left: 'center',
        bottom: '0',
        type: 'scroll',
      },
      series: [
        {
          height: '90%',
          name: 'Type',
          type: 'pie',
          radius: ['55%', '75%'],
          label: {
            show: !this.isMobile,
            alignTo: 'none',
            formatter: '{b} \n{d}%',
          },
          labelLine: {
            length: this.isMobile ? 0 : 10,
            length2: this.isMobile ? 0 : 10
          },
          data: data
        }
      ]
    };
  }

}
