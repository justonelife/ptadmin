import {
  forwardRef,
  inject,
  Injectable,
  InjectionToken,
  makeEnvironmentProviders,
  Provider,
  Type,
} from '@angular/core';
import { DYNAMIC_TYPE, DynamicType } from '../types';

//TODO: extends with parameters
export function provideComponentControlResolver<
  ExtendedType extends string = DynamicType | string,
>(resolvers: Type<ComponentResolver<ExtendedType>>[] = []) {
  return makeEnvironmentProviders([
    ...resolvers.map((resolver) => {
      return {
        provide: COMPONENT_RESOLVER,
        useClass: forwardRef(() => resolver),
        multi: true,
      } as Provider;
    }),
    { provide: COMPONENT_RESOLVER, useClass: TextInputResolver, multi: true },
    { provide: COMPONENT_RESOLVER, useClass: TextareaResolver, multi: true },
    { provide: COMPONENT_RESOLVER, useClass: SelectResolver, multi: true },
    { provide: COMPONENT_RESOLVER, useClass: MultipleResolver, multi: true },
    { provide: COMPONENT_RESOLVER, useClass: ChipsInputResolver, multi: true },
    { provide: COMPONENT_RESOLVER, useClass: NumberInputResolver, multi: true },
  ]);
}

export interface ResolveType {
  component: Promise<Type<unknown>>;
  inputs?: Record<string, unknown>;
}

const COMPONENT_RESOLVER = new InjectionToken<ComponentResolver>(
  'COMPONENT_RESOVLER'
);
export interface ComponentResolver<ExtendedType extends string = DynamicType> {
  type: ExtendedType;
  resolve(): ResolveType;
}

@Injectable()
export class TextInputResolver implements ComponentResolver {
  type = DYNAMIC_TYPE.INPUT;
  resolve() {
    return {
      component: import('../components/text-input/text-input.component').then(
        (c) => c.LibTextInputComponent
      ),
    };
  }
}

@Injectable()
export class TextareaResolver implements ComponentResolver {
  type = DYNAMIC_TYPE.TEXTAREA;
  resolve(): ResolveType {
    return {
      component: import('../components/text-input/text-input.component').then(
        (c) => c.LibTextInputComponent
      ),
      inputs: {
        type: 'textarea',
      },
    };
  }
}

@Injectable()
export class SelectResolver implements ComponentResolver {
  type = DYNAMIC_TYPE.SELECT;
  resolve() {
    return {
      component: import('../components/select/select.component').then(
        (c) => c.LibSelectComponent
      ),
    };
  }
}

@Injectable()
export class MultipleResolver implements ComponentResolver {
  type = DYNAMIC_TYPE.MULTIPLE;
  resolve(): ResolveType {
    return {
      component: import('../components/select/select.component').then(
        (c) => c.LibSelectComponent
      ),
      inputs: {
        multiple: true,
      },
    };
  }
}

@Injectable()
export class ChipsInputResolver implements ComponentResolver {
  type = DYNAMIC_TYPE.CHIPS_INPUT;
  resolve(): ResolveType {
    return {
      component: import('../components/chips-input/chips-input.component').then(
        (c) => c.LibChipsInputComponent
      ),
    };
  }
}

@Injectable()
export class NumberInputResolver implements ComponentResolver {
  type = DYNAMIC_TYPE.NUMBER_INPUT;
  resolve(): ResolveType {
    return {
      component: import(
        '../components/number-input/number-input.component'
      ).then((c) => c.LibNumberInputComponent),
    };
  }
}

@Injectable()
export class LibComponentControlResolveService<
  ExtendedType extends string = DynamicType | string,
> {
  private resolvers = inject<ComponentResolver[]>(COMPONENT_RESOLVER);

  resolve(type: ExtendedType): ResolveType | null {
    const strategy = this.resolvers.find((r) => r.type === type);
    if (strategy) {
      return strategy.resolve();
    }
    return null;
  }
}
