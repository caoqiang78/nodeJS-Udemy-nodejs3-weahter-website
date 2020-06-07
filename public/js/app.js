console.log('this is client js file');

// fetch('http://localhost:3000/weather?address=atlanta').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error);
//         } else {
//             console.log(data);
//         }
//     });
// });

const formEle = document.querySelector('form');
const inputEle = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

formEle.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = inputEle.value;
    
    messageOne.textContent = 'Loading...';
    messageTwo.texContent = '';
    
    fetch(`http://localhost:3000/weather?address=${inputValue}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                messageOne.textContent = data.error;
        } else {
            console.log(data);
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    });
});
})