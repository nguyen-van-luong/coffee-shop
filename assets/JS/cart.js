let nutTang = document.querySelectorAll(".js-plus");
let nutGiam = document.querySelectorAll(".js-minus");
let inputs = document.querySelectorAll(".quantity");
let checks = document.querySelectorAll(".check-btn");
let sumItem = document.querySelector(".total-item");
let sumItem2 = document.querySelector(".total-item-bottom");
let tongtien = document.querySelector(".total-money");
let thanhtien = document.querySelector(".result-money");
let thanhtien2 = document.querySelector(".result-money-bottom");
let payment = document.querySelectorAll(".cart-payment");
let trashItem = document.querySelectorAll(".trash-btn");
let trashAll = document.querySelector(".trash-all-btn");
let chooseAll = document.getElementById("choose-all");
let modal = document.querySelector(".cart-modal");
let modalContainer = document.querySelector(".modal-container");
let closeModalBtn = document.querySelector(".modal-close");
let cancelModal = document.querySelector(".cancel-btn");
let agreeModal = document.querySelector(".agree-btn");
let trashText = document.querySelector(".trash-text");
let dialog = document.querySelector(".cart-dialog");
let dialogIcon = document.querySelector(".dialog-icon");
let dialogText = document.querySelector(".dialog-text");
let chooseItem = 0;
let text1 = "Bạn có muốn loại bỏ sản phẩm này khỏi giỏ hàng không?";
let text2 = "Bạn muốn xóa tất cả phẩm khỏi giỏ hàng của bạn?";
let duration = 3000;
let colorError = "#d2691eb0";
let colorWarning = "#ffb700";
let classError = "fa-exclamation";
let classWarning = "fa-triangle-exclamation";
let itemTrash;
let isTrashAll;

nutGiam.forEach((item, index) => {
    item.addEventListener('click', function(){
        let soluong = item.nextElementSibling.children[0];
        let min = parseFloat(item.nextElementSibling.firstElementChild.getAttribute("min"));
        if(soluong.value > min)
        {
            soluong.value--;
            let conteinerItem = item.parentNode.parentNode.parentNode.parentNode;
            let giaban = conteinerItem.children[0].children[1].children[1].children[2].firstElementChild.innerHTML;
            let check = conteinerItem.children[0].children[0].firstElementChild.checked;
            console.log(giaban);
            if(check.checked)
                updateMoney(-1, giaban, check.checked);
        }
        else
        {
            let text = "Số lượng tối thiểu là " + min;
            dialogIcon.classList.remove(classWarning);
            openDialog(classError, colorError, text);
        }
    })
});

nutTang.forEach((item, index) => {
    item.addEventListener('click', function(){
        let soluong = item.previousElementSibling.children[0];
        let max = parseFloat(item.previousElementSibling.firstElementChild.getAttribute("max"));
        if(soluong.value < max)
        {
            soluong.value++;
            let conteinerItem = item.parentNode.parentNode.parentNode.parentNode;
            let giaban = conteinerItem.children[0].children[1].children[1].children[2].firstElementChild.innerHTML;
            let check = conteinerItem.children[0].children[0].firstElementChild.checked;
            if(check.checked)
                updateMoney(1, giaban, check.checked);
        }
        else
        {
            let text = "Số lượng tối đa là " +max;
            openDialog(classError, colorError, text);
        }
        })
});

inputs.forEach((item, index) => {
    let soluongtruoc;
    item.addEventListener('focus', function(){
        soluongtruoc = item.value;
    })

    item.addEventListener('focusout', function(){
        let soluongsau = item.value;
        let max = parseFloat(item.getAttribute("max"));
        let min = parseFloat(item.getAttribute("min"));
        if(soluongsau < min || soluongsau > max)
        {
            item.value = soluongtruoc;
            let text = "Số lượng thiểu đa là " + min + " tối đa là " + max;
            openDialog(classError, colorError, text);
        }
        else{
            let conteinerItem = item.parentNode.parentNode.parentNode.parentNode.parentNode;
            let giaban = conteinerItem.children[0].children[1].children[1].children[2].firstElementChild.innerHTML;
            let check = conteinerItem.children[0].children[0].firstElementChild.checked;
            if(check.checked)
                updateMoney(soluongsau - soluongtruoc, giaban, check.checked);
        }
    })
});

checks.forEach((item, index) => {
    item.addEventListener('click', function(){
        clickItem(item.parentNode.parentNode.parentNode, item.checked);
        if(item.checked)
            chooseItem += 1;
        else
            chooseItem -= 1;
        updateChooseAll();
    })
});

