import { map } from 'rxjs/operators';
import { CarsService } from './../../../services/cars.service';
import { Ventas } from './../../../models/sales.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.styl'],
})
export class CarsComponent implements OnInit {
  sales: Ventas[] = [];
  chart = [];
  chartOptions = {
    responsive: true,
  };
  chartData = [];
  chartLabels = [];

  constructor(private salesService: CarsService) {}

  ngOnInit(): void {
    this.getSales();
  }

  getSales() {
    this.salesService.listSales().subscribe((res: any) => {
      //console.log(res.sales);
      const ids = res.sales.map((res) => res.quantity);
      const dates = res.sales.map((res) => res.date);
      const quantities = res.sales.map((res) => res.quantity);
      const brands = res.sales.map((res) => res.car_make);

      console.log(brands);
      this.chartData = [{ data: quantities, label: 'Ventas' }];

      this.chartLabels = brands;
    });
  }
}
