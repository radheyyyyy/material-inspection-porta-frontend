async function login() {
  const username =
    document.getElementById("username").value;

  const password =
    document.getElementById("password").value;

  try {
    const response = await fetch(
      "/api/admin/login",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    const data =
      await response.json();

    if (data.success) {
      localStorage.setItem(
        "adminLoggedIn",
        "true"
      );

      document.getElementById(
        "loginSection"
      ).style.display = "none";

      document.getElementById(
        "adminPanel"
      ).style.display = "block";

      loadData();
    } else {
      alert(
        data.message ||
        "Invalid Credentials"
      );
    }
  } catch (error) {
    console.error(error);
    alert("Server Error");
  }
}

async function loadData() {
  try {
    const response =
      await fetch("/api/inspection");

    const result =
      await response.json();

    const container =
      document.getElementById(
        "inspectionContainer"
      );

    container.innerHTML = "";

    result.data.forEach((item) => {
      container.innerHTML += `

      <div class="inspection-card">

        <h2>
          Material Storage Inspection Form
        </h2>

        <div class="form-group">
          <label>
            Site Incharge Name
          </label>

          <input
            type="text"
            value="${item.site_incharge_name}"
            readonly
          >
        </div>

        <div class="form-group">
          <label>
            Project Name
          </label>

          <input
            type="text"
            value="${item.project_name}"
            readonly
          >
        </div>

        <table>

          <thead>
            <tr>
              <th>S.No</th>
              <th>Key Information</th>
              <th>Status</th>
              <th>Qty / Measurement</th>
            </tr>
          </thead>

          <tbody>

            <tr>
  <td>1</td>
  <td>
    Adequate open area for material storage is available.
  </td>
  <td>
    ${item.adequate_open_area_for_material_storage_is_available}
  </td>
  <td rowspan="4">
    ${item.open_area_size}
  </td>
</tr>

<tr>
  <td>1.1</td>
  <td>
    Whether area is barricaded and secure or not.
  </td>
  <td>
    ${item.whether_the_area_is_barricaded_and_secure_or_not}
  </td>
</tr>

<tr>
  <td>1.2</td>
  <td>
    Approach for machinery movement is available or not.
  </td>
  <td>
    ${item.approach_for_machinery_movement_is_available_or_not}
  </td>
</tr>

<tr>
  <td>1.3</td>
  <td>
    Area is above to avoid water logging.
  </td>
  <td>
    ${item.area_is_elevated_to_avoid_water_logging}
  </td>
</tr>

     <tr>
  <td>2</td>
  <td>
    Adequate closed store is available.
  </td>
  <td>
    ${item.adequate_closed_store_is_available}
  </td>

  <td rowspan="2">
    ${item.closed_store_size}
  </td>
</tr>

<tr>
  <td>2.1</td>
  <td>
    Rack are provided for material segregation.
  </td>
  <td>
    ${item.racks_are_provided_for_material_segregation}
  </td>
</tr>
            <tr>
              <td>3</td>
              <td>
                <strong>
                  Security Guard
                </strong>
              </td>
              <td>
                ${item.security_guard}
              </td>
              <td>
                ${item.no_of_guards_agency_details}
              </td>
            </tr>

            <tr>
              <td>4</td>
              <td>
                <strong>
                  Material Issue Slip
                </strong>
              </td>
              <td>
                ${item.material_issue_slip}
              </td>
              <td>
                ${item.latest_issue_slip_no_and_attached_copy}

                ${item.issue_slip_attachment
          ? `
                    <br><br>

                    <a
                      href="${item.issue_slip_attachment}"
                      target="_blank"
                    >
                      View Attachment
                    </a>
                  `
          : ""
        }

              </td>
            </tr>

          </tbody>

        </table>

      </div>

      `;
    });
  } catch (error) {
    console.error(error);
  }
}

window.onload = () => {
  if (
    localStorage.getItem(
      "adminLoggedIn"
    ) === "true"
  ) {
    document.getElementById(
      "loginSection"
    ).style.display = "none";

    document.getElementById(
      "adminPanel"
    ).style.display = "block";

    loadData();
  }
};

function logout() {
  localStorage.removeItem(
    "adminLoggedIn"
  );

  location.reload();
}
