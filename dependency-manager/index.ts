import { ImportType } from './lib';
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
  [ImportType.DynamoTableName]: dynamoTable.name,
  [ImportType.DynamoTableArn]: dynamoTable.arn,
  [ImportType.DynamoTableStreamArn]: dynamoTable.streamArn,
  [ImportType.LambdaName]: lambda.name,
  [ImportType.LambdaArn]: lambda.arn,
  [ImportType.S3BucketName]: s3Bucket.id,
  [ImportType.S3BucketArn]: s3Bucket.arn,
  [ImportType.SNSTopicName]: snsTopic.name,
  [ImportType.SNSTopicArn]: snsTopic.arn,
  [ImportType.SNSFifoTopicName]: snsFifoTopic.name,
  [ImportType.SNSFifoTopicArn]: snsFifoTopic.arn,
  [ImportType.SQSQueueName]: sqsQueue.name,
  [ImportType.SQSQueueArn]: sqsQueue.arn,
  [ImportType.SQSQueueUrl]: sqsQueue.url,
  [ImportType.SQSFifoQueueName]: sqsFifoQueue.name,
  [ImportType.SQSFifoQueueArn]: sqsFifoQueue.arn,
  [ImportType.SQSFifoQueueUrl]: sqsFifoQueue.url,
};
