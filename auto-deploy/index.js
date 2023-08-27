const child_process = require('child_process');

const stacks = [
  {
    dir: 'proj1',
    stackName: 'dep-proj-1',
  },
  {
    dir: 'proj2',
    stackName: 'dep-proj-2',
  },
  {
    dir: 'proj3',
    stackName: 'dep-proj-3',
  },
];

const deployedStacks = [];

const deployStack = (dir, stackName) => {
  // If the stack is already deployed, return
  if (deployedStacks.includes(stackName)) {
    return;
  }

  console.log('Deploying stack: ', stackName);

  const pulumiUpOutput = child_process
    .execSync(`pulumi up -C ../${dir}/ --stack ${stackName} --yes --json`)
    .toString();

  // Add the stack to the list of deployed stacks
  deployedStacks.push(stackName);

  // Extract stack dependencies from the warning messages
  const stackDependencies = [];
  const warningPattern =
    /warning: Stack '(.+)' dependency '(.+)' could not be resolved./g;
  let match;
  while ((match = warningPattern.exec(pulumiUpOutput)) !== null) {
    stackDependencies.push(match[1]);
  }

  console.log(
    `${stackName} has the following stack dependencies:`,
    stackDependencies.join(', '),
  );

  // If there are dependencies, deploy them first
  if (stackDependencies.length > 0) {
    for (const dependency of stackDependencies) {
      const stack = stacks.find((s) => s.stackName === dependency);
      deployStack(stack.dir, stack.stackName);
    }
  } else {
    return;
  }

  console.log('Re-deploying stack: ', stackName);

  // Now that all dependencies are deployed, deploy the current stack
  child_process
    .execSync(`pulumi up -C ../${dir}/ --stack ${stackName} --yes --json`)
    .toString();
};

const deployStacks = () => {
  for (const { dir, stackName } of stacks) {
    deployStack(dir, stackName);
  }
};

deployStacks();
