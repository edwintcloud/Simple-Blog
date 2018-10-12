document.onkeydown = function(e) {
    if(document.getElementById('register-modal').classList.contains('is-active') && e.keyCode == 13) {
        register()
    }
    if(document.getElementById('login-modal').classList.contains('is-active') && e.keyCode == 13) {
        login()
    }
}
document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target
        const $target = document.getElementById(target)

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active')
        $target.classList.toggle('is-active')

      })
    })
  }
})

// show modal by id
function showModal(id) {
    resetInputs(id)
    document.getElementById(id).classList.add('is-active')
    document.querySelector(`#${id} input`).focus()
}

// hide modal by id
function hideModal(id) {
    document.getElementById(id).classList.remove('is-active')
}

// get modal inputs and return as an object
function getInputs(id) {
    var result = {}
    const inputs = document.querySelectorAll(`#${id} input`)
    for(var i = 0;i < inputs.length;i++) {
        result[inputs[i].name] = inputs[i].value
    }
    return result
}

// reset inputs of modal by id
function resetInputs(id) {
    const inputs = document.querySelectorAll(`#${id} input`)
    for(var i = 0;i < inputs.length;i++) {
        inputs[i].value = ''
        inputs[i].dispatchEvent(new Event('change'))
    }
}

// login user
function login() {
    const inputs = document.querySelectorAll(`#login-modal input`)
    for(var i = 0;i < inputs.length;i++) {
        inputs[i].dispatchEvent(new Event('change'))
    }
    axios.post(`/users/login`, getInputs('login-modal')).then((res) => {
        if(res.data.reason) {
            if(res.data.reason.includes('Email')) {
                const emailInput = document.getElementById('login-modal').querySelector(`input[name='email']`)
                emailInput.classList.add('is-danger')
                var p = document.createElement('p')
                var t = document.createTextNode(`${res.data.reason}`)
                p.appendChild(t)
                p.classList.add('help', 'is-danger')
                emailInput.parentElement.appendChild(p)
                emailInput.addEventListener('change', () => {
                    emailInput.classList.remove('is-danger')
                    if(document.contains(emailInput.parentElement.querySelector('p'))) {
                        emailInput.parentElement.querySelector('p').remove()
                    }
                })
            }
            if(res.data.reason.includes('Password')) {
                const passwordInput = document.getElementById('login-modal').querySelector(`input[name='password']`)
                passwordInput.classList.add('is-danger')
                var p = document.createElement('p')
                var t = document.createTextNode(`${res.data.reason}`)
                p.appendChild(t)
                p.classList.add('help', 'is-danger')
                passwordInput.parentElement.appendChild(p)
                passwordInput.addEventListener('change', () => {
                    passwordInput.classList.remove('is-danger')
                    if(document.contains(passwordInput.parentElement.querySelector('p'))) {
                        passwordInput.parentElement.querySelector('p').remove()
                    }
                })
            }
        } else {
            location.reload()
        }
    })
}

// logout user
function logout() {
    axios.post(`/users/logout`).then((res) => {
        location.reload()
    })
}

// performs input validation on inputs in modal by id
function inputValid(id) {
    const data = getInputs(id)
    var valid = true
    if(id == 'register-modal') {
        if(data.password != data.confirmPassword || data.password.length < 6 || data.confirmPassword < 6) {
            const passwordInput = document.getElementById(id).querySelector(`input[name='password']`)
            const confirmPasswordInput = document.getElementById(id).querySelector(`input[name='confirmPassword']`)
            passwordInput.classList.add('is-danger')
            confirmPasswordInput.classList.add('is-danger')
            var p = document.createElement('p')
            if(data.password.length < 6 || data.confirmPassword < 6) {
                var t = document.createTextNode(`Passwords must be at least 6 digits!`)
            } else {
                var t = document.createTextNode(`Passwords must match!`)
            }
            p.appendChild(t)
            p.classList.add('help', 'is-danger')
            confirmPasswordInput.parentElement.appendChild(p)
            passwordInput.addEventListener('change', () => {
                passwordInput.classList.remove('is-danger')
            })
            confirmPasswordInput.addEventListener('change', () => {
                confirmPasswordInput.classList.remove('is-danger')
                if(document.contains(confirmPasswordInput.parentElement.querySelector('p'))) {
                    confirmPasswordInput.parentElement.querySelector('p').remove()
                }
            })
            valid = false
        }
        for(var key in data) {
            if(data[key].length < 3 && key != 'password' && key != 'confirmPassword') {
                const input = document.getElementById(id).querySelector(`input[name='${key}']`)
                input.classList.add('is-danger')
                var p = document.createElement('p')
                var t = document.createTextNode(`Please enter at least 4 characters!`)
                p.appendChild(t)
                p.classList.add('help', 'is-danger')
                input.parentElement.appendChild(p)
                input.addEventListener('change', () => {
                    input.classList.remove('is-danger')
                    if(document.contains(input.parentElement.querySelector('p'))) {
                        input.parentElement.querySelector('p').remove()
                    }
                })
                valid = false
            } else if(key == 'email'){
                if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
                    const input = document.getElementById(id).querySelector(`input[name='${key}']`)
                    input.classList.add('is-danger')
                    var p = document.createElement('p')
                    var t = document.createTextNode(`Please enter a valid email!`)
                    p.appendChild(t)
                    p.classList.add('help', 'is-danger')
                    input.parentElement.appendChild(p)
                    input.addEventListener('change', () => {
                        input.classList.remove('is-danger')
                        if(document.contains(input.parentElement.querySelector('p'))) {
                            input.parentElement.querySelector('p').remove()
                        }
                    })
                    valid = false
                }
            }
        }
    }
    if(id == 'login-modal') {

    }
    return valid
}

// register user
function register() {
    const inputs = document.querySelectorAll(`#register-modal input`)
    for(var i = 0;i < inputs.length;i++) {
        inputs[i].dispatchEvent(new Event('change'))
    }
    if(inputValid('register-modal')) {
    axios.post(`/users`, getInputs('register-modal')).then((res) => {
        if(res.data.reasons) {
            for(var i = 0;i < res.data.reasons.length;i++) {
                if(res.data.reasons[i].includes('Email')) {
                    const emailInput = document.getElementById('register-modal').querySelector(`input[name='email']`)
                    emailInput.classList.add('is-danger')
                    var p = document.createElement('p')
                    var t = document.createTextNode(`${res.data.reasons[i]}`)
                    p.appendChild(t)
                    p.classList.add('help', 'is-danger')
                    emailInput.parentElement.appendChild(p)
                    emailInput.addEventListener('change', () => {
                        emailInput.classList.remove('is-danger')
                        if(document.contains(emailInput.parentElement.querySelector('p'))) {
                            emailInput.parentElement.querySelector('p').remove()
                        }
                    })
                }
                if(res.data.reasons[i].includes('Screen')) {
                    const snInput = document.getElementById('register-modal').querySelector(`input[name='screenName']`)
                    snInput.classList.add('is-danger')
                    var p = document.createElement('p')
                    var t = document.createTextNode(`${res.data.reasons[i]}`)
                    p.appendChild(t)
                    p.classList.add('help', 'is-danger')
                    snInput.parentElement.appendChild(p)
                    snInput.addEventListener('change', () => {
                        snInput.classList.remove('is-danger')
                        if(document.contains(snInput.parentElement.querySelector('p'))) {
                            snInput.parentElement.querySelector('p').remove()
                        }
                    })
                }
            }
        } else {
            location.reload()
        }
    })
}
}
