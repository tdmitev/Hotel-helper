import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { GuestService } from 'src/app/services/guest.service';
import { Statistics } from 'src/app/types/statistics';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  @ViewChild('chart') chartElement?: ElementRef; 
  private chart?: ApexCharts; 

  constructor(private guestService: GuestService) { }

  ngOnInit(): void {
    this.loadGuestStatistics();
  }

  loadGuestStatistics() {
    this.guestService.getGuestStatistics().subscribe({
      next: (statistics) => {
        this.updateChart(statistics);
      },
      error: (error) => {
        console.error("Error loading guest statistics", error);
      }
    });
  }

  updateChart(statistics: Statistics) {
    const notAttendedGuests = statistics.totalGuests - statistics.attendedGuests;
  
    const options = {
      series: [statistics.attendedGuests, notAttendedGuests],
      labels: ["Attended", "Not Attended"],
      colors: ["#1C64F2", "#16BDCA", "#9061F9"],
      chart: {
        height: 420,
        width: "100%",
        type: "pie",
      },
    };
  
    if (!this.chart) {
      this.chart = new ApexCharts(document.getElementById("pie-chart"), options);
      this.chart.render();
    } else {
      this.chart.updateOptions(options);
    }
  }
}