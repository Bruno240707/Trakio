import db from "./db.js";

export function findUserByUsername(username) {
  const query = "SELECT id, username, password FROM restapi_user WHERE username = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [username], (err, results) => {
      if (err) return reject(err);
      resolve(results[0] || null);
    });
  });
}

