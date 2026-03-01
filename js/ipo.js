function applyIPO(companyName) {

  let appliedIPOs = JSON.parse(localStorage.getItem("appliedIPOs")) || [];

  appliedIPOs.push({
    company: companyName,
    date: new Date().toLocaleString(),
    status: "Application Submitted"
  });

  localStorage.setItem("appliedIPOs", JSON.stringify(appliedIPOs));

  document.getElementById("ipoMessage").innerText =
    "✅ Successfully Applied for " + companyName + " IPO!";
}
