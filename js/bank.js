function initBank(){
  if(!localStorage.getItem("bankData")){
    const bankData = {
      balance: 0,
      transactions: []
    };
    localStorage.setItem("bankData", JSON.stringify(bankData));
  }
}
initBank();

function addFunds(amount){
  const data = JSON.parse(localStorage.getItem("bankData"));

  data.balance += amount;

  data.transactions.push({
    type: "CREDIT",
    amount: amount,
    time: new Date().toLocaleString(),
    note: "Funds Added"
  });

  localStorage.setItem("bankData", JSON.stringify(data));
  refreshUI();
}

function sendFunds(amount, to){
  const data = JSON.parse(localStorage.getItem("bankData"));

  if(data.balance < amount){
    alert("Insufficient Balance");
    return;
  }

  data.balance -= amount;

  data.transactions.push({
    type: "DEBIT",
    amount: amount,
    time: new Date().toLocaleString(),
    note: "Sent to " + to
  });

  localStorage.setItem("bankData", JSON.stringify(data));
  refreshUI();
}

function renderTransactions(){
  const data = JSON.parse(localStorage.getItem("bankData"));
  const list = document.getElementById("transactionHistory");
  if(!list) return;

  list.innerHTML = "";

  data.transactions.slice().reverse().forEach(tx => {
    const row = document.createElement("div");
    row.className = "tx-row";

    row.innerHTML = `
      <span>${tx.type}</span>
      <span>₹${tx.amount}</span>
      <span>${tx.note}</span>
      <span>${tx.time}</span>
    `;

    list.appendChild(row);
  });
}

function renderBalance(){
  const data = JSON.parse(localStorage.getItem("bankData"));
  const bal = document.getElementById("balance");
  if(bal){
    bal.innerText = "₹" + data.balance;
  }
}

function refreshUI(){
  renderBalance();
  renderTransactions();
}

refreshUI();

