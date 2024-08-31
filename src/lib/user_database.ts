import type User from './user.ts';

export default interface DatabaseUsers {
    primary_id: string,
    user: User
}