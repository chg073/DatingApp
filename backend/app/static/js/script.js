let currentFriend = null; // Store the current friend

document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch friends
    function fetchFriends() {
        // Perform GET request to /get-friends
        fetch('/friends/get-friends')
            .then(response => response.json())
            .then(friends => {
                const friendsList = document.getElementById("friends-list");
                friendsList.innerHTML = ""; // Clear existing content

                // Loop through data and add friends to the list
                friends.forEach(friend => {
                    const friendItem = document.createElement("li");
                    friendItem.classList.add("friend");
                    friendItem.setAttribute("onclick", `loadChat('${friend.name}')`);

                    friendItem.innerHTML = `
            <img src="/static/${friend.avatar}" alt="Avatar">
            <span>${friend.name}</span>
          `;
                    friendsList.appendChild(friendItem);
                });
            })
            .catch(error => console.error("Error fetching friends:", error));
    }

    // Load friends when the page is loaded
    fetchFriends();
});

// Function to simulate chat loading
function loadChat(friendName) {
    const chatHeader = document.getElementById("current-friend");
    const chatMessages = document.getElementById("chat-messages");

    chatHeader.textContent = friendName;
    chatMessages.innerHTML = `
    <div class="message received"><p>Chat with ${friendName} loaded!</p></div>
  `;
    currentFriend = friendName;
}

// Function to send a message and display the bot reply
function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value.trim();

  if (!message || !currentFriend) {
    alert("Please select a friend and enter a message!");
    return;
  }

  // Display the user's message in the chat window
  const chatMessages = document.getElementById("chat-messages");
  const userMessageElement = document.createElement("div");
  userMessageElement.classList.add("message", "sent");
  userMessageElement.innerHTML = `<p>${message}</p>`;
  chatMessages.appendChild(userMessageElement);

  // Scroll to the bottom of the chat
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Send the message to the server via POST /chats/<friend_id>
  fetch(`/chat/chats/${currentFriend}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "content": message }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Display the bot's reply in the chat
      const botReplyElement = document.createElement("div");
      botReplyElement.classList.add("message", "received");
      botReplyElement.innerHTML = `<p>${data.bot_reply}</p>`;
      chatMessages.appendChild(botReplyElement);

      // Scroll to the bottom of the chat
      chatMessages.scrollTop = chatMessages.scrollHeight;
    })
    .catch((error) => console.error("Error sending message:", error));

  // Clear the input field
  messageInput.value = "";
}