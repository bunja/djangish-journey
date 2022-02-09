let form = document.getElementById('login-form')

form.addEventListener('submit', (e) => {
    e.preventDefault()// the page would not reload
    
    let formData = {
        'username': form.username.value,
        'password': form.password.value
    }

    fetch(`http://127.0.0.1:5000/api/users/token/`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
         console.log('success', data)
         if(data.access){
             localStorage.setItem('token', data.access)
             window.location = 'file:///home/larisa/PycharmProjects/django-cource/frontend/projects-list.html'
         } else {
             alert('Username or passport did not work')
         }
    })
})