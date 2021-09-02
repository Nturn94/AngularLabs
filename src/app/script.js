// const e = require("express");

$( document ).ready(function() {
    $("#loginform").submit(function(event){
        event.preventDefault();
        
        ajaxPost();
    });

    function ajaxPost(){
        var formData = {
            email : $("#email").val(),
            upwd : $("#upwd").val()
        }
            console.log(login.component.ts);
        $.ajax({
            type : "POST",
            contentType : "application/json",
            url : window.location + "api/login",
            data : JSON.stringify(login.component.ts),
            dataType : 'json',
            success : function(customer) {
                if (customer.valid == true) {
                    $("#loginform").removeClass("fail");
                    $("#loginform").addClass("success");
                } else {
                    $("#loginform").removeClass("success");
                    $("#loginform").addClass("fail");
                }
                
                $("#postResultDiv").html("<p>" + "Post successfully! <br>"+ "Email address: " + customer.email+"</br>" + "Password: "+ customer.upwd + "</br>" + "valid user: " + customer.valid +"</p>");

            },

            error : function(e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }

        });

    resetData();
    }
    function resetData(){
        $("#email").val("");
        $("#upwd").val("");
    }

});

