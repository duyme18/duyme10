import { BookService } from './../../services/book.service';
import { UploadFileService } from './../../services/upload-file.service';
import { CommonService } from './../../services/common.service';
import { CommentService } from './../../services/comment.service';
import { IFile } from './../../models/file';
import { Book } from './../../models/book';
import { Comment } from '../../models/comment';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  public bookId = 0;
  public bookName = '';
  public book?: Book;
  public comment?: Comment;
  public comments: Comment[] = [];
  public files: IFile[] = [];
  public datas = [];
  public commentForm = new FormGroup({
    content: new FormControl('')
  });
  public commentUpdate = new FormControl();
  public tokenJWT: string;
  public userInfo: any;
  public userId: string;
  public commentId = 0;
  public totalComments = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
    private common: CommonService,
    private token: TokenStorageService,
    private uploadService : UploadFileService,
    private bookService: BookService) {
    this.activatedRoute.params.subscribe(params => {
      this.bookId = params.bookId;
      this.bookName = params.bookName;
    });
    this.userId = this.token.getUserId();
    this.tokenJWT = this.token.getToken();
  }

  ngOnInit(): void {
    this.getBook();
    this.getAllCommentByBook();

    this.common.totalComments$.subscribe((total) => {
      this.totalComments = total;
    });


    this.commentService.getAllCommentByBook(this.bookId).subscribe((data) => {
      this.common.setTotalComments(data.length);
    });

    this.userInfo = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      role: this.token.getUser()
    };

    this.getAllFilesByBook();
  }

  private getBook() {
    this.bookService.getBook(this.bookId).subscribe((data) => {
      this.book = data;
    
    });
  }

  private getAllCommentByBook() {
    this.commentService.getAllCommentByBook(this.bookId).subscribe((data) => {
      this.comments = data;
    });
  }
  
  private getAllFilesByBook() {
    this.uploadService.getFilesByBook(this.bookId).subscribe((data) => {
      this.files = data;
    });
  }

  addComment() {

    const { content } = this.commentForm.value;

    if (content === '') {
      return;
    }

    const comment: any = {
      bookId: this.bookId,
      content: content,
      user: {
        id: this.token.getUserId()
      }
    }

    this.commentService.addComment(this.bookId, comment).subscribe((result) => {
      this.common.incrementTotalComments();
      this.commentForm.reset();
      this.getAllCommentByBook();
    })
  }

  updateComment(commentId: number, closeModalRef: HTMLAnchorElement) {

    if (this.commentUpdate.value == null) {
      return this.closeForm(closeModalRef);
    }

    const comment: any = {
      commentId: commentId,
      content: this.commentUpdate.value
    };

    this.commentService.modifyComment(comment).subscribe(result => {
      this.closeForm(closeModalRef);
    }, error => {
      console.log(error);
    });
  }

  getCommentId(id: number) {
    this.commentId = id;
  }

  closeForm(closeModalRef: HTMLAnchorElement) {
    closeModalRef.click();
    this.getAllCommentByBook();
    this.commentUpdate.reset();
  }

  deleteComment(closeModalRef2: HTMLButtonElement) {
    this.commentService.deleteComment(this.commentId).subscribe(result => {
      this.getAllCommentByBook();
      closeModalRef2.click();
    }, error => {
      console.log(error);
    });
  }

}
