// Auth Routes
// Words Routes
// Lists Routes

/* ===================================
   Routes
=================================== */

const Auth
// POST api/user/register
// POST api/user/login
// GET api/user
// PUT api/user/:id/languages

const Words
// GET api/words
// GET api/words/:id
// POST api/words/:id
// PUT api/words/:id
// DELETE api/words/:id

const Lists
// GET api/lists
// GET api/lists/:id
// POST api/lists/:id
// PUT api/lists/:id
// DELETE api/lists/:id



/* ===================================
   Auth Routes
=================================== */

const Register
// POST api/user/register
// PAYLOAD { name: String, email: String, password: String, languages: [{native: String}, {foreign: String}] }
// RESPONSE { token: String }

const Login
// POST api/user/login
// PAYLOAD { name: String, password: String }
// RESPONSE { token: String }

const User
// GET api/user
// RESPONSE { languages: [{native: String}, {foreign: String}], _id: String, name: String, email: String  }

const Languages
// PUT api/user/:id/languages
// PAYLOAD { languages: Array || name: String || email: String }
// RESPONSE { languages: [{native: String}, {foreign: String}], _id: String, name: String, email: String  }


/* ===================================
   Words Routes
=================================== */

const All
// GET api/words

const Single
// GET api/words/:id

const Save
// POST api/words/:id

const Update
// PUT api/words/:id

const Delete
// DELETE api/words/:id



/* ===================================
   List Routes
=================================== */

const All
// GET api/lists

const Single
// GET api/lists/:id

const Save
// POST api/lists/:id

const Update
// PUT api/lists/:id

const Delete
// DELETE api/lists/:id