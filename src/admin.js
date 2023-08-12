const search_result = document.getElementById("search_result");
const resultShow = document.querySelector(".result-show");

search_result.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  let oldData = getDataLS("students");

  const studentResult = oldData.find(
    (item) => item.roll === data.roll && item.reg === data.reg
  );

  let content;
  if (studentResult) {
    content = `
    <div class="card shadow bg-white">
            <div
              class="card-header text-center"
              style="background-color: #f1dfdc"
            >
              <h2>Grade Sheet</h2>
            </div>
            <div class="card-body" style="background-color: #d1e7dd">
              <h3 class="lead">
                Name Of Student :
                <span class="small">${studentResult.name}</span>
              </h3>
              <h3 class="lead">Roll No : <span class="small">${
                studentResult.roll
              }</span></h3>
              <h3 class="lead">Reg No : <span class="small">${
                studentResult.reg
              }</span></h3>
              <table
                class="table table-bordered table-success table-hover mt-5"
              >
                <thead>
                  <tr>
                    <th>SL NO.</th>
                    <th>Name of subject</th>
                    <th>Mark</th>
                    <th>Grade</th>
                    <th>Grade Point</th>
                    <th>GPA</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>01</td>
                    <td>Bangla</td>
                    <td>${studentResult.result.bangla}</td>
                    <td>${getGpaResult(studentResult.result.bangla).grade}</td>
                    <td>${getGpaResult(studentResult.result.bangla).gpa}</td>
                    <td rowspan="6" style="vertical-align: middle">${getFinalResult(
                      {
                        bangla: studentResult.result.bangla,
                        english: studentResult.result.english,
                        math: studentResult.result.math,
                        science: studentResult.result.science,
                        social_science: studentResult.result.social_science,
                        religion: studentResult.result.religion,
                      }
                    ).point.toFixed(2)}
                    </td>
                    <td rowspan="6" style="vertical-align: middle">${
                      getFinalResult({
                        bangla: studentResult.result.bangla,
                        english: studentResult.result.english,
                        math: studentResult.result.math,
                        science: studentResult.result.science,
                        social_science: studentResult.result.social_science,
                        religion: studentResult.result.religion,
                      }).result
                    }
                    </td>
                  </tr>
                  <tr>
                    <td>02</td>
                    <td>English</td>
                    <td>${studentResult.result.english}</td>
                    <td>${getGpaResult(studentResult.result.english).grade}</td>
                    <td>${getGpaResult(studentResult.result.english).gpa}</td>
                  </tr>
                  <tr>
                    <td>03</td>
                    <td>Mathematics</td>
                    <td>${studentResult.result.math}</td>
                    <td>${getGpaResult(studentResult.result.math).grade}</td>
                    <td>${getGpaResult(studentResult.result.math).gpa}</td>
                  </tr>
                  <tr>
                    <td>04</td>
                    <td>Science</td>
                    <td>${studentResult.result.science}</td>
                    <td>${getGpaResult(studentResult.result.science).grade}</td>
                    <td>${getGpaResult(studentResult.result.science).gpa}</td>
                  </tr>
                  <tr>
                  <td>05</td>
                    <td>Social Science</td>
                    <td>${studentResult.result.social_science}</td>
                    <td>${
                      getGpaResult(studentResult.result.social_science).grade
                    }</td>
                    <td>${
                      getGpaResult(studentResult.result.social_science).gpa
                    }</td>
                  </tr>
                    
                  
                  <tr>
                    <td>06</td>
                    <td>Religion</td>
                    <td>${studentResult.result.religion}</td>
                    <td>${
                      getGpaResult(studentResult.result.religion).grade
                    }</td>
                    <td>${getGpaResult(studentResult.result.religion).gpa}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
    `;
  } else {
    content = `<h2 class= "text-center">Result Not Found</h2>`;
  }
  resultShow.innerHTML = content;
};
