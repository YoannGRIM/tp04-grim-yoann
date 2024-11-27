import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Card } from '../card';
import { CardService } from '../card.service';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    ],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.css'
})
export class CardFormComponent {
  cardForm: FormGroup;

  constructor(private fb: FormBuilder, private cardService: CardService) {
    this.cardForm = this.fb.group({
      cardName: ['', [Validators.required, Validators.minLength(3)]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      ccv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      expiryMonth: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      expiryYear: ['', [Validators.required, Validators.min(new Date().getFullYear())]],
    });
  }

  submitForm() {
    if (this.cardForm.valid) {
      const formValue = this.cardForm.value;

      const createCardModel: Card = {
        cardName: formValue.cardName,
        cardNumber: Number(formValue.cardNumber),
        ccv: Number(formValue.ccv),
        expiryMonth: Number(formValue.expiryMonth),
        expiryYear: Number(formValue.expiryYear),
      };

      this.cardService.addCard(createCardModel);
      this.cardForm.reset();
    } else {
      console.log('Form is invalid!');
    }
  }
}
