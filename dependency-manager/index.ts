import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import * as child_process from 'child_process';
import { Output } from '@pulumi/pulumi';
import { PlaceholderType } from './placeholders/enums';
import { getPlaceholderLambda } from './placeholders/lambda';
import { getPlaceholderSNS } from './placeholders/sns';

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

export enum Stack {
  DEP_PROJ_1 = 'dep-proj-1',
  DEP_PROJ_2 = 'dep-proj-2',
  DEP_PROJ_3 = 'dep-proj-3',
}

const placeholderFactory = (placeholderType: PlaceholderType) => {
  switch (placeholderType) {
    case PlaceholderType.String:
    case PlaceholderType.Number:
      return placeholderType;
    case PlaceholderType.LambdaName:
      return getPlaceholderLambda().then((lambda) => lambda.name);

    case PlaceholderType.LambdaArn:
      return getPlaceholderLambda().then((lambda) => lambda.arn);

    case PlaceholderType.SNSTopicName:
      return getPlaceholderSNS().then((sns) => sns.name);

    case PlaceholderType.SNSTopicArn:
      return getPlaceholderSNS().then((sns) => sns.arn);
  }
};

export const getDependency = ({
  stack,
  property,
  placeholderType,
}: {
  stack: Stack;
  property: string;
  placeholderType?: PlaceholderType;
}) => {
  if (!placeholderType) {
    placeholderType = PlaceholderType.String;
  }

  if (!stackExists(stack)) {
    const placeholderValue = placeholderFactory(placeholderType);

    // @ts-ignore
    const placeholderOutput = pulumi.output(placeholderValue);

    placeholderOutput.apply((v) => {
      pulumi.log.warn(
        `Stack ${stack} does not exist. Using dummy value '${v}' for deployment.`,
      );
      pulumi.log.warn(`Please deploy '${stack}' and try again.`);
    });

    return placeholderOutput;
  }

  const stackRef = new pulumi.StackReference(
    `organization/dependencies-1/${stack}`,
  );

  const output = stackRef.getOutput(property);

  return output.apply((v) => {
    if (v === undefined) {
      pulumi.log.warn(
        `Stack '${stack}' dependency '${property}' could not be resolved. Using dummy '${placeholderType}' value for deployment.`,
      );
      pulumi.log.warn(`Please deploy '${stack}' and try again.`);
      return placeholderType;
    }
    return v;
  });
};
export { PlaceholderType };
