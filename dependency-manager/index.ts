import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import * as child_process from 'child_process';

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

export enum DummyValueType {
  STRING = 'dummy',
  ARN = 'arn:aws:dummy',
  NUMBER = -1337,
}

export enum Stack {
  DEP_PROJ_1 = 'dep-proj-1',
  DEP_PROJ_2 = 'dep-proj-2',
  DEP_PROJ_3 = 'dep-proj-3',
}

export const getDependency = ({
  stack,
  property,
  dummyValueType,
}: {
  stack: Stack;
  property: string;
  dummyValueType?: DummyValueType;
}) => {
  if (!dummyValueType) {
    dummyValueType = DummyValueType.STRING;
  }

  if (!stackExists(stack)) {
    pulumi.log.warn(
      `Stack ${stack} does not exist. Using dummy value '${dummyValueType}' for deployment.`,
    );
    pulumi.log.warn(`Please deploy '${stack}' and try again.`);

    return pulumi.output(dummyValueType);
  }

  const stackRef = new pulumi.StackReference(
    `organization/dependencies-1/${stack}`,
  );

  const output = stackRef.getOutput(property);

  return output.apply((v) => {
    if (v === undefined) {
      pulumi.log.warn(
        `Stack '${stack}' dependency '${property}' could not be resolved. Using dummy '${dummyValueType}' value for deployment.`,
      );
      pulumi.log.warn(`Please deploy '${stack}' and try again.`);
      return dummyValueType;
    }
    return v;
  });
};
