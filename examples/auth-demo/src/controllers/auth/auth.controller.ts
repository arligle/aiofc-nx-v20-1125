import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ClsService, ClsStore } from 'nestjs-cls';
import { AbstractSignupService } from '../../services/auth/signup/abstract-signup.service';
import { SignUpByEmailRequest, SignUpByEmailResponseDTO } from './vo/sign-up.dto';
import { map } from '@aiofc/validation';
import { I18n, I18nContext } from '@aiofc/i18n';
import { I18nTranslations } from '../../generated/i18n.generated';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly clsService: ClsService<ClsStore>,
    private readonly signUpService: AbstractSignupService<SignUpByEmailRequest>,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  public async signUp(
    @I18n() i18n: I18nContext<I18nTranslations>,
    @Body() request: SignUpByEmailRequest,
  ): Promise<any> {
    // depends on chosen workflow you can respond with tokens here and let user in
    return this.signUpService.signUp(request).then((response) => {
      const responseDTO = map(response, SignUpByEmailResponseDTO);
      return {
        ...responseDTO,
        message: i18n.t('user.FINISHED_REGISTRATION'),
      };
    });
  }

  @Post('signin')
  public async signIn(): Promise<any> {
    return 'signIn';
  }
}
