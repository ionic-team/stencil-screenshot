

export function formatDate(timestamp: number) {
  const d = new Date(timestamp);

  let rtn = (d.getUTCFullYear() + '-');
  rtn += ('0' + (d.getUTCMonth() + 1)).slice(-2) + '-';
  rtn += ('0' + d.getUTCDate()).slice(-2) + ' ';
  rtn += ('0' + d.getUTCHours()).slice(-2) + ':';
  rtn += ('0' + d.getUTCMinutes()).slice(-2) + ':';
  rtn += ('0' + d.getUTCSeconds()).slice(-2);

  return rtn;
}


export function formatCommitUrl(repoUrl: string, commitId: string) {
  if (repoUrl && repoUrl.startsWith('git+')) {
    // git+https://github.com/ionic-team/ionic.git"
    // to
    // https://github.com/ionic-team/ionic/commit/COMMIT_ID
    let commitUrl = repoUrl.substring(4);

    if (commitUrl.endsWith('.git')) {
      commitUrl = commitUrl.substr(0, repoUrl.length - 4);
    }

    commitUrl += `/commit/${commitId}`;
  }

  return '';
}
