export enum ImportType {
  String = 'placeholder',
  Number = -1337,
  LambdaName = 'LambdaName',
  LambdaArn = 'LambdaArn',
  SQSQueueName = 'SQSQueueName',
  SQSQueueArn = 'SQSQueueArn',
  SQSQueueUrl = 'SQSQueueUrl',
  SQSFifoQueueName = 'SQSFifoQueueName',
  SQSFifoQueueArn = 'SQSFifoQueueArn',
  SQSFifoQueueUrl = 'SQSFifoQueueUrl',
  SNSTopicName = 'SNSTopicName',
  SNSTopicArn = 'SNSTopicArn',
  SNSFifoTopicName = 'SNSFifoTopicName',
  SNSFifoTopicArn = 'SNSFifoTopicArn',
  S3BucketName = 'S3BucketName',
  S3BucketArn = 'S3BucketArn',
  DynamoTableName = 'DynamoTableName',
  DynamoTableArn = 'DynamoTableArn',
  DynamoTableStreamArn = 'DynamoTableStreamArn',
}

export enum PlaceholderResourceName {
  LambdaName = 'placeholder-lambda',
  SQSQueueName = 'placeholder-sqs-queue',
  SQSFifoQueueName = 'placeholder-sqs-queue.fifo',
  SNSTopicName = 'placeholder-sns-topic',
  SNSFifoTopicName = 'placeholder-sns-topic.fifo',
  S3BucketName = 'placeholder-s3-bucket-0000x0x0x0x0',
  DynamoTableName = 'placeholder-dynamo-table',
}

export enum Stack {
  DEP_PROJ_1 = 'dep-proj-1',
  DEP_PROJ_2 = 'dep-proj-2',
  DEP_PROJ_3 = 'dep-proj-3',
}
