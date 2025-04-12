import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  
  @Get('test')
  public async test(): Promise<boolean>{
    await Promise.resolve();
    return true;
  }
}
