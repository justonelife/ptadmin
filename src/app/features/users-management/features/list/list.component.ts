import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersService } from '@features/users-management/data-access';
import { FiltersSearchComponent } from '@shared/ui/filters-search/filters-search.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FiltersSearchComponent],
})
export class UsersListComponent {
  usersService = inject(UsersService);

  data$ = this.usersService.getUsers();
}
