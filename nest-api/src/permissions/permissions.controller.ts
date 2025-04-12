import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('permissions')
@Controller('permissions')
export class PermissionsController {
  @Get('test')
  public async test(): Promise<boolean>{
    await Promise.resolve();
    return true;
  }
}
