import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-character',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss',
})
export class CharacterComponent {}
