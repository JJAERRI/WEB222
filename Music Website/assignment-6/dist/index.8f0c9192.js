document.addEventListener("DOMContentLoaded", ()=>{
    const { artists, songs } = window;
    const menu = document.getElementById("menu");
    const selectedArtistElement = document.getElementById("selected-artist");
    const cardsContainer = document.getElementById("cards-container");
    // Artist Button
    function createArtistButtons() {
        menu.innerHTML = "";
        artists.forEach((artist)=>{
            const button = document.createElement("button");
            button.textContent = artist.name;
            button.addEventListener("click", ()=>{
                displayArtistSongs(artist.artistId);
            });
            menu.appendChild(button);
        });
    }
    // Artist Songs
    function displayArtistSongs(artistId) {
        const artist = artists.find((a)=>a.artistId === artistId);
        selectedArtistElement.innerHTML = `${artist.name} (${artist.urls.map((url)=>`<a href="${url.url}" target="_blank">${url.name}</a>`).join(", ")})`;
        cardsContainer.innerHTML = "";
        const filteredSongs = songs.filter((song)=>song.artistId === artistId && !song.explicit);
        filteredSongs.forEach((song)=>{
            const card = createSongCard(song);
            cardsContainer.appendChild(card);
        });
    }
    // Songs card
    function createSongCard(song) {
        const card = document.createElement("div");
        card.classList.add("card");
        const songImg = document.createElement("img");
        songImg.src = song.imageUrl;
        songImg.classList.add("card-image");
        card.appendChild(songImg);
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        const songTitle = document.createElement("h3");
        songTitle.textContent = song.title;
        songTitle.classList.add("card-title");
        cardBody.appendChild(songTitle);
        const songYear = document.createElement("time");
        songYear.textContent = song.year;
        songYear.classList.add("card-year");
        cardBody.appendChild(songYear);
        const songDuration = document.createElement("span");
        songDuration.textContent = formatDuration(song.duration);
        songDuration.classList.add("card-duration");
        cardBody.appendChild(songDuration);
        card.appendChild(cardBody);
        card.addEventListener("click", ()=>{
            window.open(song.url, "_blank");
        });
        return card;
    }
    function formatDuration(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    }
    createArtistButtons();
    displayArtistSongs(artists[0].artistId);
    const newsletterForm = document.getElementById("newsletter-form");
    if (newsletterForm) newsletterForm.addEventListener("submit", async (e)=>{
        e.preventDefault();
        const email = e.target.email.value;
        try {
            const response = await fetch("https://httpbin.org/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email
                })
            });
            const data = await response.json();
            console.log("Newsletter subscription successful!", data); // alert 대신 console.log 사용
        } catch (error) {
            console.error("Error:", error);
            console.log("Failed to subscribe to the newsletter."); // alert 대신 console.log 사용
        }
    });
    const artistRequestForm = document.getElementById("artist-request-form");
    if (artistRequestForm) {
        artistRequestForm.addEventListener("submit", async (e)=>{
            e.preventDefault();
            const formData = new FormData(artistRequestForm);
            const artistData = Object.fromEntries(formData.entries());
            try {
                const response = await fetch("https://httpbin.org/post", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(artistData)
                });
                const data = await response.json();
                console.log("Artist request submitted successfully!", data); // alert 대신 console.log 사용
            } catch (error) {
                console.error("Error:", error);
                console.log("Failed to submit artist request."); // alert 대신 console.log 사용
            }
        });
        const addSongUrlButton = document.getElementById("add-song-url");
        if (addSongUrlButton) addSongUrlButton.addEventListener("click", ()=>{
            const songUrlsContainer = document.getElementById("song-urls-container");
            const newInput = document.createElement("input");
            newInput.type = "url";
            newInput.name = "example-songs";
            newInput.required = true;
            songUrlsContainer.insertBefore(newInput, addSongUrlButton);
        });
    }
});

//# sourceMappingURL=index.8f0c9192.js.map
