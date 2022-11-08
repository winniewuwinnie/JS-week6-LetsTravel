// import axios from axios;
// import axios from '../node_modules/axios/dist/axios';
//想請問助教如果要使用npm安裝axios應該要怎麼引入呢?參考網路上的資料，但這行一直跳錯
// Uncaught SyntaxError: Cannot use import statement outside a module (at all.js:3:1)
let data;
const list = document.querySelector(".card-list");
axios
  .get(
    "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json"
  )
  .then(function (response) {
    data = response.data.data;
    render(data);
  });

//渲染資料
function render(inputData) {
  let str = "";
  // console.log(inputData);
  inputData.forEach(function(item){
    str += `<div class="col-md-6 col-lg-4">
      <div class="card shadow border-0 position-relative h-100">
        <div class="badge bg-info text-white rounded-0 rounded-end position-absolute fs-4 px-4 py-3">
        ${item.area}
        </div>
        <div class="card-header p-0 border-0">
          <img
            src="${item.imgUrl}"
            alt="${item.name}"
            class="card-img-top"
          />
        </div>
        <div class="card-body position-relative">
          <div class="badge bg-primary text-white rounded-0 rounded-end position-absolute p-2 top-0 start-0 translate-middle-y">
          ${item.rate}
          </div>
          <div class="card-title mt-2">
            <h3
              class="h4 text-primary fw-bold pb-1 border-bottom border-primary"
            >${item.name}</h3>
          </div>
          <p class="mb-0 text-secondary">${item.description}</p>
        </div>
        <div class="card-footer border-0 bg-white">
          <div class="row align-items-center">
            <div class="col-7 col-md-6">
              <p class="mb-0 text-primary fw-bold fs-6"><i class="bi bi-exclamation-circle-fill me-1"></i>剩下最後 ${item.group} 組</p>
            </div>
            <div class="col-5 col-md-6 ms-auto">
              <p class="mb-0 text-primary fw-bold fs-2 text-end"><span class="fs-6">TWD</span>$${item.price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>`
  });
  list.innerHTML = str;
}

//新增卡片
const form = document.querySelector(".form");
const name = document.querySelector(".tickets-name");
const imgUrl = document.querySelector(".tickets-imgUrl");
const area = document.querySelector(".tickets-area");
const price = document.querySelector(".tickets-price");
const group = document.querySelector(".tickets-group");
const rate = document.querySelector(".tickets-rate");
const description = document.querySelector(".tickets-description");
const addBtn = document.querySelector(".tickets-addBtn");
addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let obj = {
    id: data.length,
    name: name.value.trim(),
    imgUrl: imgUrl.value.trim(),
    area: area.value,
    price: price.value.trim(),
    group: group.value.trim(),
    rate: rate.value.trim(),
    description: description.value.trim(),
  };
  if (
    name.value == "" ||
    imgUrl.value == "" ||
    area.value == "" ||
    price.value == "" ||
    group.value == "" ||
    rate.value == "" ||
    description.value == ""
  ) {
    alert("欄位請勿空白");
  } else if (price.value <= 0 || group.value <= 0 || rate.value <= 0) {
    alert("數值輸入錯誤");
  } else if (description.value.trim().length > 100) {
    alert("套票描述超過100字");
  } else {
    data.push(obj);
    render(data);
    form.reset();
  }
});

//地區篩選
const areaSelect = document.querySelector(".area-select");
const areaSelectNum=document.querySelector(".area-select-num");
areaSelect.addEventListener("change", function (e) {
  let filterData = [];
  data.filter(function (item) {
    if (areaSelect.value == "全部") {
      render(data);
      areaSelectNum.textContent=`本次搜尋共${data.length}筆資料`;
    } else if (areaSelect.value == item.area){
      filterData.push(item);
      render(filterData);
      areaSelectNum.textContent=`本次搜尋共${filterData.length}筆資料`;
    } 
  });
});
