import { DISCORD_PARAMETERS_METADATA_KEY } from '../discord.constants';

type ParameterType = 'message';
export interface Parameter {
  index: number;
  propertyKey?: string | symbol;
  type?: ParameterType;
  field?: string;
}
export interface ParameterOptions {
  type?: ParameterType;
  field?: string;
}

export class DiscordParametersMetadataHandler {
  constructor(private readonly target: any) {}

  getCommandParameters(propertyKey: string): Parameter[] {
    const parameters =
      Reflect.getMetadata(
        DISCORD_PARAMETERS_METADATA_KEY,
        this.target,
        propertyKey,
      ) || [];
    return parameters;
  }
  private setCommandParameters(parameters: Parameter[], propertyKey: string) {
    Reflect.defineMetadata(
      DISCORD_PARAMETERS_METADATA_KEY,
      parameters,
      this.target,
      propertyKey,
    );
  }
  addCommandParameter(
    index: number,
    propertyKey: string | symbol,
    options?: ParameterOptions,
  ) {
    const parameter: Parameter = {
      index,
      propertyKey,
      field: options?.field,
      type: options?.type,
    };
    const parameters = this.getCommandParameters(propertyKey as string);
    parameters.push(parameter);
    this.setCommandParameters(parameters, propertyKey as string);
  }
}

export const Message =
  (options?: Omit<ParameterOptions, 'type'>) =>
  (target: any, propertyKey: string | symbol, index: number) => {
    const handler = new DiscordParametersMetadataHandler(target);
    handler.addCommandParameter(index, propertyKey, {
      ...options,
      type: 'message',
    });
  };
