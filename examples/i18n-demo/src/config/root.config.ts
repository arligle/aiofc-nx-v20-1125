// import { LoggerConfig } from "@aionx/logger";
import { AppConfig } from '@aiofc/fastify-server';
import { I18Config } from '@aiofc/i18n';
import { LoggerConfig } from '@aiofc/logger';
import { ValidateNestedProperty } from '@aiofc/validation';

export default class RootConfig {
  @ValidateNestedProperty({ classType: AppConfig })
  public readonly app!: AppConfig;

  @ValidateNestedProperty({ classType: LoggerConfig })
  public readonly logger!: LoggerConfig;

  @ValidateNestedProperty({ classType: I18Config })
  public readonly i18!: I18Config;
}
