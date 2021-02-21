async function regressionData() {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/microServices/linear-regression',
    });

    if (res.data.status === 'success') {
      console.log(res.data);
      document.getElementById('coef').innerHTML =
        'Coefficient: ' + res.data.data.coef;
      document.getElementById('instructions').innerHTML = '';
      document.getElementById('plt').src =
        'data:image/png;base64, ' + res.data.data.plt;
      document.getElementById('daysLeft').innerHTML =
        res.data.data.daysLeft + ' days left to reach your goal weight!';
      document.getElementById('regressBtn').style.display = 'none';
      document.getElementById('plt').style.display = 'block';
    }
  } catch (err) {
    console.log(err);
  }
}

async function addWeight() {
  try {
    data = [parseFloat(document.getElementById('todaysWeight').value)];
    console.log(data);
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/weight',
      data: {
        weightData: data,
      },
    });
    if (res.data.status === 'success') {
      document.getElementById('successAdded').innerHTML =
        'Sucessfully added ' + data + ' KG to weight Data ';
    }
  } catch (err) {
    console.log(err);
  }
}

async function updateWeights() {
  try {
    const data = document.getElementById('weightData').value;
    let dataArr = data.split(',');
    console.log(dataArr);
    type = '';
    if (!document.getElementById('weightData').value) {
      type = 'POST';
    } else {
      type = 'PUT';
    }
    const res = await axios({
      method: type,
      url: '/api/v1/weight',
      data: {
        weightData: dataArr,
      },
    });

    if (res.data.status === 'success') {
      document.getElementById('successUpdatedWeights').innerHTML =
        'Sucessfully updated weights ';
    }
  } catch (err) {
    console.log(err);
  }
}

async function updateGoalWeights() {
  try {
    const data = parseFloat(document.getElementById('goal').value);
    console.log(data);
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/weight/goal',
      data: {
        goalWeight: data,
      },
    });

    if (res.data.status === 'success') {
      console.log('SUCCESS');
      document.getElementById('successAdded').innerHTML =
        'Sucessfully updated Goal Weight to ' + data;
    }
  } catch (err) {
    console.log(err);
  }
}

async function addWeights() {
  try {
    const data = document.getElementById('addWeightData').value;
    let dataArr = data.split(',');
    console.log(dataArr);
    type = '';
    if (!document.getElementById('weightData').value) {
      type = 'POST';
    } else {
      type = 'PATCH';
    }
    const res = await axios({
      method: type,
      url: '/api/v1/weight',
      data: {
        weightData: dataArr,
      },
    });

    if (res.data.status === 'success') {
      document.getElementById('successAddedSetWeights').innerHTML =
        'Sucessfully added weights ';
    }
  } catch (err) {
    console.log(err);
  }
}

async function getWeights() {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/weight',
    });

    if (res.data.status === 'success') {
      document.getElementById('weightData').innerHTML =
        res.data.data.weightData;
    }
  } catch (err) {
    console.log(err);
  }
}

async function updateUserInfo() {
  try {
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/updateMe',
      data: {
        Fname: fname,
        Lname: lname,
      },
    });

    if (res.data.status === 'success') {
      console.log('SUCCESS');
      document.getElementById('successAdded').innerHTML =
        'Sucessfully updated User Data ';
    }
  } catch (err) {
    console.log(err);
  }
}

async function updatePassword() {
  try {
    const passwordCurrent = document.getElementById('passwordCurrent').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/updateMyPassword',
      data: {
        passwordCurrent: passwordCurrent,
        password: password,
        passwordConfirm: passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      console.log('SUCCESS');
      document.getElementById('successAdded').innerHTML =
        'Sucessfully updated User Password ';
    }
  } catch (err) {
    console.log(err);
  }
}

async function deleteWeightData() {
  try {
    const res = await axios({
      method: 'DELETE',
      url: '/api/v1/weight',
    });

    if (res.data.status === 'success') {
      console.log('SUCCESS');
      document.getElementById('successAdded').innerHTML =
        'Sucessfully deleted users weight data';
    }
  } catch (err) {
    console.log(err);
  }
}

async function deleteMe() {
  try {
    const res = await axios({
      method: 'DELETE',
      url: '/api/v1/users/deleteMe',
    });

    logout();
  } catch (err) {
    console.log(err);
  }
}

