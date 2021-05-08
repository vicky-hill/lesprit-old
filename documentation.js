// Auth Routes
// Words Routes
// Lists Routes

/* ===================================
   Routes
=================================== */
const Defaults
// ERROR {msg: String}

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
// RESPONSE [{rating: Number, _id: MongoId, foreign: String, native: String, user: MongoId, dueDate: Date, list: {_id: MongoId, title: String}}]

const Single
// GET api/words/:id
// RESPONSE {rating: Number, _id: MongoId, foreign: String, native: String, dueDate: Date, user: MongoId, list: MongoId}

const Review
// GET api/words/review
// RESPONSE [{rating: Number, _id: MongoId, foreign: String, native: String, user: MongoId, dueDate: Date, list: MongoId}]

const Save
// POST api/words/:id
// PAYLOAD {foreign: String, native: String, user: MongoId, list: MongoId}
// RESPONSE {rating: Number, _id: MongoId, foreign: String, native: String, user: MongoId, dueDate: Date, list: MongoId}

const Update
// PUT api/words/:id
// PAYLOAD {rating: Number || _id: MongoId || foreign: String || native: String || dueDate: Date || user: MongoId || list: MongoId}
// RESPONSE {rating: Number, _id: MongoId, foreign: String, native: String, user: MongoId, dueDate: Date, list: {_id: MongoId, title: String}

const Delete
// DELETE api/words/:id
// RESPONSE {rating: Number, _id: MongoId, foreign: String, native: String, dueDate: Date, user: MongoId, list: MongoId}




/* ===================================
   List Routes
=================================== */

const All
// GET api/lists
// RESPONSE [{_id: MongoId, user: MongoId, title: String, slug: String}]

const Single
// GET api/lists/:id
// RESPONSE {_id: MongoId, user: MongoId, title: String, slug: String}

const Save
// POST api/lists/:id
// PAYLOAD {title: String, user: MongoId}
// RESPONSE {_id: MongoId, user: MongoId, title: String, slug: String}

const Update
// PUT api/lists/:id
// PAYLOAD {title: String || user: MongoId}
// RESPONSE {_id: MongoId, user: MongoId, title: String, slug: String}

const Delete
// DELETE api/lists/:id
// RESPONSE {_id: MongoId, user: MongoId, title: String, slug: String}