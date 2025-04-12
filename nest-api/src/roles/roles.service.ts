import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role, RoleDocument } from 'src/schemas/role.schema';
import { CreateRoleRequest, UpdateRoleRequest } from './model';
import { PermissionsService } from 'src/permissions/permissions.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    private permissionsService: PermissionsService
  ) {}

  /**
   * Создание новой роли
   * @param dto - Объект с данными для создания роли
   * @returns возвращает созданную роль
   */
  async create(dto: CreateRoleRequest): Promise<Role> {
    const role = new this.roleModel({
      name: dto.name,
      permissions: dto.permissions || [],
    });

    return role.save();
  }

  /**
   * Получение всех ролей
   * @returns возвращает массив всех ролей
   */
  async findAll(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }

  /**
   * Получение роли по ID
   * @param id - ID роли
   * @returns возвращает роль с переданным ID
   */
  async findOne(id: string): Promise<Role> {
    const role = await this.roleModel.findById(id).exec();
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  /**
   * Обновление роли по ID
   * @param id - ID роли
   * @param dto - Объект с обновленными данными
   * @returns возвращает обновленную роль
   */
  async update(id: string, dto: UpdateRoleRequest): Promise<Role> {
    const updatedRole = await this.roleModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updatedRole) {
      throw new NotFoundException('Role not found');
    }
    return updatedRole;
  }

  /**
   * Удаление роли по ID
   * @param id - ID роли
   * @returns удаляет роль из базы данных
   */
  async remove(id: string): Promise<void> {
    const deletedRole = await this.roleModel.findByIdAndDelete(id).exec();
    if (!deletedRole) {
      throw new NotFoundException('Role not found');
    }
  }

  /**
   * Добавление разрешений к роли
   * @param id - ID роли
   * @param permissions - Массив Mongo ID разрешений
   * @returns обновленную роль с привязанными разрешениями
   */
  async addPermissions(id: string, permissions: string[]): Promise<Role> {
    const role = await this.roleModel.findById(id).exec();
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    // Проверка существования пермишнов через PermissionsService
    await this.permissionsService.checkPermissionsExist(permissions);

    // Преобразуем строки в ObjectId
    const permissionObjectIds = permissions.map(permission => new Types.ObjectId(permission));

    // Добавляем новые разрешения к роли
    role.permissions.push(...permissionObjectIds); // Используем ObjectId
    return role.save();
  }
}
