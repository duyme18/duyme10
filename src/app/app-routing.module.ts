import { CartComponent } from './components/cart/cart.component';
import { HomeListComponent } from './components/home-list/home-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BookComponent } from './components/book/book.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { AuthorFormComponent } from './components/author-form/author-form.component';
import { AuthorComponent } from './components/author/author.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardModeratorComponent } from './components/board-moderator/board-moderator.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home/:id', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'user/cart', component: CartComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'books', component: BookComponent },
  { path: 'book-form/:bookId', component: BookFormComponent },
  { path: 'book-details/:bookId', component: BookDetailsComponent },
  { path: 'authors', component: AuthorComponent },
  { path: 'author-form/:id', component: AuthorFormComponent },
  { path: 'upload-files/:bookId', component: UploadFilesComponent },
  { path: 'homes', component: HomeListComponent },
  { path: '', redirectTo: 'homes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
