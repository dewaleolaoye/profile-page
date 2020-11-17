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

const API = 'https://api.github.com/graphql';

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

      console.log(userDetails, 'userdetails');
      console.log(userDetails.repositories.totalCount, 'repositories');

      selectProfile.innerHTML += `<img alt="Github user" class="avatar-bg" src=${userDetails.avatarUrl} />`;
      getFullname.innerHTML += userDetails.name;
      getUsername.innerHTML += `@${userDetails.login}`;
      getBio.innerHTML += userDetails.bio;
      publicRepoCount.innerHTML = userDetails.repositories.totalCount;
    });
};

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
    });
};

fetchGitHubData();
fetchTotalRepoCount();
