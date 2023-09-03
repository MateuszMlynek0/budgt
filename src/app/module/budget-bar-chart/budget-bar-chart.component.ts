import { Component, Input, OnChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { UserIncome } from 'src/app/shared/model/iuserIncomes';
import { UserExpenses } from 'src/app/shared/model/iUserExpenses';
import * as moment from 'moment';


@Component({
  selector: 'app-budget-bar-chart',
  templateUrl: './budget-bar-chart.component.html',
  styleUrls: ['./budget-bar-chart.component.sass']
})
export class BudgetBarChartComponent implements OnChanges {
  public options: EChartsOption;
  @Input() dataZoomEnabled: boolean = false;
  public categoryOptions: EChartsOption;
  @Input() userIncomes: UserIncome[] = [];
  @Input() legendEnabled: boolean = false;
  @Input() axesEnabled: boolean = false;
  @Input() userExpenses: UserExpenses[] = [];
  public result: any;

  chartOption: EChartsOption
  public isMobile = false;
  public thingsByMeasurementTag: Map<string, any> = new Map();
  public labelOption: any = {
    show: true,
    position: 'inside',
    distance: 15,
    align: 'center',
    verticalAlign: 'top',
    rotate: 90,
    formatter: '{c}  {name|{a}}',
    fontSize: 16,
    rich: {
      name: {}
    }
  };
  
  ngOnChanges() {
    this.loadData()
    this.data()
  }

  private loadData() {
    this.createChartOptions();
  }

  private createChartOptions() {
    this.options = {
      color: [ '#AF9FEF','#6202EE','#757575','#BC86FC'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Expenses', 'Income']
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Expenses',
          type: 'bar',
          barGap: 0,
          emphasis: {
            focus: 'series'
          },
          data: this.getUserExpenses()
        },
        {
          name: 'Income',
          type: 'bar',
          emphasis: {
            focus: 'series'
          },
          data: this.getUserIncomes()
        }
      ]
    };
  }

  public getUserExpenses() { 
    let userExpenses: {};
    if(this.userExpenses.length > 0) {
      return userExpenses = this.userExpenses.map(data => {
        return ([moment(data.date, 'DD-MM-YYYY').format("MMM"), data.expense]);
      })
    }
    return; 
  }

  public getUserIncomes() { 
    let userIncomes: {};
    if(this.userIncomes.length > 0) {
      return userIncomes = this.userIncomes.map(data => {
        return ([moment(data.date, 'DD-MM-YYYY').format("MMM"), data.income]);
      })
    }
    return;
  }

  public data(){
    let arr = [...this.userIncomes,...this.userExpenses];
    let result:any = new Map; 
    arr.map((element: any) => {   
      if (result.get(element.category))  
        result.set(element.category, result.get(element.category) + 1);   
      else  
        result.set(element.category, 1); 
    });
    // let newArr =  [...result].map(([category, value]) => ({ category, value }));

    return result;
  }
}
