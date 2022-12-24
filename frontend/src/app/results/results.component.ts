import { Component, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  constructor(private elementRef: ElementRef) {}
  navType: string = 'darkNav';
  //this should come from backend but I'm not sure how it'll look
  data = [
    { year: 2010, score: 10 },
    { year: 2011, score: 20 },
    { year: 2012, score: 15 },
    { year: 2013, score: 25 },
    { year: 2014, score: 22 },
    { year: 2015, score: 30 },
    { year: 2016, score: 28 },
  ];
  public chart: any;
  createChart() {
    let htmlRef = this.elementRef.nativeElement.querySelector(`#scores-time`);
    this.chart = new Chart(htmlRef, {
      type: 'line',
      data: {
        labels: this.data.map((row) => row.year),
        datasets: [
          {
            label: 'Scores',
            data: this.data.map((row) => row.score),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            //   backgroundColor: "#1d2a2f",
          },
        ],
      },
      options: {
        //neccessary for responsive
        maintainAspectRatio: false,
        //uncomment if you want title
        //   plugins: {
        //     legend: {
        //       position: "top",
        //     },
        //     title: {
        //       display: true,
        //       text: "Your Scores",
        //     },
        //   },
      },
    });
  }
  //call createChart() in ngOnInit
  ngOnInit() {
    this.createChart();
  }
}
