function openDialog(dialogId) {
    const dialogRef = document.getElementById(dialogId);
    const mobileBasket = document.getElementById('mobileBasket');

    if (dialogId === 'orderedDialog') {
        closeDialog('mobileBasket');
        emptyBasket();
    }
    dialogRef.showModal();
    document.body.classList.add('no_scroll');
}

function closeDialog(dialogId) {
    const dialogRef = document.getElementById(dialogId);

    if (dialogRef.open) {
        dialogRef.close();
    }
    document.body.classList.remove('no_scroll');
}