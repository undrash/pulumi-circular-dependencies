import * as aws from '@pulumi/aws';
import { PlaceholderResourceName } from '../../lib';

export const sqsQueue = new aws.sqs.Queue(
  PlaceholderResourceName.SQSQueueName,
  {
    name: PlaceholderResourceName.SQSQueueName,
  },
);

export const sqsFifoQueue = new aws.sqs.Queue(
  PlaceholderResourceName.SQSFifoQueueName,
  {
    name: PlaceholderResourceName.SQSFifoQueueName,
    fifoQueue: true,
  },
);
