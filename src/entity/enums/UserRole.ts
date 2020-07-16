import { registerEnumType } from 'type-graphql';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'Defines the UserRole for the User entity',
});
