const login = async (email, password) => {
  try {
    document.getElementById('loadingBoxErrorMsg').style.display = 'none';
    document.getElementById('loadingBox').style.display = 'block';
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/api/v1/home');
      }, 1500);
    }
  } catch (err) {
    document.getElementById('loadingBox').style.display = 'none';
    document.getElementById('loadingBoxErrorMsg').style.display = 'block';
  }
};

const loginForm = document.querySelector('.form--login');

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

function viewLogin() {
  var x = document.getElementById('loginBox');
  x.style.display = 'block';
  var y = document.getElementById('registerBox');
  y.style.display = 'none';
}

function viewRegister() {
  var x = document.getElementById('loginBox');
  x.style.display = 'none';
  var y = document.getElementById('registerBox');
  y.style.display = 'block';
}

async function signUp() {
  try {
    const Fname = document.getElementById('fname').value;
    const Lname = document.getElementById('lname').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('newPassword').value;
    const passwordConfirm = document.getElementById('newPasswordConfirm').value;
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        Fname: Fname,
        Lname: Lname,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

function showModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
}

var span = document.getElementsByClassName('close')[0];

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}
