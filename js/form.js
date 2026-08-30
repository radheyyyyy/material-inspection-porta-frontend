const form = document.getElementById("inspectionForm");

form.addEventListener("submit", async (e) => {
e.preventDefault();

const submitBtn = form.querySelector('.submit-btn');
const originalBtnText = submitBtn.innerText;
submitBtn.disabled = true;

let countdown = 3;
submitBtn.innerText = `Wait... ${countdown}s`;

const timerId = setInterval(() => {
  countdown--;
  if (countdown > 0) {
    submitBtn.innerText = `Wait... ${countdown}s`;
  } else {
    clearInterval(timerId);
    submitBtn.disabled = false;
    submitBtn.innerText = originalBtnText;
  }
}, 1000);

const formData = new FormData();

formData.append(
"site_incharge_name",
document.getElementById("site_incharge_name").value.trim()
);

formData.append(
"project_name",
document.getElementById("project_name").value.trim()
);
formData.append(
  "adequate_open_area_for_material_storage_is_available",
  document.getElementById(
    "adequate_open_area_for_material_storage_is_available"
  ).value
);

formData.append(
  "whether_the_area_is_barricaded_and_secure_or_not",
  document.getElementById(
    "whether_the_area_is_barricaded_and_secure_or_not"
  ).value
);

formData.append(
  "approach_for_machinery_movement_is_available_or_not",
  document.getElementById(
    "approach_for_machinery_movement_is_available_or_not"
  ).value
);

formData.append(
  "area_is_elevated_to_avoid_water_logging",
  document.getElementById(
    "area_is_elevated_to_avoid_water_logging"
  ).value
);

formData.append(
  "open_area_size",
  document.getElementById(
    "open_area_size"
  ).value.trim()
);

formData.append(
  "adequate_closed_store_is_available",
  document.getElementById(
    "adequate_closed_store_is_available"
  ).value
);

formData.append(
  "racks_are_provided_for_material_segregation",
  document.getElementById(
    "racks_are_provided_for_material_segregation"
  ).value
);

formData.append(
  "closed_store_size",
  document.getElementById(
    "closed_store_size"
  ).value.trim()
);

formData.append(
"security_guard",
document.getElementById("security_guard").value
);

formData.append(
"no_of_guards_agency_details",
document.getElementById("no_of_guards_agency_details").value.trim()
);

formData.append(
"material_issue_slip",
document.getElementById("material_issue_slip").value
);

formData.append(
"latest_issue_slip_no_and_attached_copy",
document.getElementById("latest_issue_slip_no_and_attached_copy").value.trim()
);

const attachment =
document.getElementById("issue_slip_attachment").files[0];

if (attachment) {
formData.append("attachment", attachment);
}

try {
const response = await fetch(
"/api/inspection",
{
method: "POST",
body: formData,
}
);

const data = await response.json();

if (data.success) {
  alert("Inspection Submitted Successfully!");
  form.reset();
} else {
  alert(data.error || data.message || "Something went wrong");
}

} catch (error) {
console.error("Submission Error:", error);
alert("Server Error. Please try again.");
}
});
