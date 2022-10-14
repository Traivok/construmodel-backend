import { appConfigure }        from '../src/app.configure';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule }           from '../src/app.module';
import { AuthService }         from '../src/user/services/auth.service';
import { randUser }            from '@ngneat/falso';
import { RegisterDto }         from '../src/user/dtos/register.dto';

( async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [ AppModule ],
  }).compile();

  const app = appConfigure(moduleFixture.createNestApplication());

  const authService: AuthService = app.get(AuthService);

  for (let i = 0; i < 100; ++i) {
    const { firstName: firstname, lastName: lastname, email, username } = randUser();
    await authService.register({
        firstname,
        lastname,
        username,
        email,
        password: username,
      },
    );
  }
} )();