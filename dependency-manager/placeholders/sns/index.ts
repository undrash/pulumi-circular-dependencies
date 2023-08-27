import * as aws from '@pulumi/aws';
import { PlaceholderResourceName } from '../../lib';

export const snsTopic = new aws.sns.Topic(
  PlaceholderResourceName.SNSTopicName,
  {
    name: PlaceholderResourceName.SNSTopicName,
  },
);

export const snsFifoTopic = new aws.sns.Topic(
  PlaceholderResourceName.SNSFifoTopicName,
  {
    name: PlaceholderResourceName.SNSFifoTopicName,
    fifoTopic: true,
  },
);
