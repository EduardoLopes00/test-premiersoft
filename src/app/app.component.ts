import { Character } from './models/marvelapi.model';
import { Component, OnInit } from '@angular/core';
import { MarvelService } from './services/marvel.service';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { sortCharactersByIsFavorite } from './utils/sortGetAllCharacterResponse';
import { FormFiltersFields } from './models/formFilters.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'test-premiersoft';
  characters: Character[] = [] as Character[];
  loading = false;

  constructor(private marvelService: MarvelService) {}

  ngOnInit(): void {
    this.loading = true;

    this.marvelService.getCharacters().subscribe((data) => {
      this.characters = sortCharactersByIsFavorite(data);
      this.loading = false;
    });
  }

  onFilterClick(filterValues: FormFiltersFields) {
    this.loading = true;

    this.marvelService.getCharacters(filterValues).subscribe((data) => {
      this.characters = sortCharactersByIsFavorite(data);
      this.loading = false;
    });
  }
}
