const child_process = require('child_process');
const path = require('path');
const fs = require('fs');
const node_modules = path.join(__dirname, '..', 'autoinstallers/rush-changemanager/node_modules');
const rushLib = require(path.join(node_modules, '@microsoft/rush-lib'));
const rushCore = require(path.join(node_modules, '@rushstack/node-core-library'));
const gitlog = require(path.join(node_modules, 'gitlog')).default;
const recommendedBump = require(path.join(node_modules, 'recommended-bump'));
const chalk = require(path.join(node_modules, 'chalk'));

const changefiles = 'changefiles'

function executeCommand(command) {
  //stdio: 'inherit': process will use the parent's stdin, stdout and stderr streams
  return child_process.execSync(command, { stdio: 'inherit' });
}
function executeCommandAsync(command) {
  //stdio: 'inherit': process will use the parent's stdin, stdout and stderr streams
  return child_process.exec(command, { stdio: 'inherit' });
}
function getCurrentBranch() {
  const currBranch = child_process.execSync("git branch --show-current").toString().trim();
  return child_process.execSync(`git rev-parse --symbolic-full-name --abbrev-ref "${currBranch}@{u}"`).toString().trim();
}
function parseLastCommit(repoPath) {
  const lastCommit = gitlog({ repo: repoPath, file: repoPath, number: 1, fields: ["subject", "body", "rawBody", "authorEmail", "hash"] });
  //fix, feat or BREAKING?
  const { increment } = recommendedBump([lastCommit[0].rawBody]);
  if (increment) {
    return {
      increment: increment,
      subject: lastCommit[0].subject,
      emailAddress: lastCommit[0].authorEmail,
      lastMessage: lastCommit[0].body,
      hash: lastCommit[0].hash,
    }
  }
  else {
    return false;
  }

}
function parseRecentCommits(projectName, projectPath, lastCommitInfo, repoPath, defaultCommitMessage) {

  const commits = gitlog({ repo: repoPath, file: projectPath, number: 2, fields: ["subject", "body", "rawBody", "authorEmail", "hash"] });
  //if the last two messages are the same, skip change file generation
  const commitMsgPass = (commits.length == 2 && commits[0].rawBody != commits[1].rawBody || commits.length == 1) && commits[0].body != defaultCommitMessage;

  //The project was included in the last commit
  if (lastCommitInfo.hash == commits[0].hash && commitMsgPass) {
    return Object.assign(lastCommitInfo, {
      projectName: projectName,
    });
  }
  //no changes for this project were included in the last commit, or the last 2 commits identical
  else {
    return false;
  }
}
async function getChangedProjectNamesAsync(rushConfiguration) {
  const projectAnalyzer = new rushLib.ProjectChangeAnalyzer(rushConfiguration);
  const terminal = new rushCore.Terminal(new rushCore.ConsoleTerminalProvider({ verboseEnabled: false }));

  try {
    const changedProjects = await projectAnalyzer.getChangedProjectsAsync({
      targetBranchName: getCurrentBranch(), //rushConfiguration.repositoryDefaultFullyQualifiedRemoteBranch,
      terminal: terminal,
      enableFiltering: false,
      shouldFetch: true,
      includeExternalDependencies: false
    });
    let rushProjects = new Map()
    //TODO: parse consumers? project.consumingProjects

    changedProjects.forEach(project => {
      rushProjects.set(project.packageName, project.projectFolder);
    });
    return rushProjects;

  } catch (error) {
    console.log(error);
    return null;
  }
}
function generateChangeFile(rushConfig, res) {
  console.time(changefiles, `generateChangeFile(${JSON.stringify(rushConfig), JSON.stringify(res)})`)
  let changeFilePath = rushLib.ChangeManager.createEmptyChangeFiles(rushConfig, res.projectName, res.emailAddress);
  console.time(changefiles, `changeFilePath: ${changeFilePath}`)
  const file = require(changeFilePath);
  file.changes[0].comment = res.lastMessage;
  file.changes[0].type = res.increment;
  fs.writeFileSync(changeFilePath, JSON.stringify(file, null, 2));
}

function generateChangeFilesFromCommit() {
  console.time(changefiles)
  const rushConfiguration = rushLib.RushConfiguration.loadFromDefaultLocation({ startingFolder: process.cwd() });
  //parse last commit to see if change file is necessary
  const lastCommitInfo = parseLastCommit(rushConfiguration.rushJsonFolder);
  console.timeLog(changefiles, 'lastCommitInfo:', lastCommitInfo)
  if (lastCommitInfo) {
    //get changed projects managed by rush
    getChangedProjectNamesAsync(rushConfiguration).then((rushProjects) => {
      console.timeLog(changefiles, rushProjects)
      rushProjects.forEach((value, key) => {
        //parse last 2 commits: was last commit for the project the last hash?
        const result = parseRecentCommits(key, value, lastCommitInfo, rushConfiguration.rushJsonFolder, rushConfiguration.gitChangeLogUpdateCommitMessage);
        if (result) {
          console.timeLog(changefiles, chalk.green(`Generating change file for "${result.increment}": "${result.subject}" form project ${result.projectName}`));
          generateChangeFile(rushConfiguration, result);
          console.timeLog(changefiles, chalk.green("Automatically adding change files"));
          executeCommand(`git add ${rushConfiguration.changesFolder}`);
          console.timeLog(changefiles, chalk.green(`Commiting change files with message: "${rushConfiguration.gitChangeLogUpdateCommitMessage}"`));
          executeCommandAsync(`git commit --no-edit --no-verify --amend `);
          console.timeLog(changefiles, chalk.green("All done!"));
        }
        else {
          console.timeLog(changefiles, chalk.yellow("Change file not required."));
        }
      });
    });
  }
  else {
    console.timeLog(changefiles, 'no last commit info, skipping')
  }
}

generateChangeFilesFromCommit();
