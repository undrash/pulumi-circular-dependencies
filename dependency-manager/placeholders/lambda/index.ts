import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import { PlaceholderResourceName } from '../../lib';

export const lambda = new aws.lambda.Function(
  PlaceholderResourceName.LambdaName,
  {
    name: PlaceholderResourceName.LambdaName,
    runtime: aws.lambda.Runtime.NodeJS18dX,
    role: new aws.iam.Role('placeholder-lambda-role', {
      assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
        Service: 'lambda.amazonaws.com',
      }),
    }).arn,
    handler: 'index.handler',
    code: new pulumi.asset.FileArchive('./placeholders/lambda/code'),
  },
);
