import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Bidding} from "../../../../models/bidding";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {BiddingsService} from "../../../../services/biddings/biddings.service";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-biddings',
  templateUrl: './biddings.component.html',
  styleUrls: ['./biddings.component.scss']
})
export class BiddingsComponent implements AfterViewInit{
  biddings: Array<Bidding>;
  dataSource: MatTableDataSource<Bidding>;
  query: String;
  displayedColumns: string[];
  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  constructor(private router: Router, private biddingService: BiddingsService, private toastr: ToastrService, private translateService: TranslateService) {
    this.biddings = [];
    this.dataSource = new MatTableDataSource<Bidding>(this.biddings);
    this.query = '';
    this.displayedColumns = ['name','deadline','publishDate','fiscalYear','date','description','isOpen'];
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getBiddings();
  }

  filter(): void {
    this.getBiddings();
  }

  getBiddings(): void {
    this.biddingService.getAll(this.query).subscribe({
      next: (data) => {
        this.biddings = data;
        this.dataSource.data = this.biddings;
      },
      error: (error) => {
        this.translateService.get('notification.header.error').subscribe(headerStr => {
          this.translateService.get('notification.message.error.bidding_load').subscribe(messageStr => {
            this.toastr.error(messageStr, headerStr);
          });
        });
      }
    });
  }


  redirectToBiddingForm(bidding: Bidding = new Bidding()): void {
    if(bidding.id != null) {
      localStorage.setItem('edit_bidding', JSON.stringify(bidding));
      this.router.navigateByUrl('biddings/edit/' + bidding.id);
    } else {
      this.router.navigateByUrl('biddings/new');
    }
  }

  parsedDateString(dateString: String): String {
    var date = new Date(dateString as string);
    return date.toLocaleDateString();
  }

  deleteBidding(bidding: Bidding): void {
    if(bidding.id != null) {
      this.biddingService.delete(bidding.id).subscribe({
        next: (data) => {
          this.getBiddings();
          this.translateService.get('notification.header.success').subscribe(headerStr => {
            this.translateService.get('notification.message.success.bidding_deletion').subscribe(messageStr => {
              this.toastr.success(messageStr, headerStr);
            });
          });
        },
        error: (error) => {
          this.translateService.get('notification.header.error').subscribe(headerStr => {
            this.translateService.get('notification.message.error.bidding_deletion').subscribe(messageStr => {
              this.toastr.error(messageStr, headerStr);
            });
          });
        }
      });
    } else {
      this.translateService.get('notification.header.error').subscribe(headerStr => {
        this.translateService.get('notification.message.error.bidding_deletion').subscribe(messageStr => {
          this.toastr.error(messageStr, headerStr);
        });
      });
    }
  }
}
