import * as pulumi from '@pulumi/pulumi';
import * as child_process from 'child_process';
import { PlaceholderType, Stack } from '../enums';

const stackExists = (stackName: string): boolean => {
  let stdout = child_process.execSync('pulumi stack ls --json').toString();

  let stacks = JSON.parse(stdout);

  for (let stack of stacks) {
    if (stack.name === stackName) {
      return true;
    }
  }

  return false;
};

const getPlaceholder = (
  placeholderType: PlaceholderType,
  customError: (placeholderValue: string) => void,
) => {
  if (
    placeholderType === PlaceholderType.String ||
    placeholderType === PlaceholderType.Number
  ) {
    customError(placeholderType as string);
    return pulumi.output(placeholderType);
  }

  const stackRef = new pulumi.StackReference(
    `organization/dependency-manager/placeholders`,
  );

  const placeholdersStackOutput = stackRef.getOutput('placeholders');

  return placeholdersStackOutput.apply((placeholders) => {
    if (placeholders == null) {
      throw new Error(
        'Could not access placeholders stack output when trying to get dependency fallback.',
      );
    }

    const placeholder = placeholders[placeholderType];

    if (!placeholder) {
      throw new Error(
        `Could not find placeholder '${placeholderType}' in 'placeholders' stack.`,
      );
    }

    customError(placeholder);

    return placeholder;
  });
};

export const getDependency = ({
  stack,
  property,
  placeholderType,
}: {
  stack: Stack;
  property: string;
  placeholderType: PlaceholderType;
}) => {
  if (!stackExists(stack)) {
    return getPlaceholder(placeholderType, (placeholderValue) => {
      pulumi.log.warn(
        `Stack ${stack} does not exist. Using placeholder value '${placeholderValue}' for deployment.`,
      );
      pulumi.log.warn(`Please deploy '${stack}' and try again.`);
    });
  }

  const stackRef = new pulumi.StackReference(
    `organization/dependencies-1/${stack}`,
  );

  console.log('stack exists...');

  const output = stackRef.getOutput(property);

  return output.apply((v) => {
    console.log('The output value is:', v);

    if (v) return v;

    return getPlaceholder(placeholderType, (placeholderValue) => {
      pulumi.log.warn(
        `Stack '${stack}' dependency '${property}' could not be resolved. Using placeholder '${placeholderValue}' value for deployment.`,
      );
      pulumi.log.warn(`Please deploy '${stack}' and try again.`);
    });
  });
};
