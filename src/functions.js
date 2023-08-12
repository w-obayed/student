/**
 * sent data ls
 */

const sendDataLS = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

/**
 * get data ls
 */

const getDataLS = (key) => {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  }

  return [];
};
/**
 * create alert
 */

const createAlert = (msg, type = "danger") => {
  return `<p class="alert alert-${type} d-flex justify-content-between">${msg}<button class="btn-close" data-bs-dismiss="alert"></button>
    </p>`;
};
/**
 * number cheak
 */

const isNumber = (num) => {
  const pattern = /^[0-9]{6,}$/;

  return pattern.test(num);
};

/**
 * random id
 */

const generateRandomId = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomId = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
};

/**
 * Result function
 */
const getGpaResult = (mark) => {
  let grade;
  let gpa;
  if (mark >= 0 && mark < 33) {
    grade = "F";
    gpa = 0;
  } else if (mark >= 33 && mark < 40) {
    grade = "D";
    gpa = 1;
  } else if (mark >= 40 && mark < 50) {
    grade = "C";
    gpa = 2;
  } else if (mark >= 50 && mark < 60) {
    grade = "B";
    gpa = 3;
  } else if (mark >= 60 && mark < 70) {
    grade = "A-";
    gpa = 3.5;
  } else if (mark >= 70 && mark < 80) {
    grade = "A";
    gpa = 4;
  } else if (mark >= 80 && mark <= 100) {
    grade = "A+";
    gpa = 5;
  } else {
    grade = "invalied";
    gpa = "invalied";
  }

  return {
    grade: grade,
    gpa: gpa,
  };
};
/**
 * final result
 */

const getFinalResult = (mark) => {
  let point;
  let result;

  let totalGpa =
    getGpaResult(mark.bangla).gpa +
    getGpaResult(mark.english).gpa +
    getGpaResult(mark.math).gpa +
    getGpaResult(mark.science).gpa +
    getGpaResult(mark.social_science).gpa +
    getGpaResult(mark.religion).gpa;

  point = totalGpa / 6;
  if (
    mark.bangla >= 33 &&
    mark.english >= 33 &&
    mark.math >= 33 &&
    mark.science >= 33 &&
    mark.social_science >= 33 &&
    mark.religion >= 33
  ) {
    if (point >= 1 && point < 2) {
      result = "D";
    } else if (point >= 2 && point < 3) {
      result = "C";
    } else if (point >= 3 && point < 3.5) {
      result = "B";
    } else if (point >= 3.5 && point < 4) {
      result = "A-";
    } else if (point >= 4 && point < 5) {
      result = "A";
    } else if (point >= 5) {
      result = "A+";
    }

    return {
      result: result,
      point: point,
    };
  } else {
    return {
      result: "F",
      point: 0,
    };
  }
};
