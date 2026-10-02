const grades = {A:5,B:4,C:3,D:2,E:1,F:0};
const rows = document.getElementById("courseRows");
const semesters = document.getElementById("semesterRows");

function addCourse(code="", units="", grade="A"){
  const tr=document.createElement("tr");
  tr.innerHTML=`<td><input class="course" placeholder="e.g. MTH 101" value="${code}"></td>
  <td><input class="units" type="number" min="0" step="1" placeholder="3" value="${units}"></td>
  <td><select class="grade">${Object.keys(grades).map(g=>`<option ${g===grade?"selected":""}>${g}</option>`).join("")}</select></td>
  <td class="point">0.00</td><td><button class="delete">×</button></td>`;
  rows.appendChild(tr);
  tr.querySelectorAll("input,select").forEach(el=>el.addEventListener("input",calculate));
  tr.querySelector(".delete").onclick=()=>{tr.remove();calculate()};
  calculate();
}
function calculate(){
  let total=0, points=0;
  rows.querySelectorAll("tr").forEach(tr=>{
    const u=parseFloat(tr.querySelector(".units").value)||0;
    const p=grades[tr.querySelector(".grade").value]||0;
    total+=u; points+=u*p;
    tr.querySelector(".point").textContent=(u*p).toFixed(2);
  });
  document.getElementById("totalUnits").textContent=total;
  document.getElementById("qualityPoints").textContent=points.toFixed(2);
  document.getElementById("gpa").textContent=total? (points/total).toFixed(2):"0.00";
}
function addSemester(name="",units="",points=""){
  const tr=document.createElement("tr");
  tr.innerHTML=`<td><input class="sem" placeholder="e.g. 1st Semester" value="${name}"></td>
  <td><input class="sUnits" type="number" min="0" step="1" value="${units}"></td>
  <td><input class="sPoints" type="number" min="0" step="0.01" value="${points}"></td>
  <td><button class="delete">×</button></td>`;
  semesters.appendChild(tr);
  tr.querySelectorAll("input").forEach(el=>el.addEventListener("input",calculateCGPA));
  tr.querySelector(".delete").onclick=()=>{tr.remove();calculateCGPA()};
  calculateCGPA();
}
function calculateCGPA(){
  let units=0,points=0;
  semesters.querySelectorAll("tr").forEach(tr=>{
    units+=parseFloat(tr.querySelector(".sUnits").value)||0;
    points+=parseFloat(tr.querySelector(".sPoints").value)||0;
  });
  document.getElementById("cumUnits").textContent=units;
  document.getElementById("cumPoints").textContent=points.toFixed(2);
  document.getElementById("cgpa").textContent=units?(points/units).toFixed(2):"0.00";
}
document.getElementById("addCourse").onclick=()=>addCourse();
document.getElementById("addSemester").onclick=()=>addSemester();
document.getElementById("printBtn").onclick=()=>window.print();
addCourse(); addCourse(); addCourse();
addSemester("Previous Semester");
