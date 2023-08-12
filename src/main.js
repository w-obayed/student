const student_data = document.getElementById("student-data");
const msg = document.querySelector(".msg");
const msgEdit = document.querySelector(".msg-edit");
const studentsList = document.querySelector(".all-student-list");
const singleStudent = document.querySelector(".single-student");
const editStudent = document.querySelector("#edit-student-data");
const studentResult = document.getElementById("student-result");
const studentEditMark = document.getElementById("student-result-form");

// show all student
const getStudents = () => {
  const student = getDataLS("students");

  let content = "";

  if (student.length > 0) {
    student.map((item, index) => {
      content += `<tr class="align-middle">
      <td>${index + 1}</td>
      <td>
        <img
          style="
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 50%;
          "
          src="${item.photo}"
          alt="${item.name}"
        />
      </td>
      <td>${item.name}</td>
      <td>${item.roll}</td>
      <td>${item.reg}</td>
      <td>${item.createAt}</td>
      <td>
        ${
          item.result === null
            ? '<button class="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#student-result-modal" onclick="addResult(\'' +
              item.id +
              "')\">Add Marks</button>"
            : '<button class="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#student-edit-result-modal" onclick="editResult(\'' +
              item.id +
              "')\">View Marks</button>"
        }
        
      </td>
      <td>
        <button class="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#show-single-student-modal" onclick="showSingleStudent('${
          item.roll
        }')">
          <i class="fa-solid fa-eye"></i>
        </button>
        <button class="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#edit-student-modal" onclick="editStudentData('${
          item.id
        }')">
          <i class="fa-solid fa-edit"></i>
        </button>
        <button class="btn btn-sm btn-danger" onclick= "deleteStudent('${
          item.roll
        }')">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>`;
    });
  } else {
    content = `<tr>
    <td colspan = "8" class = "text-center">No data found</td>
    </tr>`;
  }
  studentsList.innerHTML = content;
};
getStudents();

// view students
const showSingleStudent = (roll) => {
  const allStudent = getDataLS("students");
  const { name, rol, reg, photo } = allStudent.find(
    (data) => data.roll === roll
  );
  singleStudent.innerHTML = `
  <img style="width: 100%" src="${photo}" alt="" />
  <h2 style="text-align: center">${name}</h2>
  <p style="text-align: center">Roll: ${roll} | Reg: ${reg}</p>
  `;
};

// add Result

const addResult = (id) => {
  studentResult.querySelector('input[name = "id"]').value = id;
};

// edit result

const editResult = (id) => {
  const data = getDataLS("students");
  const editResultData = data.find((item) => item.id === id);

  studentEditMark.querySelector('input[name="bangla"]').value =
    editResultData.result.bangla;
  studentEditMark.querySelector('input[name="english"]').value =
    editResultData.result.english;
  studentEditMark.querySelector('input[name="math"]').value =
    editResultData.result.math;
  studentEditMark.querySelector('input[name="science"]').value =
    editResultData.result.science;
  studentEditMark.querySelector('input[name="social_science"]').value =
    editResultData.result.social_science;
  studentEditMark.querySelector('input[name="religion"]').value =
    editResultData.result.religion;
  studentEditMark.querySelector('input[name="id"]').value = id;
};

// student result updata

studentEditMark.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

  const oldData = getDataLS("students");
  oldData[oldData.findIndex((item) => item.id === data.id)] = {
    ...oldData[oldData.findIndex((item) => item.id === data.id)],
    result: data,
  };
  sendDataLS("students", oldData);
  getStudents();
};

// student result submit

studentResult.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());
  // upload result
  const oldData = getDataLS("students");
  oldData[oldData.findIndex((item) => item.id === data.id)] = {
    ...oldData[oldData.findIndex((item) => item.id === data.id)],
    result: data,
  };
  sendDataLS("students", oldData);
  getStudents();
  e.target.reset();
};

// edit students

const editStudentData = (id) => {
  const oldData = getDataLS("students");

  const data = oldData.find((data) => data.id === id);
  editStudent.querySelector('input[name="name"]').value = data.name;
  editStudent.querySelector('input[name="roll"]').value = data.roll;
  editStudent.querySelector('input[name="reg"]').value = data.reg;
  editStudent.querySelector('input[name="id"]').value = data.id;
  editStudent.querySelector('input[name="photo"]').value = data.photo;
  editStudent.querySelector("img#prephoto").setAttribute("src", data.photo);
};

// edit form submit

editStudent.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  const getOldData = getDataLS("students");
  // cheak roll number
  if (getOldData.some((item) => item.roll === data.roll)) {
    msgEdit.innerHTML = createAlert("Roll already exists");
    return;
  }
  // cheak reg number
  if (getOldData.some((item) => item.reg === data.reg)) {
    msgEdit.innerHTML = createAlert("Reg already exists");
    return;
  }

  getOldData[getOldData.findIndex((item) => item.id === data.id)] = {
    ...getOldData[getOldData.findIndex((item) => item.id === data.id)],
    ...data,
  };
  sendDataLS("students", getOldData);
  getStudents();
};
// delete students

const deleteStudent = (roll) => {
  const conf = confirm("are you sure");

  if (conf) {
    const oldStudent = getDataLS("students");

    const updateData = oldStudent.filter((data) => data.roll !== roll);
    sendDataLS("students", updateData);
    getStudents();
  } else {
    alert("Your data safe");
  }
};

// submit student create form
student_data.onsubmit = (e) => {
  e.preventDefault();

  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

  // validation
  if (!data.name || !data.roll || !data.reg) {
    msg.innerHTML = createAlert("all field are requied");
  } else if (!isNumber(data.roll)) {
    msg.innerHTML = createAlert("invalid roll number");
  } else if (!isNumber(data.reg)) {
    msg.innerHTML = createAlert("invalid reg number");
  } else {
    const oldStudents = getDataLS("students");

    // cheak roll number
    if (oldStudents.some((item) => item.roll === data.roll)) {
      msg.innerHTML = createAlert("Roll already exists");
      return;
    }
    // cheak reg number
    if (oldStudents.some((item) => item.reg === data.reg)) {
      msg.innerHTML = createAlert("Reg already exists");
      return;
    }
    oldStudents.push({
      ...data,
      result: null,
      createAt: Date.now(),
      id: generateRandomId(26),
    });
    sendDataLS("students", oldStudents);

    e.target.reset();
    msg.innerHTML = createAlert(`${data.name} create successful`, "success");
    getStudents();
  }
};
