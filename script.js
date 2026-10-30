let students = [
  {reg:101,name:"Harika",marks:85},
  {reg:102,name:"Ravi",marks:78}
];

function render(){
  const box=document.getElementById("records");
  document.getElementById("count").textContent=students.length+" record"+(students.length===1?"":"s");
  if(!students.length){box.innerHTML='<div class="empty-list">No student records. Add a student to create the first node.</div>';return}
  box.innerHTML='<div class="chain-label" style="color:#7dd3fc;font-size:11px;letter-spacing:1px;margin-bottom:4px">HEAD →</div>'+
    students.map((s,i)=>`<div class="record"><div class="num">${s.reg}</div><div><b>${escapeHtml(s.name)}</b><small>Registration Node ${i+1}</small></div><div><b>${Number(s.marks).toFixed(2)}</b><small>Marks</small></div><div style="color:#688097">${i<students.length-1?"→":"∅"}</div></div>`).join("");
}
function addStudent(){
  const reg=Number(document.getElementById("reg").value),name=document.getElementById("name").value.trim(),marks=Number(document.getElementById("marks").value),msg=document.getElementById("message");
  if(!reg||!name||Number.isNaN(marks)||marks<0||marks>100){msg.textContent="Please enter valid registration number, name and marks (0–100).";msg.style.color="#ff9baa";return}
  if(students.some(s=>s.reg===reg)){msg.textContent="Registration number already exists.";msg.style.color="#ff9baa";return}
  students.push({reg,name,marks});render();msg.textContent="✓ Student node added successfully.";msg.style.color="#8fe0b3";
  document.getElementById("reg").value="";document.getElementById("name").value="";document.getElementById("marks").value="";
}
function searchStudent(){
  const reg=Number(document.getElementById("actionReg").value),s=students.find(x=>x.reg===reg),box=document.getElementById("searchResult");
  if(!reg){box.textContent="Enter a registration number.";box.className="result empty";return}
  if(s){box.innerHTML=`<b>Student Found</b><br><span style="color:#91a6b8">Reg No:</span> ${s.reg} &nbsp; <span style="color:#91a6b8">Name:</span> ${escapeHtml(s.name)} &nbsp; <span style="color:#91a6b8">Marks:</span> ${Number(s.marks).toFixed(2)}`;box.className="result"}
  else{box.textContent="Student record not found.";box.className="result empty"}
}
function deleteStudent(){
  const reg=Number(document.getElementById("actionReg").value),i=students.findIndex(x=>x.reg===reg),box=document.getElementById("searchResult");
  if(!reg){box.textContent="Enter a registration number.";box.className="result empty";return}
  if(i<0){box.textContent="Student record not found.";box.className="result empty";return}
  const removed=students.splice(i,1)[0];render();box.innerHTML=`<b>Deleted:</b> ${escapeHtml(removed.name)} (Reg No. ${removed.reg})`;box.className="result";
}
function escapeHtml(v){return v.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function copyCode(){
  const text=document.getElementById("codeBox").innerText;navigator.clipboard.writeText(text).then(()=>alert("C source code copied!"));
}
render();