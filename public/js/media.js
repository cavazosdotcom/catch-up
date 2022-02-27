// const path = window.location.pathname.split("/");

const getMedia = async (id) => {
    const response = await fetch(`/api/media/${id}`);
    const mediaData = await response.json();
    document.querySelector("#media-title").textContent = mediaData.title;
    document.querySelector("#media-type").textContent = mediaData.type;
    document.querySelector("#media-info").textContent = mediaData.info;
};

const submitMedia = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value.trim();
    const type = document.querySelector("#type").value;
    const info = document.querySelector("#desc").value.trim();
    const image = document.getElementById("image").files[0];

    if(title && type && info){
        const response = await fetch("/api/media", {
            method: "POST",
            body: JSON.stringify({title, type, info}),
            headers: { "Content-Type": "application/json"}
        });
        if(response.ok){
            // Add to list, added to send back to homepage on valid response
            const item = await response.json();
            if(image){
                const data = new FormData();
                data.append("image", image);
                data.append("id", item.id);
                const upload = await fetch(`/api/media/image/`, {
                    method: "POST",
                    body: data,
                });
                if(upload.ok){
                    console.log("Upload successful.");
                }
            }
            const added = await fetch(`/api/lists/${item.id}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"}
            })
            if(added.ok){
                document.location.replace('/');
            }else{
                alert("Failed to add to your list!")
            }
        }else{
            alert("Failed to create!");
        }
    }
};

document
    .querySelector(".media-form")
    .addEventListener("submit", submitMedia);
