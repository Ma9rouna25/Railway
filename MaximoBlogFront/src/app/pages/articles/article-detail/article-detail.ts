import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ArticleService } from '../../../core/services/article.service';
import { AuthService } from '../../../core/services/auth.service';
import { CommentSection } from '../../../shared/components/comment-section/comment-section';
import { BookmarkButton } from '../../../shared/components/bookmark-button/bookmark-button';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, CommentSection, BookmarkButton, MarkdownComponent],
  templateUrl: './article-detail.html'
})
export class ArticleDetail implements OnInit {
  article: any = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadArticle(Number(id));
      }
    });
  }

  loadArticle(id: number) {
    this.loading = true;
    this.articleService.getById(id).subscribe({
      next: (data: any) => {
        this.article = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load the article. It may have been deleted.';
        this.loading = false;
      }
    });
  }

  deleteArticle() {
    if (confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      this.articleService.delete(this.article.id).subscribe({
        next: () => {
          this.router.navigate(['/articles']);
        },
        error: (err: any) => alert('Failed to delete article: ' + (err.error?.message || 'Unknown error'))
      });
    }
  }

  isAuthor(): boolean {
    return this.authService.isAdmin();
  }
}
