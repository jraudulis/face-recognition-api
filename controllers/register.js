const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  const saltRounds = 10;

  // Input validation
  if (!email || !name || !password) {
    return res.status(400).json('Invalid form submission');
  }

  // Generate password hash
  const hash = bcrypt.hashSync(password, saltRounds);

  // Start database transaction
  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0].email,  // Ensure loginEmail[0] exists
            name: name,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);  // Respond with the newly created user
          })
          .catch(err => {
            console.error('Error inserting user:', err);
            res.status(400).json('Unable to register user');  // Catching user insert errors
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);  // Rollback transaction on error
  })
    .catch(err => {
      console.error('Transaction error:', err);  // Log detailed error for debugging
      res.status(500).json('Unable to register');  // Respond with status 500 for server errors
    });
};

export default handleRegister;