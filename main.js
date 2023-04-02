const harcamaInp = document.getElementById("harcama");
const fiyatInp = document.getElementById("fiyat");
const addBtn = document.getElementById("add-btn");
const expenseListDiv = document.getElementById("expenseList");
const checkInput = document.getElementById("check-input");
const totalExpense = document.getElementById("totalExpense");
const odendiInput = document.getElementById("odendi")
const nameInput = document.getElementById("nameInput")
const selectDiv = document.querySelector("select")


// Ekle butonu aktifleştirme (handleForm)
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addExpense();
});

let toplamHarcama = 0;

// Listeye Item ekleme
const addExpense = () => {
  // Validation
  if (harcamaInp.value === "" || fiyatInp.value === "") {
    alert("Alanlar boş bırakılamaz");
    return;
  }

  //   Eklenecek div'i oluşturma
  const expenseItemDiv = document.createElement("div");

  // Oluşturulan div'e class ekleme
  expenseItemDiv.classList.add(
    "p-0",
    "flex",
    "w-full",
    "justify-between",
    "items-center"
  );

  if(odendiInput.checked){
	expenseItemDiv.classList.add("odendi")
	odendiInput.checked=false
  }

  // Oluşturulan div'e HTML'de hazırlanan içeriği yerleştirme
  expenseItemDiv.innerHTML = `
		<div id="expenseItem" class="p-0 py-5 shadow-lg flex w-full justify-between items-center">
			<p>${harcamaInp.value}</p>
			<p class="text-green-500 text-lg font-bold font-pasifico">
  				<span id="fiyatSpan">${fiyatInp.value}</span>TL
			</p>
			<div class="flex items-center justify-between">
 				 	<img id="payment" class="cursor-pointer" width="25px" src="./assets/images/spend.png" alt="" />
  					<img id="deleteItem" class="cursor-pointer" width="25px" src="./assets/images/trash.png" alt="" />
			</div>
		</div>		
`;

  // Hazırlanan div'i parant Div'e bağlama
  expenseListDiv.appendChild(expenseItemDiv);

  // Toplam harcama div'indeki değeri güncelleme

  toplamHarcama += Number(fiyatInp.value);

  // Güncellenen yeni değeri HTML'de gösterme
  totalExpense.innerText = toplamHarcama;

  // Kayıt işlemi tamamlanma sonrası inputların boş olmasını sağlama
  harcamaInp.value = "";
  fiyatInp.value = "";
};

// Listeden Item silme
const handleDelete = (event) => {
  // Silinecek div içerisinden silme butonu olarak kullanılacak elemanı tanımlama
  if (event.target.id === "deleteItem") {
    // Tanımlanan eleman üzerinden silinecek div'e ulaşma
    const willDeleteDiv = event.target.parentElement.parentElement;

    willDeleteDiv.classList.add("fallDivDown");
			
/////////////////* çalışmadı */////////////////////
    // willDeleteDiv.addEventListener("transitionend", () => {
    //   willDeleteDiv.remove();
    // });
///////////////////////////////////////////////////////

	 // Tanımlanan div'i silme
	 willDeleteDiv.remove();

    // Toplam harcamayı güncelleme ve HTML'de güncel bilgiyi gösterme
    toplamHarcama -= Number(
      willDeleteDiv.querySelector("#fiyatSpan").innerText
    );
    totalExpense.innerText = toplamHarcama;
  }
  
  if(event.target.id==="payment"){
	const willDeleteDiv = event.target.parentElement.parentElement;
	willDeleteDiv.classList.toggle("odendi")
  }
};

// Silinecek elemanı belirleme adına tüm liste üzerinden elemanı bulmak için oluşturulan fonksiyon
expenseListDiv.addEventListener("click", handleDelete);



// Kullanıcı adını kaydetme (LocalStorage)
nameInput.addEventListener("change", (e)=>{
  localStorage.setItem("username", e.target.value)
})

// Kaydedilen kullanıcı adını ekrana basma
nameInput.value=localStorage.getItem("username")


// Select butonu aktifleştiren fonksiyon
const handleSelect = (e)=>{
 console.log( expenseListDiv.childNodes);
}

// Select butonu çalıştırma
selectDiv.addEventListener("change", handleSelect)