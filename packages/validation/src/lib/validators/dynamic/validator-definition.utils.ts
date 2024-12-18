import { IValidatorDefinition } from './validator-definition.interface';
import {
  I18nValidationError,
  Path,
  i18nValidationMessage,
} from '@aiofc/i18n';
import { TransformFnParams } from 'class-transformer';
import { GeneralBadRequestException } from '@aiofc/exceptions';
import { I18nTranslations } from '../../generated/i18n.generated';

type TransformFnParamsEssentials = Omit<
  TransformFnParams,
  'obj' | 'type' | 'options'
>;

function validationDefinitionToI18NError<T, E>(
  validatorDefinition: IValidatorDefinition<T, E>,
  params: TransformFnParamsEssentials,
  constraint?: E,
  overrideDefaultMessage?: string,
  args?: unknown,
): I18nValidationError {
  // it's transforming a message to format -
  // "common.validation.MAX_LENGTH|{ "constraints": [ "10" ], "args": {} }"
  const validationMessageFormatted = i18nValidationMessage(
    overrideDefaultMessage ?? validatorDefinition.defaultValidationMessage,
    args,
  )({
    // this one is not really used and not passed to the message function
    property: params.key,
    value: params.value,
    constraints: constraint === undefined ? [] : [constraint],
    // this one is not used in the i18nValidationMessage function
    targetName: '',
    // this one also is not used in the i18nValidationMessage function
    object: {},
  });

  return {
    property: params.key,
    value: params.value,
    constraints: {
      [validatorDefinition.name]: validationMessageFormatted,
    },
  } satisfies I18nValidationError;
}

/**
 * @return void or throw error if invalid
 * */
export function validateAndThrow<T, E>(
  validatorDefinition: IValidatorDefinition<T, E>,
  fieldName: string,
  value: T,
  constraint?: E,
  overrideDefaultMessage?: string,
  args?: unknown,
) {
  const isValid = validatorDefinition.validator(value, constraint as E);

  if (!isValid) {
    throwValidationException(
      validatorDefinition,
      {
        key: fieldName,
        value,
      },
      constraint,
      overrideDefaultMessage,
      args,
    );
  }
}

/**
 * @return error or undefined if valid
示例：
const exampleValidatorDefinition = {
  name: 'exampleValidator',
  defaultValidationMessage: 'Value is invalid',
  validator: (value: string, constraint: number) => value.length <= constraint,
  decorator: (options: number, validationOptions?: ValidationOptions) => {
    // ...decorator implementation...
    return () => {};
  },
};

const fieldName = 'exampleField';
const value = 'exampleValue';
const constraint = 10;
const overrideDefaultMessage = 'Value exceeds maximum length';
const args = {};

const error = validateAndReturnError(
  exampleValidatorDefinition,
  fieldName,
  value,
  constraint,
  overrideDefaultMessage,
  args,
);
console.log(error);
 * */
export function validateAndReturnError<T, E>(
  validatorDefinition: IValidatorDefinition<T, E>,
  fieldName: string,
  value: T,
  constraint?: E,
  overrideDefaultMessage?: Path<I18nTranslations>,
  args?: unknown,
): I18nValidationError | undefined {
  const isValid = validatorDefinition.validator(value, constraint as E);

  return isValid
    ? undefined
    : validationDefinitionToI18NError(
        validatorDefinition,
        {
          key: fieldName,
          value,
        },
        constraint,
        overrideDefaultMessage,
        args,
      );
}

function throwValidationException<T, E>(
  validatorDefinition: IValidatorDefinition<T, E>,
  params: TransformFnParamsEssentials,
  constraint?: E,
  overrideDefaultMessage?: string,
  args?: unknown,
) {
  const validationError = validationDefinitionToI18NError(
    validatorDefinition,
    params,
    constraint,
    overrideDefaultMessage,
    args,
  );

  throw new GeneralBadRequestException(validationError);
}

