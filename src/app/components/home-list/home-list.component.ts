import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HomeService } from './../../services/home.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { Home } from './../../models/home';
import { Component, OnInit, Inject } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit {

  home?: Home;
  control: FormControl = new FormControl('');
  constructor(public homeService: HomeService,
    private router: Router,
    public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<HomeComponent>) { }

  ngOnInit(): void {
    this.getData();
  }

  addarticle() {
    this.homeService.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(HomeComponent, dialogConfig);
  }

  getData() {
    this.homeService.getAll().subscribe(
      response => { this.homeService.listData = response; }
    );
  }

  removeData(id: number) {
    if (window.confirm('Are sure you want to delete this Article ?')) {
      this.homeService.deleteData(id)
        .subscribe(
          data => {
            console.log(data);
            this.getData();
          },
          error => console.log(error));
    }
  }

  selectData(item: Home) {
    this.homeService.choixmenu = "M";
    this.homeService.dataForm = this.fb.group(Object.assign({}, item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";

    this.matDialog.open(HomeComponent, dialogConfig);
  }

  public editBook(item: Home, id: any) {
    this.homeService.choixmenu = "M";
    this.homeService.dataForm = this.fb.group(Object.assign({}, item));
    this.router.navigate(['home', id]);
  }

  public addHome() {
    this.homeService.choixmenu = "A";
    this.router.navigate(['home', 0]);
  }
}
