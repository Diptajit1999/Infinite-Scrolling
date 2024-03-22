let page = 1;
const commentsList = document.getElementById("comments-list");
const modalDiv = document.getElementById("modal-div");
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modal-close");
const modalName = document.getElementById("modal-name");
const modalEmail = document.getElementById("modal-email");
const modalComment = document.getElementById("modal-comment");
let fetching = false;

function fetchData() {
    if (fetching) return; // If already fetching, exit early

    fetching = true; // Set fetching flag to true
    fetch(`https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=10`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            data.forEach((comment) => {
                const li = document.createElement("li");
                li.classList.add("comment");
                li.innerHTML = `<strong>${comment.id}</strong>: ${comment.body}`;
                li.addEventListener("click", () => openModal(comment));
                commentsList.appendChild(li);
            });
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        })
        .finally(() => {
            fetching = false; // Reset fetching flag regardless of success or failure
        });
}

function openModal(comment) {
    modalName.textContent = `Name: ${comment.name}`;
    modalEmail.textContent = `Email: ${comment.email}`;
    modalComment.textContent = `Comment: ${comment.body}`;
    modalDiv.style.display = "block";
    modal.style.display = "block";
}

function closeModal() {
    modalDiv.style.display = "none";
    modal.style.display = "none";
}

modalClose.addEventListener("click", closeModal);

window.addEventListener("scroll", () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 1) {
        page++;
        fetchData();
    }
});

console.log("calling");
fetchData();
