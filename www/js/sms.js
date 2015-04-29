(function() { 
    $(document).on("pageinit", "#sms", function(e) {
        e.preventDefault();
        
        function onDeviceReady() {
            console.log("Apache Cordova is loaded ...");
        
            $("#sendSMS").on("tap", function(e) {
                e.preventDefault();

                
            
                var messageInfo = {
                    phoneNumber: 12981625268,
                    textMessage: "receber"
                }
                
                sms.sendMessage(messageInfo, function() {
                    alert("Message is sent successfully ...");
                }, function(error) {
                    alert("Error code: " + error.code + ", Error message: " + error.message);
                });
            });
        }
                   
        document.addEventListener("deviceready", onDeviceReady, false);
    });

    $(document).on("pageshow", "#sms", function(e) {
        e.preventDefault();
        
        $("#smsForm").validate({
          errorLabelContainer: "#messageBox",
          wrapper: "li", 
          rules: {
            textMessage: "required",
            phoneNo: {
                    required: true,
                    number: true
                }
            },
            messages: {
              textMessage: "Erro na mensagem de texto, entre em contato com o administrador",
              phoneNo: {
                    required: "O número está incorreto, verifique nas configurações",
                    number: "Ops, Não coloque letras no número do celular, arrume nas configurações"
                }
            }
        });
    });    

})();