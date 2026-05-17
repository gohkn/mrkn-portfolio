import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CONTACT_LINKS } from '@core/data/site-config.data';

type SwatchColor = 'white' | 'purple' | 'orange' | 'cyan' | 'green' | 'grey';

const SWATCHES: readonly SwatchColor[] = [
  'white',
  'purple',
  'orange',
  'cyan',
  'green',
  'grey',
] as const;

const SNACKBAR_DURATION_MS = 4000;
const MIN_NAME_LENGTH = 2;
const MIN_MESSAGE_LENGTH = 10;

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly swatches = SWATCHES;
  protected readonly contactLinks = CONTACT_LINKS;
  protected readonly activeSwatch = signal<SwatchColor>('white');

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(MIN_NAME_LENGTH)]],
    email: ['', [Validators.email]],
    message: ['', [Validators.required, Validators.minLength(MIN_MESSAGE_LENGTH)]],
  });

  selectSwatch(color: SwatchColor): void {
    this.activeSwatch.set(color);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snackBar.open('Please complete the required fields.', 'OK', {
        duration: SNACKBAR_DURATION_MS,
      });
      return;
    }

    // For a static deployment, wire this up to:
    // - Formspree, Web3Forms, or Getform (drop-in HTTP endpoints), or
    // - A serverless function (Azure Functions, Cloud Run).
    // No console.log in production code; SonarQube flags it.
    this.snackBar.open('Message ready — wire up your form endpoint to send.', 'OK', {
      duration: SNACKBAR_DURATION_MS,
    });
    this.form.reset();
  }
}
