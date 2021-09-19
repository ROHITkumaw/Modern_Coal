const input = document.getElementById("input");
const rate = document.getElementById("rate");
const vofgoods = document.getElementById("vofgoods");
const amount = document.getElementById("amount");
const sgst_El = document.getElementById("sgst");
const cgst_El = document.getElementById("cgst");
const igst_El = document.getElementById("igst");
const total_El = document.getElementById("total");
const number_El = document.getElementById("number");
const name_El = document.getElementById("name");
const address_El = document.getElementById("address");
const pdf_gen = document.getElementById("pdf-gen");

let put = 0;
let rt = 0;
input.addEventListener("input", (e) => {
  put = +e.target.value;
});
rate.addEventListener("input", (e) => {
  rt = +e.target.value;
  vofgoods.classList.add("goods");
  vofgoods.innerHTML = "₹" + put * rt;
  amount.classList.add("goods");
  amount.innerHTML = "₹" + put * rt;
  const sgst = put * rt * (2.5 / 100);
  sgst_El.classList.add("goods");
  sgst_El.innerHTML = "₹" + sgst.toFixed(2);
  cgst_El.classList.add("goods");
  cgst_El.innerHTML = "₹" + sgst.toFixed(2);
  igst_El.classList.add("goods");
  igst_El.innerHTML = "₹" + (sgst * 2).toFixed(2);
  const total = put * rt + 4 * sgst;
  total_El.classList.add("goods");
  total_El.innerHTML = "₹" + total.toFixed(2);
  words.innerHTML = inWords(total.toFixed(0));
});
var a = [
  "",
  "one ",
  "two ",
  "three ",
  "four ",
  "five ",
  "six ",
  "seven ",
  "eight ",
  "nine ",
  "ten ",
  "eleven ",
  "twelve ",
  "thirteen ",
  "fourteen ",
  "fifteen ",
  "sixteen ",
  "seventeen ",
  "eighteen ",
  "nineteen ",
];
var b = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

function inWords(num) {
  if ((num = num.toString()).length > 9) return "overflow";
  n = ("000000000" + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = "";
  str +=
    n[1] != 0
      ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore "
      : "";
  str +=
    n[2] != 0
      ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh "
      : "";
  str +=
    n[3] != 0
      ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand "
      : "";
  str +=
    n[4] != 0
      ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred "
      : "";
  str +=
    n[5] != 0
      ? (str != "" ? "and " : "") +
        (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
        "only "
      : "";
  return str;
}
number_El.addEventListener("input", (e) => {
  const number = e.target.value;
  getGST(number);
});
const words = document.getElementById("words");

async function getGST(num) {
  const res = await fetch(
    `http://sheet.gstincheck.ml/check/9c930ef4e03119a39e685965df6e04bc/${num}`
  );

  const data = await res.json();
  address_El.innerHTML =
    data.data.pradr.addr.flno +
    ", " +
    data.data.pradr.addr.loc +
    ", " +
    data.data.pradr.addr.st +
    ", " +
    data.data.pradr.addr.dst +
    ", " +
    data.data.pradr.addr.pncd +
    ", " +
    data.data.pradr.addr.stcd +
    ".";
  // console.log(data.data.pradr.addr);
  name_El.innerHTML = data.data.lgnm;
}
