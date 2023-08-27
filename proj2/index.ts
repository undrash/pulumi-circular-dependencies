import * as aws from '@pulumi/aws';
import { PlaceholderType, Stack, getDependency } from '../dependency-manager';

// IMPORTS ///////////////////////////////////////////

const importFromProj2 = getDependency({
  stack: Stack.DEP_PROJ_1, // Imported from Project 1
  property: 'exportToProj2',
  placeholderType: PlaceholderType.ARN,
});

const importFromProj3 = getDependency({
  stack: Stack.DEP_PROJ_3, // Imported from Project 3
  property: 'exportToProj2',
  placeholderType: PlaceholderType.ARN,
});

const localParam1ImportedValue = new aws.ssm.Parameter('imported-from-proj1', {
  type: 'String',
  name: '/proj2/imported-from-proj1',
  value: importFromProj2,
});

const localParam2ImportedValue = new aws.ssm.Parameter('imported-from-proj3', {
  type: 'String',
  name: '/proj2/imported-from-proj3',
  value: importFromProj3,
});

// EXPORTS ///////////////////////////////////////////

const exportToProj1Param = new aws.ssm.Parameter('exported-to-proj1', {
  type: 'String',
  name: '/proj2/exported-to-proj1',
  value: 'Exported from Project 2 to Project 1',
});

const exportToProj3Param = new aws.ssm.Parameter('exported-to-proj3', {
  type: 'String',
  name: '/proj2/exported-to-proj3',
  value: 'Exported from Project 2 to Project 3',
});

export const exportToProj1 = exportToProj1Param.arn;
export const exportToProj3 = exportToProj3Param.arn;
