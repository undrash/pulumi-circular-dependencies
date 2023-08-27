import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import { Stack, getDependency } from '../dependency-manager';
import { PlaceholderType } from '../dependency-manager/placeholders';

// // IMPORTS ///////////////////////////////////////////

// const importFromProj2 = getDependency({
//   stack: Stack.DEP_PROJ_2, // Imported from Project 2
//   property: 'exportToProj1',
//   placeholderType: PlaceholderType.ARN,
// });

// const importFromProj3 = getDependency({
//   stack: Stack.DEP_PROJ_3, // Imported from Project 3
//   property: 'exportToProj1',
//   placeholderType: PlaceholderType.ARN,
// });

// const localParam1ImportedValue = new aws.ssm.Parameter('imported-from-proj2', {
//   type: 'String',
//   name: '/proj1/imported-from-proj2',
//   value: importFromProj2,
// });

// const localParam2ImportedValue = new aws.ssm.Parameter('imported-from-proj3', {
//   type: 'String',
//   name: '/proj1/imported-from-proj3',
//   value: importFromProj3,
// });

// // EXPORTS ///////////////////////////////////////////

// const exportToProj2Param = new aws.ssm.Parameter('exported-to-proj2', {
//   type: 'String',
//   name: '/proj1/exported-to-proj2',
//   value: 'Exported from Project 1 to Project 2',
// });

// const exportToProj3Param = new aws.ssm.Parameter('exported-to-proj3', {
//   type: 'String',
//   name: '/proj1/exported-to-proj3',
//   value: 'Exported from Project 1 to Project 3',
// });

// export const exportToProj2 = exportToProj2Param.arn;
// export const exportToProj3 = exportToProj3Param.arn;

const importFromProj2 = getDependency({
  stack: 'asssss' as any, // Imported from Project 2
  property: 'exportToProj1',
  placeholderType: PlaceholderType.LambdaArn,
});

// console.log(importFromProj2);

// const localParam2ImportedValue = new aws.ssm.Parameter('imported', {
//   type: 'String',
//   name: '/proj1/imported-from-proj3',
//   value: importFromProj2,
// });

export const XXXXXXXXXX = pulumi.interpolate`${importFromProj2}`;
