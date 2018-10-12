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

// toggle show/hide modal by id
function toggleModal(id) {
    const inputs = document.querySelectorAll(`#${id} input`)
    for(var i = 0;i < inputs.length;i++) {
        inputs[i].required ? inputs[i].required = false : inputs[i].required = true
    }
    setTimeout(function() {
        document.getElementById(id).classList.toggle('is-active')
        document.getElementById(id).querySelector(`input`).focus()
    }, 0)
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

// login user
function login() {
    axios.post(`/users/login`, getInputs('login-modal')).then((res) => {
        if(res.data.reason) {

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

// register user
function register() {
    axios.post(`/users`, getInputs('register-modal')).then((res) => {
        if(res.data.reasons) {

        } else {
            location.reload()
        }
    })
}
