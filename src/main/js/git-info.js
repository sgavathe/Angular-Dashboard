'use strict';

const moment = require('moment-timezone');
const parseDate = function(msSinceEpoch) {
  // "08.09.2017 @ 15:26:34 EDT"
  var timezone = moment.tz.guess();
  return moment.tz(msSinceEpoch, timezone).format('DD.MM.YYYY @ HH:mm:ss z');
};

const parseGitDate = function(d) {
  // Based on https://git-scm.com/docs/git-log
  // --date=raw = seconds since the epoch
  var secondsSinceEpoch = d.split(' ')[0];
  var msSinceEpoch = secondsSinceEpoch * 1000;
  return parseDate(msSinceEpoch);
};

const fromIsoDate = function(d) {
  var msSinceEpoch = moment(d).valueOf();
  return parseDate(msSinceEpoch);
};

const getCommitData = function(defaultValues) {
  const shell = require('shelljs');

  if (process.env.BRANCH_NAME) {
    defaultValues.branch = process.env.BRANCH_NAME;
  } else if (process.env.GIT_BRANCH) {
    defaultValues.branch = process.env.GIT_BRANCH;
  }

  // git show --no-patch --format=fuller --date=raw
  const gitLog = shell.exec('git log -1 --format=fuller --date=raw', {silent: true});
  return gitLog.stdout.split(/\0|\n/)
    .filter(function(item) {
      return Boolean(item);
    })
    .reduce(function(data, section) {
      var part = section.slice(0, section.indexOf(' ')).trim();
      var parts = part;
      var regexp = new RegExp(`^(${part})\\s+(.+)$`);
      switch (part.toLowerCase()) {
        case 'commit':
          // ignore these for now
          break;
        case 'author:':
          parts = section.match(regexp);
          if (parts) {
            data.author = parts[2];
          }
          break;
        case 'commit:':
          parts = section.match(regexp);
          if (parts) {
            data.committer = parts[2];
          }
          break;
        case 'authordate:':
          parts = section.match(regexp);
          if (parts) {
            data.authorDate = parseGitDate(parts[2]);
          }
          break;
        case 'commitdate:':
          parts = section.match(regexp);
          if (parts) {
            data.committerDate = parseGitDate(parts[2]);
          }
          break;
        default:
          // should just be the commit message left
          data.commitMessage = section.trim();
      }
      return data;
    }, defaultValues);
};

module.exports = function() {
  // First try with git-repo-info
  const gitRepoInfo = require('git-repo-info');
  gitRepoInfo._suppressErrors = false;
  let info = gitRepoInfo();

  // Normalize dates
  if (info.authorDate) {
    info.authorDate = fromIsoDate(info.authorDate);
  }
  if (info.committerDate) {
    info.committerDate = fromIsoDate(info.committerDate);
  }

  // Normalize abbreviatedSha
  if (info.abbreviatedSha) {
    info.abbreviatedSha = info.abbreviatedSha.substring(0, 7);
  }

  // Fill in missing information
  if (!info.branch || !info.authorDate || !info.committerDate) {
    info = getCommitData(info);
  }
  return info;
};
