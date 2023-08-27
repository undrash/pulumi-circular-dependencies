import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import { PlaceholderResourceName } from '../enums';
import { Output } from '@pulumi/pulumi';

export const getPlaceholderSNS = async (): Promise<{
  name: Output<string>;
  arn: Output<string>;
}> => {
  console.log('getPlaceholderSNS CALLED....');

  const sns = new aws.sns.Topic(PlaceholderResourceName.SNSTopicName, {
    name: PlaceholderResourceName.SNSTopicName,
  });

  const returnValue = {
    name: sns.name,
    arn: sns.arn,
  };

  return returnValue;
};
