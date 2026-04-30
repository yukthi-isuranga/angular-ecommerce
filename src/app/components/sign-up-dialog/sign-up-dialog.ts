import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { EcommerceStore } from '../../store/ecommerce-store';
import { SignUpParams } from '../../../models/user';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-up-dialog.html',
  styleUrl: './sign-up-dialog.scss',
})
export class SignUpDialog {
  store = inject(EcommerceStore);

  fb = inject(NonNullableFormBuilder);

  signUpForm = this.fb.group({
    name: ['Yukthi', Validators.required],
    email: ['yukthi@gmail.com', Validators.required],
    password: ['yukthi@gmail.com', Validators.required],
    confirmPassword: ['yukthi@gmail.com', Validators.required],
  });

  dialogRef = inject(MatDialogRef);
  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);
  matDialog = inject(MatDialog);

  signUp() {
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const { name, email, password } = this.signUpForm.value;

    this.store.signUp({
      name,
      email,
      password,
      dialogId: this.dialogRef.id,
      checkout: this.data.checkout,
    } as SignUpParams);
  }

  openSignInDialog() {
    this.dialogRef.close();
    this.matDialog.open(SignUpDialog, {
      disableClose: true,
      data: {
        checkout: this.data.checkout,
      },
    });
  }
}
