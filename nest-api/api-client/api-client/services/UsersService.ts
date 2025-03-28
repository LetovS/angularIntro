/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChangePasswordDto } from '../models/ChangePasswordDto';
import type { CreateUserDto } from '../models/CreateUserDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Add a new user
     * @returns any User added successfully
     * @throws ApiError
     */
    public static register({
        requestBody,
    }: {
        requestBody: CreateUserDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
            },
        });
    }
    /**
     * Change user's password
     * @returns any User added successfully
     * @throws ApiError
     */
    public static changePassword({
        requestBody,
    }: {
        requestBody: ChangePasswordDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/change-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
            },
        });
    }
    /**
     * Check if user exists
     * @returns any User exists
     * @throws ApiError
     */
    public static exists({
        login,
    }: {
        login: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/exists',
            query: {
                'login': login,
            },
            errors: {
                404: `User not found`,
            },
        });
    }
    /**
     * Count of number users
     * @returns any Count
     * @throws ApiError
     */
    public static usersCount(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/users-count',
        });
    }
    /**
     * Users
     * @returns any list
     * @throws ApiError
     */
    public static getUsersList(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/users-list',
        });
    }
    /**
     * Get user by id
     * @returns any user
     * @throws ApiError
     */
    public static getUserById({
        userId,
    }: {
        /**
         * ID of the user
         */
        userId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/user/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
}
