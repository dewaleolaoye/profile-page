const USER_QUERY = `query {
  user(login: "dewaleolaoye") {
  bio
  avatarUrl
  name
  login
  repositories(affiliations: OWNER, orderBy: {direction: DESC, field: CREATED_AT}, first: 20, privacy: PUBLIC) {
    totalCount
    nodes {
      name
      updatedAt
      stargazerCount
      description
      isPrivate
      forkCount
      languages(first: 1) {
        nodes {
          color
          name
        }
      }
    }
  }
}
}`;

const TOTAL_REPO_COUNT = `{
  user(login: "dewaleolaoye") {
    repositories(first: 20) {
      totalCount
    }
  }
}
`;

const getFullname = document.querySelector('.fullname');
const getUsername = document.querySelector('.username');
const getBio = document.querySelector('.bio');
const selectProfile = document.querySelector('.profile-img');
const publicRepoCount = document.getElementById('counter');
const getTotalCount = document.querySelector('.total-count');
const getTotalCountMb = document.querySelector('.mb-total-count');

const selectRepo = document.querySelector('.repo-details');
// console.log(selectRepo, 'rep');

const API = 'https://api.github.com/graphql';

const fetchTotalRepoCount = () => {
  fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'appliation/json',
      Authorization: 'Bearer 2d198d966490cfafcafb1acab20667008ebea795',
    },
    body: JSON.stringify({
      query: TOTAL_REPO_COUNT,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const totalcount = data.data.user.repositories.totalCount;

      getTotalCount.innerHTML = totalcount;
      getTotalCountMb.innerHTML = totalcount;
    });
};

const fetchGitHubData = () => {
  fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'appliation/json',
      Authorization: 'Bearer 2d198d966490cfafcafb1acab20667008ebea795',
    },
    body: JSON.stringify({
      query: USER_QUERY,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const userDetails = data.data.user;

      // console.log(userDetails, 'userdetails');
      console.log(userDetails.repositories.nodes, 'repositories');

      selectProfile.innerHTML += `<img alt="Github user" class="avatar-bg" src=${userDetails.avatarUrl} />`;
      getFullname.innerHTML += userDetails.name;
      getUsername.innerHTML += `${userDetails.login}`;
      getBio.innerHTML += userDetails.bio;
      publicRepoCount.innerHTML = userDetails.repositories.totalCount;

      const repo = userDetails.repositories.nodes;

      const html = repo
        .map((repo) => {
          // console.log(repo.languages.nodes, 'nodes');
          const checkNode = repo.languages.nodes.length;
          const repoNode = repo.languages.nodes[0];
          return `
        <div class="repo-details">
        <div class="tags">
        
        <a href="#" class="repo-title">${repo.name}</a>
        <p class="repo-description">${
          repo.description === null ? '' : repo.description
        }</p>
        <div class="icons">

        <span style="background-color: ${
          checkNode !== 0 ? repoNode.color : ''
        }" class="planguage-color"></span>

        <span class="planguage">${checkNode !== 0 ? repoNode.name : ''}</span>

        <a class="star-count">
          <svg
            aria-label="star"
            class="octicon-star"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            height="16"
            role="img"
          >
            <path
              fill-rule="evenodd"
              d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
            ></path></svg
          >${repo.stargazerCount}
        </a>
        <a class="star-count">
          <svg
            aria-label="forks"
            class="octicon-repo-forked"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            height="16"
            role="img"
          >
            <path
              fill-rule="evenodd"
              d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
            ></path></svg
          >${repo.forkCount}
        </a>

        <span>updated on ${repo.updatedAt}</span>
      </div>
      </div>

      <div class="star-badge">
              <button type="button">
                <svg
                  class="octicon-star mr-1"
                  viewBox="0 0 16 16"
                  version="1.1"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                  ></path>
                </svg>
                Star
              </button>
          
        </div>
        </div>
        `;
        })
        .join('');

      selectRepo.insertAdjacentHTML('beforebegin', html);
    })
    .catch((err) => {
      console.log(err.message, 'erro');
      throw err;
    });
};

fetchGitHubData();
fetchTotalRepoCount();