chooseAll.addEventListener('click', function(){
    if(chooseAll.checked)
    {
        checks.forEach((item, index) => {
            if(!item.checked)
            {
                item.checked = true;
                clickItem(item.parentNode.parentNode.parentNode, item.checked);
            }
        });
    }
    else
    {
        checks.forEach((item, index) => {
            if(item.checked)
            {
                item.checked = false;
                clickItem(item.parentNode.parentNode.parentNode, item.checked);
            }
        });
    }
})

trashItem.forEach((item, index) => {
    item.addEventListener('click', function(){
        openModal(text1);
        itemTrash = item;
        isTrashAll = false;
    })
});

trashAll.addEventListener('click', function(){
    openModal(text2);
    isTrashAll = true;
})

agreeModal.addEventListener('click', function(){
    closeModal();
    if(isTrashAll)
    {
        trashItem.forEach((item, index) => {
            resetPay();
            chooseItem = 0;
            chooseAll.checked = false;
            item.parentNode.parentNode.parentNode.remove();
        });
        trashItem = document.querySelectorAll(".trash-btn");
        checks = document.querySelectorAll(".check-btn");
    }
    else{
        let cartItem = itemTrash.parentNode.parentNode.parentNode;
        let check = cartItem.children[0].children[0].firstElementChild.checked;
        if(check)
        {
            chooseItem -= 1;
            clickItem(itemTrash.parentNode.parentNode.parentNode, false);
        }
        cartItem.remove();
        trashItem = document.querySelectorAll(".trash-btn");
        checks = document.querySelectorAll(".check-btn");
        updateChooseAll();
    }
})

closeModalBtn.addEventListener('click', function(){
    closeModal();
})

modal.addEventListener('click', function(){
    closeModal();
})

modalContainer.addEventListener('click', function(event) {
    event.stopPropagation();
})

cancelModal.addEventListener('click', function(){
    closeModal();
})

payment.forEach((item, index) => {
    item.addEventListener('click', function(){
        let soluong = parseFloat(sumItem.innerHTML);
        if(soluong == 0)
        {
            console.log("ok");
            text = "Vui long chọn sản phẩm!";
            openDialog(classWarning, colorWarning, text);
        }
    })
});

function clickItem(item, check){
    let giaban = item.children[0].children[1].children[1].children[2].firstElementChild.innerHTML;
    let soluong = item.children[1].children[0].children[0].children[1].firstElementChild.value;
    updateMoney(soluong, giaban, check);
}

function updateMoney(soluong, giaban, checked)
{

    giaban = giaban.replaceAll('.', '');
    giaban = parseFloat(giaban);
    soluong = parseFloat(soluong);
    let tongtienT = parseFloat(tongtien.innerHTML.replaceAll('.', ''));
    let soluongT = parseFloat(sumItem.innerHTML);
    if(checked)
    {
        tongtienT += giaban*soluong;
        soluongT += soluong;
    }
    else
    {
        tongtienT -= giaban*soluong;
        soluongT -= soluong;
    }
    tongtienT = tongtienT.toString();
    let n = tongtienT.length;
    let strtong = "";
    while(n > 3)
    {
        strtong = '.' + tongtienT[n-3] + tongtienT[n-2] + tongtienT[n-1] + strtong;
        n = n-3;
    }
    while(n > 0)
    {
        strtong = tongtienT[n-1] + strtong;
        n--;
    }
    tongtien.innerHTML = strtong;
    sumItem.innerHTML = soluongT;
    thanhtien.innerHTML = strtong;
    thanhtien2.innerHTML = strtong;
    sumItem2.innerHTML = soluongT;
}

function updateChooseAll() {
    if(chooseItem == checks.length && chooseItem != 0)
        chooseAll.checked = true;
    else
        chooseAll.checked = false;
}

function openModal(text) {
    modal.classList.add("open")
    trashText.innerHTML = text;
}

function closeModal() {
    modalContainer.style.animation = "modalFadeOut linear .4s forwards"
    setTimeout(function(){
        modalContainer.style.animation = "modalFadeIn linear .4s forwards";
        modal.classList.remove("open");
    }, 400);
}

function resetPay() {
    sumItem.innerHTML = "0";
    tongtien.innerHTML = "0";
    thanhtien.innerHTML = "0";
    sumItem2.innerHTML = "0";
    thanhtien2.innerHTML = "0";
}

function openDialog(error, backGroundColor, text) {
    dialogIcon.classList.add(error);
    dialogIcon.parentNode.style.backgroundColor = backGroundColor;
    dialogText.innerHTML = text;
    dialog.style.display = "flex";
    setTimeout(function() {
        dialogIcon.classList.remove(error);
        dialog.style.display = "none";
    }, duration);
}