import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {Constants} from "../../../../helpers/constants";
import {Assembly} from "../../../../models/assembly";
import {AssembliesService} from "../../../../services/assemblies/assemblies.service";
import {A} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-assemblies',
  templateUrl: './assemblies.component.html',
  styleUrls: ['./assemblies.component.scss']
})
export class AssembliesComponent implements AfterViewInit {
  assemblies: Array<Assembly>;
  dataSource: MatTableDataSource<Assembly>;
  query: String;
  displayedColumns: string[];
  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  constructor(private router: Router, private assemblyService: AssembliesService, private toastr: ToastrService, private translateService: TranslateService) {
    this.assemblies = [];
    this.dataSource = new MatTableDataSource<Assembly>(this.assemblies);
    this.query = '';
    this.displayedColumns = ['name','deadline','publishDate','fiscalYear','date','description','isOpen'];
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getAssemblies();
  }

  filter(): void {
    this.getAssemblies();
  }

  getAssemblies(): void {
    this.assemblyService.getAll(this.query).subscribe({
      next: (data) => {
        this.assemblies = data;
        this.dataSource.data = this.assemblies;
      },
      error: (error) => {
        this.translateService.get('notification.header.error').subscribe(headerStr => {
          this.translateService.get('notification.message.error.assembly_load').subscribe(messageStr => {
            this.toastr.error(messageStr, headerStr);
          });
        });
      }
    });
  }


  redirectToAssemblyForm(assembly: Assembly = new Assembly()): void {
    if(assembly.id != null) {
      localStorage.setItem('edit_assembly', JSON.stringify(assembly));
      this.router.navigateByUrl('assemblies/edit/' + assembly.id);
    } else {
      this.router.navigateByUrl('assemblies/new');
    }
  }

  parsedDateString(dateString: String): String {
    var date = new Date(dateString as string);
    return date.toLocaleDateString();
  }

  deleteAssembly(assembly: Assembly): void {
    if(assembly.id != null) {
      this.assemblyService.delete(assembly.id).subscribe({
        next: (data) => {
          this.getAssemblies();
          this.translateService.get('notification.header.success').subscribe(headerStr => {
            this.translateService.get('notification.message.success.assembly_deletion').subscribe(messageStr => {
              this.toastr.success(messageStr, headerStr);
            });
          });
        },
        error: (error) => {
          this.translateService.get('notification.header.error').subscribe(headerStr => {
            this.translateService.get('notification.message.error.assembly_deletion').subscribe(messageStr => {
              this.toastr.error(messageStr, headerStr);
            });
          });
        }
      });
    } else {
      this.translateService.get('notification.header.error').subscribe(headerStr => {
        this.translateService.get('notification.message.error.assembly_deletion').subscribe(messageStr => {
          this.toastr.error(messageStr, headerStr);
        });
      });
    }
  }

}
