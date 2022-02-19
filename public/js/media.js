const submitMedia = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value.trim();
    const type = document.querySelector("#type").value;
    const description = document.querySelector("#desc").value.trim();

    if(title && type && description){
        const response = await fetch("api/media", {
            method: "POST",
            body: JSON.stringify({title, type, description}),
            headers: { "Content-Type": "application/json"}
        });

        if(response.ok){
            //Add to list
        }else{
            alert("Failed to submit.");
        }
    }
}

document
    .querySelector(".media-form")
    .addEventListener("submit", submitMedia);