import { AuthorService } from './../../services/author.service';
import { CommonService } from './../../services/common.service';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showModeratorUser = false;
  username?: string;

  public totalAuthors = 0;

  constructor(
    private common: CommonService,
    private authorService: AuthorService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }

    this.common.totalAuthors$.subscribe((total) => {
      this.totalAuthors = total;
    });

    if (this.common.totalAuthors === 0) {
      this.authorService.getAuthors().subscribe((data) => {
        this.common.setTotalAuthors(data.length);
      })
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
