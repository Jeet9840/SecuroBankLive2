document.addEventListener("DOMContentLoaded", function () {

  // Load saved name
  let savedName = localStorage.getItem("userName");
  if (savedName) {
    document.getElementById("userName").innerText = savedName;
  }

  // Load KYC status
  let kyc = localStorage.getItem("kycStatus");
  if (kyc) {
    document.getElementById("kycStatus").innerText = kyc;
  }

});

function updateName() {
  let newName = document.getElementById("editName").value;

  if (newName.trim() === "") {
    alert("Enter valid name");
    return;
  }

  localStorage.setItem("userName", newName);
  document.getElementById("userName").innerText = newName;

  document.getElementById("profileMessage").innerText =
    "✅ Name Updated Successfully!";
}

function updateKYC() {
  localStorage.setItem("kycStatus", "Completed");
  document.getElementById("kycStatus").innerText = "Completed";
  document.getElementById("kycStatus").style.color = "green";

  document.getElementById("profileMessage").innerText =
    "✅ KYC Successfully Updated!";
}

function contactSupport() {
  document.getElementById("profileMessage").innerText =
    "📞 Our support team will contact you shortly!";
}

function copyReferral() {
  let code = document.getElementById("refCode").innerText;
  navigator.clipboard.writeText(code);

  document.getElementById("profileMessage").innerText =
    "🎉 Referral Code Copied!";
}

function submitFeedback() {
  let feedback = document.getElementById("feedbackText").value;

  if (feedback.trim() === "") {
    alert("Please write feedback");
    return;
  }

  let feedbackList = JSON.parse(localStorage.getItem("feedbacks")) || [];
  feedbackList.push({
    text: feedback,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("feedbacks", JSON.stringify(feedbackList));

  document.getElementById("profileMessage").innerText =
    "✅ Thank you for your feedback!";

  document.getElementById("feedbackText").value = "";
}
