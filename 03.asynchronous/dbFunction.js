export function dbRunPromise(db, sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      }
      resolve(this);
    });
  });
}

export function dbGetPromise(db, sql, params) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}

export function dbClosePromise(db) {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}
