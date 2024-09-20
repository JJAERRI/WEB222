document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("request-artist-form");
  const songsVideosContainer = document.getElementById("songs-videos-container");
  const addSongVideoButton = document.getElementById("add-song-video");
  const feedbackMessage = document.getElementById("feedback-message");

  addSongVideoButton.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "url";
    input.name = "songs-videos[]";
    songsVideosContainer.appendChild(input);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      if (key === "songs-videos[]") {
        if (!data["songs-videos"]) data["songs-videos"] = [];
        data["songs-videos"].push(value);
      } else {
        data[key] = value;
      }
    });

    fetch("https://httpbin.org/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        feedbackMessage.style.display = "block";
        console.log("Form submitted successfully!", data); // alert 대신 console.log 사용
        form.reset();
        setTimeout(() => {
          feedbackMessage.style.display = "none";
        }, 3000); // 3초 후 메시지를 숨깁니다.
      })
      .catch((error) => {
        console.error("Error:", error);
        console.log("Failed to submit form."); // alert 대신 console.log 사용
      });
  });
});
