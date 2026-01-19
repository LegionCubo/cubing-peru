import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Collaborator, CollaboratorsList } from '../../../../core/data/Collaborators.data';

@Component({
  selector: 'home-list-collaborators',
  imports: [],
  templateUrl: './list-collaborators.html',
  styleUrl: './list-collaborators.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCollaborators { 
  listCollaborators:Collaborator[] = CollaboratorsList;
}
