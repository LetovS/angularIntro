/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TourDto } from '../models/TourDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ToursService {
    /**
     * Recived tour's list
     * @returns any All tours
     * @throws ApiError
     */
    public static getTours(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tours/tours',
        });
    }
    /**
     * Get tours nearest to a location
     * @returns any Tours
     * @throws ApiError
     */
    public static getToursByLocationId({
        locationId,
    }: {
        /**
         * ID of the location's tour
         */
        locationId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tours/nearestTours',
            query: {
                'locationId': locationId,
            },
            errors: {
                404: `Not found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Recived tour by Id
     * @returns any Tour
     * @throws ApiError
     */
    public static getTourById({
        tourId,
    }: {
        /**
         * ID of the tour to remove
         */
        tourId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tours/tour/{tourId}',
            path: {
                'tourId': tourId,
            },
            errors: {
                404: `Tour not found`,
                500: `Server error`,
            },
        });
    }
    /**
     * Add tour
     * @returns any seccusful
     * @throws ApiError
     */
    public static addTour({
        requestBody,
    }: {
        requestBody: TourDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tours/add-tour',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                409: `That tour already exists`,
            },
        });
    }
    /**
     * Init data for demo
     * @returns any seccusful
     * @throws ApiError
     */
    public static initTestData(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tours/init-test-data',
            errors: {
                500: `Something went wrong`,
            },
        });
    }
    /**
     * Remove tour
     * @returns any seccusful
     * @throws ApiError
     */
    public static removeTourById({
        tourId,
    }: {
        /**
         * ID of the tour to remove
         */
        tourId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/tours/remove-tour/{tourId}',
            path: {
                'tourId': tourId,
            },
            errors: {
                404: `Not found`,
            },
        });
    }
}
