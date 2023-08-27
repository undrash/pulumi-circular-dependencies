import * as aws from '@pulumi/aws';
import { PlaceholderResourceName } from '../../lib';

export const dynamoTable = new aws.dynamodb.Table(
  PlaceholderResourceName.DynamoTableName,
  {
    name: PlaceholderResourceName.DynamoTableName,
    attributes: [
      {
        name: 'id',
        type: 'S',
      },
    ],
    hashKey: 'id',
    billingMode: 'PAY_PER_REQUEST',
    streamEnabled: true,
    streamViewType: 'NEW_AND_OLD_IMAGES',
  },
);
