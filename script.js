const url = "https://dummy-apis.netlify.app/api/contact-suggestions?count=1";

let pendingCount = 0;

for (let i = 0; i < 8; i++) {
  getUser();
}

function getUser() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      createCard(data);
    });
}

createCard = (card) => {
  // profil Image
  const profileImage = document.createElement("img");
  profileImage.classList.add("profile-image-card");
  profileImage.src = card[0].picture;

  // background Image

  const backgroundImage = document.createElement("img");

  backgroundImage.classList.add("background-image-card");
  if (card[0].backgroundImage) {
    backgroundImage.src = card[0].backgroundImage;
  } else {
    backgroundImage.src = card[0].picture;
  }

  //connect button and pending
  const connectBtn = document.createElement("button");
  connectBtn.setAttribute("id", "connect-btn");
  connectBtn.textContent = "Connect";

  const pending = document.querySelector("#pending-invitations");

  connectBtn.addEventListener("click", (e) => {
    const button = e.target;
    if (button.textContent === "Connect") {
      button.textContent = "Pending";
      pendingCount++;
      pending.textContent = `${pendingCount} pending invitations`;
    } else if (button.textContent === "Pending") {
      button.textContent = "Connect";
      pendingCount--;
      pending.textContent = `${pendingCount} pending invitations`;
    }
  });

  //cancel button
  const cancelBtn = document.createElement("button");
  cancelBtn.setAttribute("id", "cancel-btn");
  cancelBtn.textContent = "X";

  cancelBtn.addEventListener("click", () => {
    allCards.removeChild(oneCard);
    getUser();
  });

  //card text content title and name
  const titleAndName = document.createElement("h2");
  titleAndName.setAttribute("id", "title-name");
  titleAndName.textContent =
    card[0].name.title + ". " + card[0].name.first + " " + card[0].name.last;

  //job title
  const jobTitle = document.createElement("h3");
  jobTitle.setAttribute("id", "job");
  jobTitle.textContent = card[0].title;

  //mutual connections
  const createMutualConnection = document.createElement("p");
  createMutualConnection.setAttribute("id", "mutual-connections");
  createMutualConnection.textContent =
    card[0].mutualConnections + " Mutual Connections";

  //append elemnte in container

  const allCards = document.querySelector("#all-cards");
  const oneCard = document.createElement("div");
  oneCard.setAttribute("id", "one-card");
  oneCard.append(
    cancelBtn,
    backgroundImage,
    profileImage,
    titleAndName,
    jobTitle,
    createMutualConnection,
    connectBtn
  );
  allCards.append(oneCard);
};
