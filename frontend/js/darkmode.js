const btnSwitch = document.querySelector('#switch');

btnSwitch.addEventListener('click', () => {
    
    document.body.classList.toggle('dark');
    btnSwitch.classList.toggle('active');

    let darkMode = "false";

    if(document.body.classList.contains('dark')){
        darkMode = "true";
    }
       
    localStorage.setItem('darkMode',darkMode);
    
});

if(localStorage.getItem('darkMode') === 'true'){
    document.body.classList.add('dark');
    btnSwitch.classList.add('active');
}