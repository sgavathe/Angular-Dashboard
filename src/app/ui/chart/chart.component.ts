import { Component, OnInit, Input, AfterViewInit  } from '@angular/core';
import  * as c3 from 'c3';
import  * as d3 from 'd3';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit  {
  @Input() chartdivID: string = 'chart';
  @Input() chartType: string = 'type';
  constructor() { }

  ngOnInit() {
    console.log(this.chartdivID);
    if(this.chartType == 'pie'){
        let chart = c3.generate({
            bindto: '#' + this.chartdivID,
            size: {
                width: 800,
                height: 450
              },
            data: {
                columns: [
                    ['Disability Determination Services (DDS)', 707],
                    ['Headquarters (HQ)', 4250],
                    ['Office of Analytics, Review, and Oversight (OARO)', 1541],
                    ['Office of Budget, Finance, and Management (OBFM)', 3789],
                    ['Office of the Commissioner (OC)', 2174],
                    ['Office of the Chief Actuary (OCACT)', 1831],
                    ['Office of the Chief Information Officer (OCIO)', 682],
                    ['Office of Communications (OCOMM)', 384],
                    ['Office of the Chief Strategic Officer (OCSO)', 1697],
                    ['Office of the General Counsel (OGC)', 120],
                    ['Office of Hearings Operations (OHO)', 218],
                    ['Office of Human Resources (OHR)', 536],
                    ['Office of the Inspector General (OIG)', 820],
                    ['Office of Legislation and Congressional Affairs (OLCA)', 536],
                    ['Office of Operations (OO)', 980],
                    ['Office Quality Performance (OQP)', 890],
                    ['Office of Retirement and Disability Policy (ORDP)', 459],
                    ['Office of Systems (OS)', 850]

                ],
                type: 'pie'
            },           
            pie: {
                label: {
                    threshold: 0.001,
                    format: function (value, ratio, id) {
                        return d3.format(',')(value);
                    },
                }
            },
            // tooltip: {
            //     position: function (data, width, height, element) {
            //         // in this case, tooltip will appear x,30 and y:20
            //         return {
            //             top: 20, left: 30
            //         };
            //     }
            // },
            // onrendered: function() {
            //     d3.selectAll(".c3-chart-arc text").each(function(v) {
            //         var label = d3.select(this);
            //         var pos = label.attr("transform").match(/-?\d+(\.\d+)?/g);
            
            //         // pos[0] is x, pos[1] is y. Do some position changes and update value
            //         label.attr("transform", "translate("+ pos[0] +","+ pos[1] +")");
            //     });
            // },
            legend: {
                position: 'left'
            },
            // legend: {
            //     position: 'inset',
            //    inset: {
            //         anchor: 'top-right',
            //         x: 0,
            //         y: 0,
            //         step: 0
            //     }
            // }
        });

        // let toggle = function(id) {
        //     chart.toggle(id);
        // }
        // example2
        // d3.select('.containerII').insert('div', '.chartII').attr('class', 'legend').selectAll('div')
        // .data(['BOSTON', 'NEW YORK', 'PHILADELPHIA', 'ATLANTA', 'CHICAGO', 'DALLAS', 'KANSAS CITY', 'DENVER', 'SAN FRANCISCO', 'SEATTLE'])
        // .enter().append('div')
        // .attr('data-id', function(id) {
        // return id;
        // })
        // .html(function(id) {
        // return '<div style="width:7px; height:7px;border: 1px;display:inline-block; margin: 5px 10px 0 0;"></div>'+id;
        // })
        // .each(function(id) {
        // //d3.select(this).append('span').style
        // d3.select(this).select('div').style('background-color', chart.color(id)); //.style('width:', '7px').style('height:', '7px');        
        // })
        // .on('mouseover', function(id) {
        // chart.focus(id);
        // })
        // .on('mouseout', function(id) {
        // chart.revert();
        // })
        // .on('click', function(id) {
        // $(this).toggleClass("c3-legend-item-hidden")
        // chart.toggle(id);
        // });
    }else if(this.chartType == 'mixed'){
        let chart = c3.generate({
            bindto: '#' + this.chartdivID,
            // title: {
            //     text: 'Details for Chart' 
            // },
            size: {
            height: 400,
        //     width: 850
            },
            data: {
                x: 'x',
                columns: [
                ['x', "FY2013", "FY2014", "FY2015", "FY2016", "FY2017", "FY2018", "FY2019", "FY2020"],
                ['Claims', 2114268, 2053116, 2058323, 2105344, 2117177,2128971,2133452,2164533],
                ["Staff",2772,2603,2515,2519,2308,2425,2541,2691],
                ["Population",8799917,9018171,9205119,9397343,9569124,9897151,10176639,10460778],
                ],
                axes: {
                    Staff: 'y2'
                },
                type: 'bar',
                types: {
                    Claims: 'spline',
                    Staff: 'spline',
                    Population: 'bar',
                },
            },
            legend: {
            position: 'bottom-right'
            },
        //   legend: {
        //     inset: {
        //       anchor: 'top-right',
        //       x: 20,
        //       y: 10,
        //       step: 2
        //     }
        //   },
            zoom: {
                enabled: true
            },
            grid: {
                x: {
                    show: true
                },
                y: {
                    show: true
                }
            },
            axis: {
                y: {
                    label: {
                        text: 'Population vs Claims',
                        position: 'outer-middle'
                    },
                    // tick: {
                    //     format: d3.format(",.2r") // ADD
                    // }
                },
                y2: {
                    show: true,
                    label: {
                        text: 'Staff',
                        position: 'outer-middle'
                    }
                },
                x: {
                    type: 'category',
                    tick: {
                        rotate: 75,
                        multiline: false
                    },
                    height: 70
                }
            }
    
        });
    }else if (this.chartType == 'line'){
        let chart = c3.generate({
            bindto: '#' + this.chartdivID,
            // title: {
            //     text: 'Details for Chart' 
            // },
            size: {
            height: 400,
        //     width: 850
            },
            data: {
                x: 'x',
                columns: [
                
                ["OCD","T28","T28","T28","T28","T28","T28","T28","T28","T28","T28","T28","T28","T28"],
                ["x", "9/29/2017","10/27/2017","11/24/2017","12/29/2017","1/26/2018","2/23/2018","3/30/2018","4/27/2018","5/25/2018","6/29/2018","7/27/2018","8/31/2018","9/28/2018"],
                ["RECEIPTS", 5860,449,786,1268,1590,1950,2433,2750,3030,3387,3675,4141,4496],
                ["DISPOSITIONS", 5805,432,831,1316,1753,2197,2792,3289,3737,4264,4659,5143,5617],
                ["END_PENDING", 7554,7538,7588,7244,7065,6915,6601,6184,5883,5535,5427,5393,5186],
                ["AVAILABLE_AJLS", 12,10,10,10,10,10,10,10,10,10,10,10,10],
                ["AVG_DAYS_TILL_DISPOSITION", 593,572,569,568,571,573,571,570,572,574,573,570,567],
                ["PENDING_PER_ALJ", 686,684,689,658,642,628,600,562,534,503,493,490,471],
                ["DAILY_DISPOSITIONS_PER_ALJ", 1.91,2.17,2.14,2.05,2.11,2.13,2.16,2.19,2.18,2.17,2.15,2.12,2.14],
                ["AVG_AGE_OF_PENDING", 308,306,314,318,318,316,317,318,315,319,318,309,303]
              
                ],
                axes: {
                    MONTH_END: 'y2'
                },
                type: 'bar',
                types: {                   
                    RECEIPTS: 'spline',
                    DISPOSITIONS: 'spline',
                    END_PENDING: 'spline',
                    AVAILABLE_AJLS: 'spline',
                    AVG_DAYS_TILL_DISPOSITION: 'spline',
                    PENDING_PER_ALJ: 'spline',
                    DAILY_DISPOSITIONS_PER_ALJ: 'spline',
                    AVG_AGE_OF_PENDING: 'bar'                    
                },
            },
            legend: {
            position: 'bottom-right'
            },
        //   legend: {
        //     inset: {
        //       anchor: 'top-right',
        //       x: 20,
        //       y: 10,
        //       step: 2
        //     }
        //   },
            zoom: {
                enabled: true
            },
            grid: {
                x: {
                    show: true
                },
                y: {
                    show: true
                }
            },
            axis: {
                y: {
                    label: {
                        text: 'Reciepts vs Pending Vs Dispositions',
                        position: 'outer-middle'
                    },
                    // tick: {
                    //     format: d3.format(",.2r") // ADD
                    // }
                },
                y2: {
                    show: true,
                    label: {
                        text: 'DAILY_DISPOSITIONS_PER_ALJ',
                        position: 'outer-middle'
                    }
                },
                x: {                  
                    type: 'category',
                    tick: {
                        rotate: 75,
                        multiline: false
                    },
                    height: 70
                }
            }
    
        });
    }
  }

  ngOnChanges(changes : any) {
   
  }

  ngAfterViewInit() {  

  }

}
