export enum PlaceholderType {
  String = 'placeholder',
  Number = -1337,
  LambdaName = 'LambdaName',
  LambdaArn = 'LambdaArn',
  SQSQueueName = 'SQSQueueName',
  SQSQueueUrl = 'SQSQueueUrl',
  SNSTopicName = 'SNSTopicName',
  SNSTopicArn = 'SNSTopicArn',
  SNSTopicId = 'SNSTopicId',
  S3BucketName = 'S3BucketName',
  S3BucketArn = 'S3BucketArn',
  DynamoTableName = 'DynamoTableName',
  DynamoTableArn = 'DynamoTableArn',
  DynamoTableStreamArn = 'DynamoTableStreamArn',
}

export enum PlaceholderResourceName {
  LambdaName = 'placeholder-lambda',
  SQSQueueName = 'placeholder-sqs-queue',
  SNSTopicName = 'placeholder-sns-topic',
  S3BucketName = 'placeholder-s3-bucket-0000x0x0x0x0',
}
