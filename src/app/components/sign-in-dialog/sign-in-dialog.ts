import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SignInParams } from '../../../models/user';
import { EcommerceStore } from '../../store/ecommerce-store';
import { SignUpDialog } from '../sign-up-dialog/sign-up-dialog';

@Component({
  selector: 'app-sign-in-dialog',
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in-dialog.html',
  styleUrl: './sign-in-dialog.scss',
})
export class SignInDialog {
  fb = inject(NonNullableFormBuilder);

  store = inject(EcommerceStore);

  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);

  dialogRef = inject(MatDialogRef);

  matDialog = inject(MatDialog);

  passwordVisible = signal(false);

  signInForm = this.fb.group({
    email: ['yukthi@gmail.com', Validators.required],
    password: ['Test@123', Validators.required],
  });

  signIn() {
    if (!this.signInForm.valid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.signInForm.value;

    this.store.signIn({
      email,
      password,
      checkout: this.data.checkout,
      dialogId: this.dialogRef.id,
    } as SignInParams);
  }

  openSignUpDialog() {
    this.dialogRef.close();
    this.matDialog.open(SignUpDialog, {
      disableClose: true,
      data: {
        checkout: this.data.checkout,
      },
    });
  }
}
