import { Base } from '@shared/data-access';

export interface User extends Base {
  email?: string;
  isActive?: boolean;
}
