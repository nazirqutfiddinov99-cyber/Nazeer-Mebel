// NAZEER-MEBEL — app.js
// Mebel o'lchami, ko'rinishi, rang/material va narx hisoblash

document.addEventListener("DOMContentLoaded", function () {

  const inputs = document.querySelectorAll('input[type="number"]');

  const lengthInput = inputs[0];
  const heightInput = inputs[1];
  const depthInput = inputs[2];

  const buttons = Array.from(document.querySelectorAll("button"));

  const drawButton = buttons.find(b =>
    b.textContent.toLowerCase().includes("mebelni chizish")
  );

  const priceButton = buttons.find(b =>
    b.textContent.toLowerCase().includes("narxni hisoblash")
  );

  const priceBox = document.querySelector(".price, #price, .price-value");

  // Mebel ko'rinishini chizish
  function drawFurniture() {

    const L = Number(lengthInput?.value) || 2200;
    const H = Number(heightInput?.value) || 800;
    const D = Number(depthInput?.value) || 600;

    let preview = document.querySelector("#nazeer-preview");

    if (!preview) {
      preview = document.createElement("div");
      preview.id = "nazeer-preview";

      preview.style.cssText = `
        margin-top:20px;
        background:#eeeeee;
        border-radius:20px;
        padding:30px 15px;
        text-align:center;
      `;

      const target = document.querySelector("body");
      target.appendChild(preview);
    }

    const scale = Math.min(1, 330 / L);

    const width = Math.max(180, L * scale);
    const height = Math.max(120, H * scale);

    preview.innerHTML = `
      <div style="
        margin:auto;
        width:${width}px;
        height:${height}px;
        border:10px solid #555;
        background:#f7f7f7;
        position:relative;
        box-sizing:border-box;
        display:flex;
      ">

        <div style="
          width:50%;
          height:100%;
          border-right:5px solid #999;
          position:relative;
        ">
          <span style="
            position:absolute;
            right:12px;
            top:50%;
            width:8px;
            height:55px;
            background:#c99a16;
            transform:translateY(-50%);
            border-radius:2px;
          "></span>
        </div>

        <div style="
          width:50%;
          height:100%;
          position:relative;
        ">
          <span style="
            position:absolute;
            left:12px;
            top:50%;
            width:8px;
            height:55px;
            background:#c99a16;
            transform:translateY(-50%);
            border-radius:2px;
          "></span>
        </div>

      </div>

      <div style="
        margin-top:18px;
        font-size:17px;
        font-weight:bold;
      ">
        ${L} × ${H} × ${D} mm
      </div>
    `;
  }

  // Taxminiy narx
  function calculatePrice() {

    const L = Number(lengthInput?.value) || 2200;
    const H = Number(heightInput?.value) || 800;
    const D = Number(depthInput?.value) || 600;

    const area = (L / 1000) * (H / 1000);

    // Bazaviy hisob
    let price = area * 650000;

    // Chuqurlik koeffitsienti
    if (D > 500) {
      price *= 1.15;
    }

    price = Math.round(price / 1000) * 1000;

    const formatted = price.toLocaleString("uz-UZ");

    // Sahifadagi mavjud narx joylarini topish
    const allText = document.querySelectorAll("div, p, h2, h3, strong");

    let found = false;

    allText.forEach(el => {
      if (
        el.textContent.trim().match(/^0\s*so['’ʻ`]?m$/i) ||
        el.textContent.includes("so‘m")
      ) {
        if (!found && el.children.length === 0) {
          el.textContent = formatted + " so‘m";
          found = true;
        }
      }
    });

    // Alohida narx blokini yaratish
    if (!found) {
      let box = document.querySelector("#nazeer-price");

      if (!box) {
        box = document.createElement("div");
        box.id = "nazeer-price";

        box.style.cssText = `
          margin:20px;
          padding:25px;
          background:white;
          border-radius:20px;
          text-align:center;
          font-size:28px;
          font-weight:bold;
        `;

        document.body.appendChild(box);
      }

      box.textContent = formatted + " so‘m";
    }
  }

  // Chizish tugmasi
  if (drawButton) {
    drawButton.addEventListener("click", function () {
      drawFurniture();
    });
  }

  // Narx tugmasi
  if (priceButton) {
    priceButton.addEventListener("click", function () {
      calculatePrice();
    });
  }

  // Input o'zgarganda ko'rinishni yangilash
  [lengthInput, heightInput, depthInput].forEach(input => {
    if (input) {
      input.addEventListener("input", function () {
        drawFurniture();
      });
    }
  });

  console.log("Nazeer-Mebel app.js ishga tushdi.");
});
