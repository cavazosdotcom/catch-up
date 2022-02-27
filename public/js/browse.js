async function addToList(event){
    const id = event.target.dataset.id;
    const response = await fetch(`/api/lists/${id}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"}
    });
    if(response.ok){
        event.target.innerText = "Added to your list!";
        event.target.classList.add("disabled");
        event.target.classList.add("btn-success");
        event.target.classList.remove("btn-primary");
    }else{
        event.target.innerText = "Already in your list!";
        event.target.classList.add("disabled");
        event.target.classList.add("btn-secondary");
        event.target.classList.remove("btn-primary");
    }
}

document.querySelectorAll(".add-to-list").forEach((button) => button.addEventListener("click", addToList));