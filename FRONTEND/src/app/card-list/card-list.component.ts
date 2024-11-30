import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardService } from '../card.service';
import { CardNumberFormatterPipe } from '../card-number-formatter.pipe';
import { CardCcvFormatterPipe } from '../card-ccv-formatter.pipe';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [
    CommonModule,
    CardNumberFormatterPipe,
    CardCcvFormatterPipe],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent {

  searchQuery = signal<string>('');
  filteredCards = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.cardService.cardsSignal().filter((card) =>
      card.cardName.toLowerCase().includes(query));
  });

  constructor(private cardService: CardService) { }

  onSearchUpdated(sq: string) {
    this.searchQuery.set(sq);
  }

  deleteCard(cardNumber: number) {
    this.cardService.deleteCard(cardNumber);
  }
}
