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
    const description = document.querySelector("#desc").value.trim();

    if(title && type && description){
        const response = await fetch("/api/media", {
            method: "POST",
            body: JSON.stringify({title, type, description}),
            headers: { "Content-Type": "application/json"}
        });

        if(response.ok){
            // Add to list, added to send back to homepage on valid response
            const item = await response.json();
            console.log(item);
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

// TODO: I didn't what it did so I just commented out after I got it working, but can still use!
// if(path[2]){
//     getMedia(path[2]);
// }else{
// }    

document
    .querySelector(".media-form")
    .addEventListener("submit", submitMedia);
