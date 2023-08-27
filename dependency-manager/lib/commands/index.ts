import * as pulumi from '@pulumi/pulumi';
import * as child_process from 'child_process';
import { ImportType, Stack } from '../enums';

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
  type: ImportType,
  customError: (placeholderValue: string) => void,
) => {
  if (type === ImportType.String || type === ImportType.Number) {
    customError(type as string);
    return pulumi.output(type);
  }

  const stackRef = new pulumi.StackReference(
    `organization/dependency-manager/placeholders`,
  );

  const placeholdersStackOutput = stackRef.getOutput('placeholders');

  return placeholdersStackOutput.apply((placeholders) => {
    if (placeholders == null) {
      throw new Error(
        "Could not access 'placeholders' stack output when trying to get dependency fallback. Make sure the 'placeholders' stack is deployed.",
      );
    }

    const placeholder = placeholders[type];

    if (!placeholder) {
      throw new Error(
        `Could not find placeholder '${type}' in 'placeholders' stack.`,
      );
    }

    customError(placeholder);

    return placeholder;
  });
};

export const getDependency = ({
  stack,
  property,
  type,
}: {
  stack: Stack;
  property: string;
  type: ImportType;
}) => {
  if (!stackExists(stack)) {
    return getPlaceholder(type, (placeholderValue) => {
      pulumi.log.warn(
        `Stack ${stack} does not exist. Using placeholder value '${placeholderValue}' for deployment.`,
      );
      pulumi.log.warn(`Please deploy '${stack}' and try again.`);
    });
  }

  const stackRef = new pulumi.StackReference(
    `organization/dependencies-1/${stack}`,
  );

  const output = stackRef.getOutput(property);

  return output.apply((v) => {
    if (v) return v;

    return getPlaceholder(type, (placeholderValue) => {
      pulumi.log.warn(
        `Stack '${stack}' dependency '${property}' could not be resolved. Using placeholder '${placeholderValue}' value for deployment.`,
      );
      pulumi.log.warn(`Please deploy '${stack}' and try again.`);
    });
  });
};
