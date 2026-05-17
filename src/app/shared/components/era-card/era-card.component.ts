import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { EraIconColor, IconKey } from '@core/models/era.model';
import { IconComponent } from './icon.component';

/**
 * Reusable card used by both the Story and Capabilities pages.
 * All inputs are required signals — invalid inputs fail at compile time.
 */
@Component({
  selector: 'app-era-card',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './era-card.component.html',
  styleUrl: './era-card.component.scss',
})
export class EraCardComponent {
  readonly date = input.required<string>();
  readonly iconColor = input.required<EraIconColor>();
  readonly iconKey = input.required<IconKey>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly tags = input.required<readonly string[]>();
  readonly footerItems = input<readonly string[]>([]);
}
