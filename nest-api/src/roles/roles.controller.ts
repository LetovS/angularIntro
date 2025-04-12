import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateRoleRequest, UpdateRoleRequest } from './model';

@ApiTags('Roles') 
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  /**
   * Создание новой роли
   * @param dto - Объект, содержащий данные для создания роли
   * @returns возвращает созданную роль
   */
  @Post()
  @ApiOperation({ summary: 'Create a new role' })  // Описание операции для Swagger
  @ApiResponse({ status: 201, description: 'Role successfully created' })  // Ответ при успешном создании
  @ApiResponse({ status: 400, description: 'Bad request' })  // Ответ в случае ошибки
  create(@Body() dto: CreateRoleRequest) {
    return this.rolesService.create(dto);
  }

  /**
   * Получение всех ролей
   * @returns возвращает список всех ролей
   */
  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, description: 'List of roles' })
  findAll() {
    return this.rolesService.findAll();
  }

  /**
   * Получение роли по ID
   * @param id - ID роли, которую нужно найти
   * @returns возвращает найденную роль
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a role by ID' })
  @ApiParam({ name: 'id', description: 'Role ID' })  // Добавление параметра в Swagger
  @ApiResponse({ status: 200, description: 'Role found' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  /**
   * Обновление роли по ID
   * @param id - ID роли, которую нужно обновить
   * @param dto - Объект с обновленными данными роли
   * @returns возвращает обновленную роль
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update a role' })
  @ApiParam({ name: 'id', description: 'Role ID' })  // Добавление параметра в Swagger
  @ApiResponse({ status: 200, description: 'Role successfully updated' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  update(@Param('id') id: string, @Body() dto: UpdateRoleRequest) {
    return this.rolesService.update(id, dto);
  }

  /**
   * Удаление роли по ID
   * @param id - ID роли, которую нужно удалить
   * @returns успешное удаление роли
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a role' })
  @ApiParam({ name: 'id', description: 'Role ID' })
  @ApiResponse({ status: 200, description: 'Role successfully deleted' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }

  /**
   * Добавление разрешений (permissions) к роли
   * @param id - ID роли, к которой нужно добавить разрешения
   * @param permissions - Массив Mongo ID разрешений
   * @returns обновленную роль с привязанными разрешениями
   */
  @Post(':id/permissions')
  @ApiOperation({ summary: 'Add permissions to a role' })
  @ApiParam({ name: 'id', description: 'Role ID' })  // Добавление параметра в Swagger
  @ApiResponse({ status: 200, description: 'Permissions successfully added to role' })
  @ApiResponse({ status: 404, description: 'Role or permissions not found' })
  addPermissions(
    @Param('id') id: string,
    @Body() permissions: string[], // Массив Mongo ID разрешений
  ) {
    return this.rolesService.addPermissions(id, permissions);
  }
}
