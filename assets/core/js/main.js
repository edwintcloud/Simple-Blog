document.onkeyup = function(e) {
    if(document.getElementById('register-modal').classList.contains('is-active') && e.keyCode == 13) {
        register()
    }
    if(document.getElementById('login-modal').classList.contains('is-active') && e.keyCode == 13) {
        login()
    }
    if(e.path[0].id == 'posts-search' && e.path[0].value != '') {
        searchPosts(e.path[0].value)
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

// get inputs and return as an object
function getInputs(id) {
    var result = {}
    const inputs = document.querySelectorAll(`#${id} [name]`)
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

// creates new post
function newPost() {
    const data = getInputs('new-post-panel')
    if(data.title == '' || data.content == '') return
    axios.post('/posts', data).then((res) => {
        window.location.href = `/posts?_id=${res.data._id}`
    })
}

// edits post
function editPost() {
    const data = getInputs('edit-post-panel')
    if(data.title == '' || data.content == '') return
    axios.put(`/posts?_id=${data.id}`, data).then((res) => {
        window.location.href = `/posts?_id=${data.id}`
    })
}

// delete post
function deletePost() {
    const id = document.querySelector('#footer-nav-btn [post-id]').getAttribute('post-id')
    if(confirm("Are you sure you want to delete this post?")) {
        axios.delete(`/posts?_id=${id}`).then((res) => {
            window.location.href = `/`
        })
    }
}

// create comment
function addComment() {
    const data = getInputs('add-comment')
    if(data.title == '' || data.content == '') return
    axios.post(`/comments`, data).then((res) => {
        location.reload()
    })
}

// new comment button action
function newCommentBtn() {
    document.getElementById('add-comment').scrollIntoView()
    document.querySelector('#add-comment textarea').focus()
}

// edit comment link action
function editComment(e) {
    var comment = e.closest('p').querySelectorAll('span')[1].innerHTML
    const commentId = e.getAttribute('comment-id')
    e.closest('p').querySelectorAll('span')[1].innerHTML = `<textarea class="textarea" name="content">${comment}</textarea>`
    const buttons = e.parentElement.querySelectorAll('a')
    e.parentElement.querySelector('span').innerHTML = ''
    buttons[0].removeAttribute('onclick')
    buttons[1].removeAttribute('onclick')
    buttons[0].innerHTML = 'Cancel'
    buttons[1].innerHTML = 'Save'
    buttons[0].addEventListener('click', () => {
        e.closest('p').querySelectorAll('span')[1].innerHTML = comment
        cancelEditComment(e)
    }, { once: true })
    buttons[1].addEventListener('click', () => {
        comment = e.closest('p').querySelectorAll('span textarea')[0].value
        axios.put(`/comments?_id=${commentId}`, { content: comment }).then((res) => {
            e.closest('p').querySelectorAll('span')[1].innerHTML = comment
            cancelEditComment(e)
        })
    }, { once: true })
}

// cancel editing comment
function cancelEditComment(e) {
    const buttons = e.parentElement.querySelectorAll('a')
    const commentId = e.getAttribute('comment-id')
    buttons[0].setAttribute('onclick', 'editComment(this)')
    buttons[1].setAttribute('onclick', 'deleteComment(this)')
    buttons[0].innerHTML = 'Edit'
    buttons[1].innerHTML = 'Delete'
    axios.get(`/comments?_id=${commentId}`).then((res) => {
        e.parentElement.querySelector('span').innerHTML = '· ' + moment(res.data.updatedAt).format('LLL')
    })

}

// delete comment
function deleteComment(e) {
    const commentId = e.getAttribute('comment-id')
    if(confirm("Are you sure you want to delete this comment?")) {
        axios.delete(`/comments?_id=${commentId}`).then((res) => {
            e.closest('article').remove()
        })
    }
}

// search posts
function searchPosts(term) {
    axios.get(`/posts?search=${term}`).then((res) => {
        if(res.data.length > 0) {
            const date = new Date(res.data[0].updatedAt)
            const curUser = document.getElementById('posts-search').getAttribute('current-user')
            document.getElementById('posts').innerHTML = ''
            for(var i = 0;i < res.data.length;i++) {
                document.getElementById('posts').innerHTML += `
                    <div class="column is-half">
                    <div class="card">
                    <header class="card-header has-background-light">
                    <section class="hero">
                    <div class="hero-body">
                    <div class="container">
                    <h1 class="title" style="margin-bottom:2px;">
                    ${res.data[i].title}
                    </h1>
                    <nav class="level" style="margin-left:5px;">
                    <div class="level-left">
                    <div class="level-item">
                    <span class="icon is-small is-left">
                    <i class="fas fa-user-circle" aria-hidden="true"></i>
                    </span>
                    <span style="margin-left: 8px;">by: ${res.data[i].author} on ${moment(date).format('MMM D')} at ${moment(date).format('LT')}</span>
                    </div>
                    </div>
                    </nav>
                    </div>
                    </div>
                    </section>
                    </header>
                    <div class="card-content">
                    <div class="content">
                    ${res.data[i].content.length > 50 ? res.data[i].content.substring(0, 50).concat('...') : res.data[i].content}
                    </div>
                    </div>
                    <footer class="card-footer">
                    <a href="/posts?_id={{res.data[i]._id}}" class="card-footer-item">View</a>
                    </footer>
                    </div>
                    </div>
                `
                if(curUser == res.data[i].author) {
                    document.querySelectorAll('#posts footer.card-footer')[i].innerHTML += `<a href="/posts/edit?_id=${res.data[i]._id}" class="card-footer-item">Edit</a>`
                }
            }
        }
    })
}

function verifyLink(e) {
    axios.get(e.getAttribute('href')).then((res) => {
        if(res.data == 'deleted') {
            e.parentElement.innerHTML = `<span style="color:red;">Deleted</span>`
        } else {
            window.location.href = e.getAttribute('href')
        }
    })
}
