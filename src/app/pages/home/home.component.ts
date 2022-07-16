import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map } from 'rxjs';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private postService: PostService) {}
  postsForm: FormGroup;
  allPosts: any = [];

  submitTextFormHandler() {
    this.postService.addPost({ ...this.postsForm.value });
    this.postsForm.reset();
  }

  getPosts() {
    this.postService.getPosts().subscribe({
      next: (res: any) => {
        this.allPosts = res.map((e) => ({
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as {}),
        }));
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  deletePost(post: any) {
    this.postService.deletePost(post);
  }

  ngOnInit(): void {
    // Posts Form Froala Editor
    this.postsForm = new FormGroup({
      postText: new FormControl(null, [Validators.required]),
    });

    // GET Posts
    this.getPosts();
  }
}
