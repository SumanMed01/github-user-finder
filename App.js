// function fetchUserProfile(username) {
//    return fetch(`https://api.github.com/users/${username}`).then((raw) =>
//        raw.json()
// ); 
// }
// fetchUserProfile('async').then(function (data) {
//     console.log(data);
// });


// function getUserRepos(username) {
//     return fetch(`https://api.github.com/users/${username}/repos`).then((raw) =>
//         raw.json()
//     );
// }
// getUserRepos('SumanMed01').then(function (data) {
//     console.log(data);
// });


// function getProfileData(username) {
//     return fetch(`https://api.github.com/users/${username}`).then((raw) =>{
//         if (!raw.ok) throw new Error('Network response was not ok');
//         return raw.json();
//     } );
// }

// function getUserRepos(username) {
//     return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then((raw) => {
//         if (!raw.ok) throw new Error('Network response was not ok');
//         return raw.json();
//     });
// }

// getUserRepos('mokkel').then(function (data) {
//     console.log(data);
// });

// Select elements
const input = document.querySelector("input");
const button = document.querySelector("button");
const profile = document.getElementById("profile");

// Fetch GitHub user data
async function fetchGitHubUser(username) {
    profile.innerHTML = `
  <div class="text-center text-gray-400 mt-10 animate-pulse">
    🔄 Loading user profile...
  </div>
`;

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();
    renderProfile(data);
    // const topRepos = await fetchTopRepos(username);
    // renderProfile(data, topRepos);

  } catch (error) {
    profile.innerHTML = `
      <div class="text-center text-red-400 mt-10">
        ❌ User not found. Please check the username.
      </div>
    `;
  }
}

// Render profile UI
function renderProfile(user)
 {
  profile.innerHTML = `
    <!-- Avatar & Basic Info -->
    <div class="flex gap-6">
      <img
        src="${user.avatar_url}"
        alt="GitHub Avatar"
        class="w-28 h-28 rounded-xl border border-gray-700"
      />

      <div class="flex flex-col justify-center">
        <h2 class="text-2xl font-bold text-white">${user.name || "No Name"}</h2>
        <p class="text-blue-400">@${user.login}</p>
        <p class="text-gray-400 mt-2 text-sm max-w-md">
          ${user.bio || "No bio available"}
        </p>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-3 gap-4 mt-8">
      <div class="bg-gray-800 p-4 rounded-xl text-center border border-gray-700">
        <p class="text-sm text-gray-400">Repos</p>
        <p class="text-2xl font-semibold mt-1">${user.public_repos}</p>
      </div>
      <div class="bg-gray-800 p-4 rounded-xl text-center border border-gray-700">
        <p class="text-sm text-gray-400">Followers</p>
        <p class="text-2xl font-semibold mt-1">${user.followers}</p>
      </div>
      <div class="bg-gray-800 p-4 rounded-xl text-center border border-gray-700">
        <p class="text-sm text-gray-400">Following</p>
        <p class="text-2xl font-semibold mt-1">${user.following}</p>
      </div>
    </div>

    <!-- Extra Details -->
    <div class="mt-8 space-y-3">

      <div class="flex items-center gap-3 text-gray-300">
        <span class="text-gray-500">📍</span>
        <p>${user.location || "Not available"}</p>
      </div>

      <div class="flex items-center gap-3 text-gray-300">
        <span class="text-gray-500">🔗</span>
        <a href="${user.blog || "#"}" target="_blank" class="text-blue-400 hover:underline">
          ${user.blog || "No website"}
        </a>
      </div>

      <div class="flex items-center gap-3 text-gray-300">
        <span class="text-gray-500">🏢</span>
        <p>${user.company || "Not available"}</p>
      </div>

      <div class="flex items-center gap-3 text-gray-300">
        <span class="text-gray-500">📅</span>
        <p>Joined ${new Date(user.created_at).toDateString()}</p>
      </div>

    </div>
  

  `;
}

// async function fetchTopRepos(username) {
//   const response = await fetch(
//     `https://api.github.com/users/${username}/repos?per_page=100`
//   );
//   const repos = await response.json();

//   return repos
//     .sort((a, b) => b.stargazers_count - a.stargazers_count)
//     .slice(0, 5);
// }


// Button click event
button.addEventListener("click", () => {
  const username = input.value.trim();

  if (username !== "") {
    fetchGitHubUser(username);
  }
});

// Enter key support
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    button.click();
  }
});


    

       