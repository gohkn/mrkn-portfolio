import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { CharacterComponent } from '@shared/components/character/character.component';
import { SITE_STATS } from '@core/data/site-config.data';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatButtonModule, CharacterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected readonly stats = SITE_STATS;
}
