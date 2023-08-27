import * as aws from '@pulumi/aws';
import {
  PlaceholderType,
  Stack,
  getDependency,
} from '../dependency-manager/lib';

// IMPORTS ///////////////////////////////////////////

const importFromProj1 = getDependency({
  stack: Stack.DEP_PROJ_1, // Imported from Project 1
  property: 'exportToProj3',
  placeholderType: PlaceholderType.String,
});

const importFromProj2 = getDependency({
  stack: Stack.DEP_PROJ_2, // Imported from Project 2
  property: 'exportToProj3',
  placeholderType: PlaceholderType.String,
});

const localParam1ImportedValue = new aws.ssm.Parameter('imported-from-proj1', {
  type: 'String',
  name: '/proj3/imported-from-proj1',
  value: importFromProj1,
});

const localParam2ImportedValue = new aws.ssm.Parameter('imported-from-proj2', {
  type: 'String',
  name: '/proj3/imported-from-proj2',
  value: importFromProj2,
});

// EXPORTS ///////////////////////////////////////////

const exportToProj1Param = new aws.ssm.Parameter('exported-to-proj1', {
  type: 'String',
  name: '/proj3/exported-to-proj1',
  value: 'Exported from Project 3 to Project 1',
});

const exportToProj2Param = new aws.ssm.Parameter('exported-to-proj2', {
  type: 'String',
  name: '/proj3/exported-to-proj2',
  value: 'Exported from Project 3 to Project 2',
});

export const exportToProj1 = exportToProj1Param.arn;
export const exportToProj2 = exportToProj2Param.arn;
