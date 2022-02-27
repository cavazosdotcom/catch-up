deleteBtn = document.querySelector('.delete-media');

const delButtonHandler = async (event) => {
    
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTimeout(() => {
        document.location.replace('/');
        }, 450);
      } else {
        alert('Failed to delete project');
      }
    }
};

const animate = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    
    // selects the specific row to animate
    const animate = document.querySelector(`.delete-animate${id}`);
    animate.classList.add('animate__animated', 'animate__bounceOutRight'); 

  } else {
    alert('failed to delete media')
  };
};

// Selects parent element to allow all of the rows to be a selectable for the animation
document
  .querySelector('.delete-animate-parent')
  .addEventListener('click', animate );

document
  .querySelector('.delete-media')
  .addEventListener('click', delButtonHandler );

