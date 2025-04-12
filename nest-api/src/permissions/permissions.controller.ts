import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionRequest, UpdatePermissionRequest } from './model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  /**
   * Создать новое разрешение.
   * @param dto Данные для создания нового разрешения.
   * @returns Созданное разрешение.
   */
  @Post()
  create(@Body() dto: CreatePermissionRequest) {
    return this.permissionsService.create(dto);
  }

  /**
   * Получить все разрешения.
   * @returns Список всех разрешений.
   */
  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }

  /**
   * Получить разрешение по ID.
   * @param id Идентификатор разрешения.
   * @returns Разрешение с указанным ID.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }

   /**
   * Обновить разрешение по ID.
   * @param id Идентификатор разрешения для обновления.
   * @param dto Данные для обновления разрешения.
   * @returns Обновленное разрешение.
   */
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePermissionRequest) {
    return this.permissionsService.update(id, dto);
  }

  /**
   * Удалить разрешение по ID.
   * @param id Идентификатор разрешения для удаления.
   * @returns Сообщение о успешном удалении.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(id);
  }
}
