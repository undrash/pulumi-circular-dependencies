import * as aws from '@pulumi/aws';
import { PlaceholderResourceName } from '../../lib';

export const s3Bucket = new aws.s3.Bucket(
  PlaceholderResourceName.S3BucketName,
  {
    bucket: PlaceholderResourceName.S3BucketName,
  },
);
