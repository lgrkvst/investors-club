function hideVerifyBankIDModal() {
	$('#VerifyBankIDModal').modal('hide');
}
function showVerifyBankIDModal() {
	$("#VerifyBankIDModal").appendTo("#page-container");
	$('#VerifyBankIDModal').removeClass("hide").modal();
}
function ready(btnRdy) {
	hideVerifyBankIDModal();
	$("#" + btnRdy).click();
}
function cancel(btnCan) {
	hideVerifyBankIDModal();
	$("#" + btnCan).click();
}
function message(btnOK, btnCan, errorMessage) {
	HideAllModals();
	showVerifyBankIDModal();
	$("#loadingImage").hide();
	$("#message").html(errorMessage);
	$("#" + btnOK).show();
	$("#" + btnCan).hide();
}
function start(btnOK, btnCan) {
	HideAllModals();
	showVerifyBankIDModal();
	$("#loadingImage").show();
	$("#" + btnOK).hide();
	$("#" + btnCan).show();
}
