import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EraCardComponent } from '@shared/components/era-card/era-card.component';
import { ERAS } from '@core/data/eras.data';

@Component({
  selector: 'app-story',
  imports: [EraCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './story.component.html',
  styleUrl: './story.component.scss',
})
export class StoryComponent {
  protected readonly eras = ERAS;
}
