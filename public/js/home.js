$(document).ready(function(){

	//New User Insertion form appended
	$("body").on("click",".create",function(){

		var tempVars = Handlebars.compile($("#create-template").html());
		$(".area").html(tempVars);

	});


	//New user form submition
	$("body").on("submit","#create_user_form",function(e){

		e.preventDefault();

		$.ajax({

			url:"/users/new",
			type:"POST",
			data:$(this).serialize()
		}).done(function(data){

			if(data._id)
			{
				$(".error").addClass("alert alert-success").html("Usuário adicionado com Sucesso.");
			}
			else
			{
				$(".error").addClass("alert alert-danger").html("Erro! Usuário não pode ser inserido.");
			}

			getUsersOnPage();

		});

	});

	//View Users
	$("body").on("click",".view_users",function(){

		var sort_by = "_id";
		var sort_order = 1;
		var page_no = 1;
		var search_value = "";
		getUsersOnPage (page_no,sort_by,sort_order,search_value);

	});

	//Delete user
	$("body").on("click",".del_btn",function(){

		var id = $(this).attr("data");
		var self = $(this);
		var search_value = $("#search_input").val();

		$.ajax({

			url:"/users/"+id,
			type:"DELETE"

		}).done(function(response){

			var page_no = 1;
			var sort_by = $("#sort_by").val();
			var sort_order = $("#sort_order").val();
			var search_value = $("#search_input").val();

			if(id != "")
			{
				$(".error").addClass("alert alert-success").html("Usuário excluído com Sucesso.");
			}
			else
			{
				$(".error").addClass("alert alert-success").html("Erro! Usuário não pode ser excluído.");
			}

			getUsersOnPage();

		});

	});

	//Edit User Form
	$("body").on("click",".edit_btn",function(){

		var id = $(this).attr("data");
		$.ajax({

			url:"/users/"+id,
			type:"GET"

		}).done(function(data){

			var tempVars = Handlebars.compile($("#edit-template").html());
			var tempFinal = tempVars(data);
			$(".area").html(tempFinal);

		});

	});


	//View User
	$("body").on("click",".view_btn",function(){

		var id = $(this).attr("data");
		$.ajax({

			url:"/users/"+id,
			type:"GET"

		}).done(function(data){

			var tempVars = Handlebars.compile($("#view-template").html());
			var tempFinal = tempVars(data);
			$(".area").html(tempFinal);

		});

	});

	//Edit User Form Submission
	$("body").on("submit","#edit_user_form",function(e){

		e.preventDefault();
		var id = $("#user_id").val();

		$.ajax({

			url:"/users/"+id,
			type:"PUT",
			data:$(this).serialize()

		}).done(function(data){
			if(data.ok === 1)
			{
				$(".error").addClass("alert alert-success").html("Usuário atualizado com Sucesso.");
			}
			else
			{
				$(".error").addClass("alert alert-success").html("Erro! Usuário não pode ser atualizado.");
			}

			getUsersOnPage();

		});

	});


	//Go back to view users
	$("body").on("click","#go_back",function(e){

		getUsersOnPage ();

	});


});


function getUsersOnPage (page_no,sort_by,sort_order,search_value) {

	$.ajax({

		url:"/users",
		type:"GET",

	}).done(function(data){

		var tempVars = Handlebars.compile($("#view-users").html());
    var tempRecords = {};
		tempRecords.records = data;
		var tempFinal = tempVars(tempRecords);
    $(".area").html(tempFinal);
		setTimeout(function(){
  	$(".error").removeClass("alert alert-success").removeClass("alert alert-danger").html("");
	}, 3000);

	});
}