function dailyFunction() {
  var x = document.getElementById('dailyWeight');
  x.style.display = 'flex';
  var y = document.getElementById('weightUpdator');
  y.style.display = 'none';
  var z = document.getElementById('setWeights');
  z.style.display = 'none';
  var m = document.getElementById('updateAccount');
  m.style.display = 'none';
  var n = document.getElementById('home');
  n.style.display = 'none';
  document.getElementById('successAdded').innerHTML = '';
  removeActive('homeBtn', 'setBtn', 'updateBtn', 'dailyBtn', 'userUpdateBtn');
  setActive('dailyBtn');
}

function updateFunction() {
  var x = document.getElementById('dailyWeight');
  x.style.display = 'none';
  var y = document.getElementById('weightUpdator');
  y.style.display = 'flex';
  var z = document.getElementById('setWeights');
  z.style.display = 'none';
  var m = document.getElementById('updateAccount');
  m.style.display = 'none';
  var n = document.getElementById('home');
  n.style.display = 'none';
  document.getElementById('successAdded').innerHTML = '';
  getWeights();
  removeActive('homeBtn', 'setBtn', 'updateBtn', 'dailyBtn', 'userUpdateBtn');
  setActive('updateBtn');
}

function setFunction() {
  var x = document.getElementById('dailyWeight');
  x.style.display = 'none';
  var y = document.getElementById('weightUpdator');
  y.style.display = 'none';
  var z = document.getElementById('setWeights');
  z.style.display = 'flex';
  var m = document.getElementById('updateAccount');
  m.style.display = 'none';
  var n = document.getElementById('home');
  n.style.display = 'none';
  document.getElementById('successAdded').innerHTML = '';
  removeActive('homeBtn', 'setBtn', 'updateBtn', 'dailyBtn', 'userUpdateBtn');
  setActive('setBtn');
}

function userUpdateFunction() {
  var x = document.getElementById('dailyWeight');
  x.style.display = 'none';
  var y = document.getElementById('weightUpdator');
  y.style.display = 'none';
  var z = document.getElementById('setWeights');
  z.style.display = 'none';
  var m = document.getElementById('updateAccount');
  m.style.display = 'flex';
  var n = document.getElementById('home');
  n.style.display = 'none';
  document.getElementById('successAdded').innerHTML = '';
  removeActive('homeBtn', 'setBtn', 'updateBtn', 'dailyBtn', 'userUpdateBtn');
  setActive('userUpdateBtn');
}

function homeFunction() {
  var x = document.getElementById('dailyWeight');
  x.style.display = 'none';
  var y = document.getElementById('weightUpdator');
  y.style.display = 'none';
  var z = document.getElementById('setWeights');
  z.style.display = 'none';
  var m = document.getElementById('updateAccount');
  m.style.display = 'none';
  var n = document.getElementById('home');
  n.style.display = 'flex';
  document.getElementById('successAdded').innerHTML = '';
  removeActive('homeBtn', 'setBtn', 'updateBtn', 'dailyBtn', 'userUpdateBtn');
  setActive('homeBtn');
}

async function logout() {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });
    if ((res.data.status = 'success')) {
      window.setTimeout(() => {
        location.assign('/api/v1/login');
      }, 1500);
    }
  } catch (err) {
    console.log(err.response);
  }
}

function removeActive(x, y, z, m, n) {
  document.getElementById(x).classList.remove('active');
  document.getElementById(y).classList.remove('active');
  document.getElementById(z).classList.remove('active');
  document.getElementById(m).classList.remove('active');
  document.getElementById(n).classList.remove('active');
}

function setActive(x) {
  document.getElementById(x).classList.add('active');
}

function showNav() {
  document.getElementById('homeBtn').style.display = 'block';
  document.getElementById('dailyBtn').style.display = 'block';
  document.getElementById('setBtn').style.display = 'block';
  document.getElementById('updateBtn').style.display = 'block';
  document.getElementById('userUpdateBtn').style.display = 'block';
  document.getElementById('logoutBtn').style.display = 'block';
  document.getElementById('showNavBtn').style.display = 'none';
  document.getElementById('closeNavBtn').style.display = 'block';
}

function closeNav() {
  document.getElementById('homeBtn').style.display = 'none';
  document.getElementById('dailyBtn').style.display = 'none';
  document.getElementById('setBtn').style.display = 'none';
  document.getElementById('updateBtn').style.display = 'none';
  document.getElementById('userUpdateBtn').style.display = 'none';
  document.getElementById('logoutBtn').style.display = 'none';
  document.getElementById('showNavBtn').style.display = 'block';
  document.getElementById('closeNavBtn').style.display = 'none';
}
