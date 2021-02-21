async function deleteUser(id) {
  try {
    const res = await axios({
      method: 'DELETE',
      url: '/api/v1/users/' + id,
    });

    if (res.data.status === 'success') {
      location.reload();
    }
  } catch (err) {
    console.log(err);
  }
}
