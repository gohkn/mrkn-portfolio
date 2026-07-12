import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EraCardComponent } from '@shared/components/era-card/era-card.component';
import { IconComponent } from '@shared/components/era-card/icon.component';
import { CAPABILITIES } from '@core/data/capabilities.data';
import { CERTIFICATIONS } from '@core/data/certifications.data';

@Component({
  selector: 'app-capabilities',
  imports: [EraCardComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './capabilities.component.html',
  styleUrl: './capabilities.component.scss',
})
export class CapabilitiesComponent {
  protected readonly capabilities = CAPABILITIES;
  protected readonly certifications = CERTIFICATIONS;
}
