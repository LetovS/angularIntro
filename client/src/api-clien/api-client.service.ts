import { Injectable } from '@angular/core';
import {
  AuthService,
  UsersService,
  ToursService,
  PaymentService,
  OpenAPI, CreateUserDto, ChangePasswordDto, TourDto
} from ".";

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  auth = AuthService;
  users = UsersService;
  tours = ToursService;
  payment = PaymentService;

  constructor() {
    OpenAPI.BASE = 'http://localhost:3000';
  }
  // ================================
  // Auth
  // ================================

  login(dto: CreateUserDto) {
    return this.auth.login({ requestBody: dto });
  }

  // ================================
  // Users
  // ================================

  registerUser(dto: CreateUserDto) {
    return this.users.register({ requestBody: dto });
  }

  changePassword(dto: ChangePasswordDto) {
    return this.users.changePassword({ requestBody: dto });
  }

  getUserById(userId: string) {
    return this.users.getUserById({userId});
  }

  isUserExist(login: string) {
    return this.users.exists({login});
  }

  getUsers() {
    return this.users.getUsersList();
  }

  getUsersCount() {
    return this.users.usersCount();
  }

  // ================================
  // Tours
  // ================================

  getTours() {
    return this.tours.getTours();
  }

  getTourById(tourId: string) {
    return this.tours.getTourById({tourId});
  }

  getNearestTours(locationId: string) {
    return this.tours.getToursByLocationId({ locationId });
  }

  addTour(dto: TourDto) {
    return this.tours.addTour({ requestBody: dto });
  }

  removeTour(tourId: string) {
    return this.tours.removeTourById({tourId});
  }

  initDemoData() {
    return this.tours.initTestData();
  }

  // ================================
  // Payment
  // ================================

  getPaymentMethods() {
    return this.payment.methods();
  }

  processPayment() {
    return this.payment.process();
  }

  getPaymentForm() {
    return this.payment.form();
  }
}
