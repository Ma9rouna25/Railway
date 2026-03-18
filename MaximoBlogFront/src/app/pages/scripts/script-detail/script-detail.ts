import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ScriptService } from '../../../core/services/script.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-script-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './script-detail.html'
})
export class ScriptDetail implements OnInit {
  scriptData: any = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scriptService: ScriptService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadScript(Number(id));
      }
    });
  }

  loadScript(id: number) {
    this.loading = true;
    this.scriptService.getById(id).subscribe({
      next: (data: any) => {
        this.scriptData = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load script details. It may have been scrubbed from the databanks.';
        this.loading = false;
      }
    });
  }

  deleteScript() {
    if (confirm('CRITICAL ACTION: Are you sure you want to delete this script?')) {
      this.scriptService.delete(this.scriptData.id).subscribe({
        next: () => this.router.navigate(['/scripts']),
        error: (err: any) => alert('Deletion failed: ' + (err.error?.message || 'Unknown anomaly'))
      });
    }
  }

  isAuthor(): boolean {
    return this.authService.isAdmin();
  }

  copyCode() {
    if (this.scriptData && this.scriptData.code) {
      navigator.clipboard.writeText(this.scriptData.code).then(() => {
        alert('Code copied to clipboard!');
      });
    }
  }
}
