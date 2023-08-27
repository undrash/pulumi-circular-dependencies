import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import { Output } from '@pulumi/pulumi';
import { PlaceholderResourceName } from '../enums';

export const getPlaceholderLambda = async (): Promise<{
  name: Output<string>;
  arn: Output<string>;
}> => {
  const lambda = new aws.lambda.Function(PlaceholderResourceName.LambdaName, {
    name: PlaceholderResourceName.LambdaName,
    runtime: aws.lambda.Runtime.NodeJS18dX,
    role: new aws.iam.Role('placeholder-lambda-role', {
      assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
        Service: 'lambda.amazonaws.com',
      }),
    }).arn,
    handler: 'index.handler',
    code: new pulumi.asset.FileArchive(
      '../dependency-manager/placeholders/lambda/code',
    ),
  });

  const returnValue = {
    name: lambda.name,
    arn: lambda.arn,
  };

  return returnValue;
};
