import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { Strategy } from 'passport-local';

@Injectable()
export class AuthGuardsService extends PassportStrategy(Strategy) {
    constructor(private userService: UsersService){
        super({usernameField: 'login', passwordField: 'password'});
    }
    async validate(login: string, password: string): Promise<any>{
        const user = await this.userService.getUserByLogin(login);
        console.log('Find user ', user);
        if (user) {
            console.log('', password, user.password);
            const isAuth = await user.checkPassword(password);
            if (isAuth) {
              return true;
            }
            return false;
            
        } else {
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                errorText: 'Пользователя не существует'
            }, HttpStatus.CONFLICT);
        }
    }
}
