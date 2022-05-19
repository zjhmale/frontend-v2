# across

Layer 2 bridge interface

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Env variables

- REACT_APP_PUBLIC_INFURA_ID: an infura ID used to set up providers
- REACT_APP_PUBLIC_ONBOARD_API_KEY: onboard api key
- REACT_APP_CONFIRMATIONS: how many confirms before we consider transaction mined
- REACT_APP_GAS_PRICE_BUFFER: additional gas price to add to ensure enough buffer when sending max eth tx, specify in gwei
- REACT_APP_DEFAULT_GAS_PRICE: default gas price estimate when no online estimate is available, specify in gwei
- REACT_APP_UPDATE_GAS_INTERVAL_MS: how frequently to update gas prices in MS, used for estimating adding liquidity when maxing eth. Default 30000 (30 sec).
- REACT_APP_DISABLE_DEPOSITS: Displays a maintenance banner and disables the AddLiquidityForm in the Pool view.
- REACT_APP_ENABLE_REACT_QUERY_DEV_TOOLS: Display React-Query dev tools if set to `true`.
- REACT_APP_MATOMO_URL: Enable matomo by setting the matomo url, app will ignore events if not defined.
- REACT_APP_CHAIN_137_PROVIDER_URL: custom provider for Polygon node
- REACT_APP_CHAIN_42161_PROVIDER_URL: custom provider for Arbitrum node
- REACT_APP_MIGRATION_POOL_V2_WARNING: Warns user to check liquidity on V1 on Pool tab when set to `true`.
- REACT_APP_DEBUG: set to 1 (or any value) to enable debug logs. Leave undefined to disable logs.
- REACT_APP_DEFAULT_BLOCK_POLLING_INTERVAL_S: How quickly to poll blocks on chain, default 30 seconds if not supplied.

## Internal Contributions

This section outlines best practices for internal contributors, these are people who have direct access to the repository.
We currently do not have a process for external contributors but will add a section for that when applicable.

### Best Practices

- It's recommended to branch directly from the repo for easier collaboration. This doc will assume you branch from `origin/master`.
- All changes to master should first be a pull request.
- PR titles should conform to [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).
- Branch names should ideally be generated by [Shortcut](www.shortcut.com) issues, but otherwise there's no particular naming convention.
- Try to keep PRs focused on a single feature, bug, or issue.
- Document motivation for change in the PR, i.e. link to issue or describe reason for change.
- If the change is relatively complex, use the PR description to summarize what code was changed and why.
- If you want to make multiple changes in a PR, make sure they are small and document the motivation for each.
- Include screenshots when applicable. Before and after is ideal, though after, alone, is acceptable.
- Tag at least 2 reviewers. Most PRs should be merged in after 2 approvals, but low risk or high urgency PRs can be merged with 1.
- The owner of the PR merges the PR once approved.
- If changes are UI oriented, notify QA for additional approval above the technical review before PR is merged.

### Feature Branches

Use feature branches when you need to split up changes to the app which may break the app or introduce incomplete features.

- Name the branch based on the epic, story, feature or issue. Ideally, this name links back to the original shortcut card.
- Denote a feature branch with the prefix "epic/", for example "epic/l1tol2". We will reserve "epic" for feature branches.
- Open pull requests to feature branch, following the same best practices.
- Nominate someone to occasionally rebase feature branch to master when working as a team.
- QA should review individual PR's before merging to feature branch, though a final holistic QA process should be done before merging feature branch to master.
- When merging a feature branch, rebase it onto master before merge. See following sections for more information.

### Maintaining Branches

To avoid long-lived branches diverging from `master`, it's recommended to rebase rather than merge changes from master.
This makes it easy to spot problems during review as the commit history should only show your changes.
The frequency of rebasing is dependent on how quickly your branch is getting out of date, but you should generally rebase soon after you see changes on your upstream branch.
It's also recommended to rebase before opening a PR.

### Quick Rebase Guide

This guide assumes you have a branch in the repository, and not a fork, and the github repository is named `origin`.

1. Start on your branch. Ensure there are no uncommitted changes, if so commit or stash them.
2. `git fetch origin master` - This will fetch latest changes to master without switching branches. This assumes your upstream repository is names "origin".
3. `git rebase HEAD~X --onto origin/master` - Rebase your changes on top of the latest changes on master, where X is the number of commits you have made to your branch.
4. If conflicts occur, fix them, `git add` them and `git rebase --continue` until the rebase is complete.
5. If you have stashed changes before the rebase, `git stash pop` them and commit them or keep working.
6. When updating an existing PR, you can't just `git push`, but you must `git push -f` or [`git push --force-with-lease`](https://stackoverflow.com/questions/52823692/git-push-force-with-lease-vs-force#:~:text=force%20overwrites%20a%20remote%20branch,elses%20work%20by%20force%20pushing.).

For more details on rebasing, [see this guide](https://medium.com/@dirk.avery/the-definitive-git-rebase-guide-dbd7717f9437)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
