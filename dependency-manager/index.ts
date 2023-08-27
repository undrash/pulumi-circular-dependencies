import { PlaceholderType } from './lib';
import {
  dynamoTable,
  lambda,
  s3Bucket,
  snsTopic,
  snsFifoTopic,
  sqsQueue,
  sqsFifoQueue,
} from './placeholders';

export const placeholders = {
  [PlaceholderType.DynamoTableName]: dynamoTable.name,
  [PlaceholderType.DynamoTableArn]: dynamoTable.arn,
  [PlaceholderType.DynamoTableStreamArn]: dynamoTable.streamArn,
  [PlaceholderType.LambdaName]: lambda.name,
  [PlaceholderType.LambdaArn]: lambda.arn,
  [PlaceholderType.S3BucketName]: s3Bucket.id,
  [PlaceholderType.S3BucketArn]: s3Bucket.arn,
  [PlaceholderType.SNSTopicName]: snsTopic.name,
  [PlaceholderType.SNSTopicArn]: snsTopic.arn,
  [PlaceholderType.SNSFifoTopicName]: snsFifoTopic.name,
  [PlaceholderType.SNSFifoTopicArn]: snsFifoTopic.arn,
  [PlaceholderType.SQSQueueName]: sqsQueue.name,
  [PlaceholderType.SQSQueueArn]: sqsQueue.arn,
  [PlaceholderType.SQSQueueUrl]: sqsQueue.url,
  [PlaceholderType.SQSFifoQueueName]: sqsFifoQueue.name,
  [PlaceholderType.SQSFifoQueueArn]: sqsFifoQueue.arn,
  [PlaceholderType.SQSFifoQueueUrl]: sqsFifoQueue.url,
};
