import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Permission, PermissionDocument } from 'src/schemas/permission.schema';
import { CreatePermissionRequest, UpdatePermissionRequest } from './model';

@Injectable()
export class PermissionsService {
  constructor(@InjectModel(Permission.name) private model: Model<PermissionDocument>) {}

  /**
   * Создание нового разрешения
   * @param dto Данные для создания разрешения
   */
  async create(dto: CreatePermissionRequest): Promise<Permission> {
    return new this.model(dto).save();
  }

  /**
   * Получить все разрешения
   */
  async findAll(): Promise<Permission[]> {
    return this.model.find().exec();
  }

  /**
   * Получить разрешение по ID
   * @param id Идентификатор разрешения
   */
  async findOne(id: string): Promise<Permission> {
    const item = await this.model.findById(id).exec();
    if (!item) throw new NotFoundException('Permission not found');
    return item;
  }

  /**
   * Обновление разрешения
   * @param id Идентификатор разрешения
   * @param dto Обновленные данные разрешения
   */
  async update(id: string, dto: UpdatePermissionRequest): Promise<Permission> {
    const updated = await this.model.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) throw new NotFoundException('Permission not found');
    return updated;
  }

  /**
   * Удаление разрешения
   * @param id Идентификатор разрешения
   */
  async remove(id: string): Promise<void> {
    const deleted = await this.model.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Permission not found');
  }

  /**
   * Проверить, существуют ли все переданные разрешения
   * @param permissionIds Массив ID пермишнов для проверки
   * @returns Существующие пермишны
   */
  async checkPermissionsExist(permissionIds: string[]): Promise<Permission[]> {
    const permissionObjectIds = permissionIds.map(permission => new Types.ObjectId(permission));
    const existingPermissions = await this.model.find({ _id: { $in: permissionObjectIds } }).exec();
    
    if (existingPermissions.length !== permissionIds.length) {
      throw new NotFoundException('One or more permissions not found');
    }
    
    return existingPermissions;
  }
}
