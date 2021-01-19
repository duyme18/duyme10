import { Router } from '@angular/router';
import { HomeService } from './../../services/home.service';
import { UserService } from './../../services/user.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // content?: string;

  // constructor(
  //   // private userService: UserService
  //   ) { }

  // ngOnInit(): void {
  //   this.userService.getPublicContent().subscribe(
  //     data => {
  //       this.content = data;
  //     },
  //     err => {
  //       this.content = JSON.parse(err.error).message;
  //     }
  //   );
  // }

  homeFile: any;
  public imagePath: any;
  imgURL: any;
  public message = '';
  homeForm?: FormGroup;

  constructor(public homeService: HomeService,
    public fb: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<HomeComponent>,
  ) {
  }

  ngOnInit(): void {
    if (this.homeService.choixmenu == "A") { this.infoForm() };
  }

  get f() { return this.homeService.dataForm?.controls; }

  infoForm() {
    this.homeService.dataForm = new FormGroup({
      id: new FormControl(''),
      address: new FormControl('', Validators.required),
      createDate: new FormControl('', Validators.required),
      profile: new FormControl('', Validators.required)
    });

  }

  resetForm() {
    this.homeService.dataForm?.reset();
  }

  onSubmit() {
    if (this.homeService.choixmenu == "A") {
      this.addData();
    }
    else {
      this.updateData()
    }
  }

  addData() {
    const formData = new FormData();
    const home = this.homeService.dataForm?.value;
    formData.append('home', JSON.stringify(home));
    formData.append('file', this.homeFile);
    this.homeService.createData(formData).subscribe(data => {
      this.router.navigate(['/homes']);
    });
  }

  updateData() {
    this.homeService.updatedata(this.homeService.dataForm?.value.id, this.homeService.dataForm?.value).
      subscribe(data => {
        this.dialogRef.close();
        this.getData();
        this.router.navigate(['/homes']);
      });
  }

  getData() {
    this.homeService.getAll().subscribe(
      response => { this.homeService.listData = response; }
    );
  }

  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.homeFile = file;
      // this.f['profile'].setValue(file);

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }

      var reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }
  }

  close() {
   this.dialogRef.close();
   this.resetForm();
  }

}