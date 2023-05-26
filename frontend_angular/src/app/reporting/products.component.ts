import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChartData, ChartOptions} from 'chart.js';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements AfterViewInit, OnInit {
  products:any[] = []
  displayedColumns: string[] = ['Name', 'Price', 'Brand', 'Type', 'Description'];
  dataSource = new MatTableDataSource<any>(this.products);
  chartsLoaded:boolean = false;

  constructor(private dataService: DataService, private snackBar: MatSnackBar) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort = new MatSort();

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  // Brand Chart
  brandData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      { data: [] },
    ],
  };

  brandChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Product Count by Brands',
      },
    },
  };

  // Product Type Chart
  productTypeData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      { data: [] },
    ],
  };

  productTypeChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Product Count by Product Type',
      },
    },
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.CompileProductDashboard()
    console.log(this.products)
  }


   CompileProductDashboard()
  {
    this.dataService.CompileProductDashboard().subscribe(result => {
      let brandData:any[] = result[0]
      let productTypeData:any[] = result[1]
      let productList:any[] = result[2]

      brandData.forEach((element) => {
        this.brandData.labels?.push(element.key)
        this.brandData.datasets[0].data.push(element.productCount)
      });

      productTypeData.forEach((element) => {
        this.productTypeData.labels?.push(element.key)
        this.productTypeData.datasets[0].data.push(element.productCount)
      });
    
      productList.forEach((element) => {
        this.products.push(element)
      });
      this.chartsLoaded = true;
    }, (response: HttpErrorResponse) => {
        if (response.status === 500){
          this.snackBar.open(response.error, 'X', {duration: 5000});
        }
    })
  }
}
