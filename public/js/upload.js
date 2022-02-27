const upload = async (event) => {
    event.preventDefault();
    const image = document.getElementById("image").files[0];
    const id = document.getElementById("id").value;
    const data = new FormData();
    data.append("image", image);
    data.append("id", id);
    const response = await fetch(`/api/media/image/`, {
        method: "POST",
        body: data,
    });
    if(response.ok){
        alert("File upload successful.");
    }
};

document
    .getElementById("image-upload")
    .addEventListener('submit', upload);
