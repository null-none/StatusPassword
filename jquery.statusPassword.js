/*
statusPassword 
Version 1.0 
*/
(function( $ ){
  $.fn.statusPassword = function() {

/*
empty - 0 символов "пустой"
light - до 6 символов "слабый"
normal - больше 6 символов и есть одинаковые символы "средний"
good - больше 6 символов и разные символы "хороший"
hard - больше 6 символов и есть _ и разные регистры "тяжелый"
*/
  var methods = {
     // пустое поле
     empty : function() {
     	if (pass.length ==0)
     		return 'empty'
     	else 
     		return false
     },
     // легкий пароль
     light : function() {
     	if (pass.length  > 0 && pass.length < 7)
     		return 'light'
     	else
     		return false
     },
     // средний пароль
     normal : function() {
     	if (pass.length > 6)
     		return 'normal'
     	else
     		return false
     },
     // хороший пароль
     good : function() {
     	if (pass.length > 6) {
               var listPass = []
               for (var i=0; i< pass.length; i++) {
                    listPass.push(pass[i])
               }
               listPass.sort()
               temp = listPass.shift()
               for (var i=1; i< listPass.length; i++) {
                    if (temp == listPass.shift())
                         return false
                    temp = listPass.shift()
               }
               return 'good'               
          } else {
               return false     
          }	
     },
     // тяжклый пароль
     hard : function() {
          if (result == 'good') {
               var status = false
               for (var i=0; i< pass.length; i++) {
                    if (pass[i] == '_' || pass[i] == '-' || pass[i] == pass[i].toUpperCase())
                         status = true
               }
               if (status) 
                    return 'hard'
               else
                    return false
          } else {
              return false               
          }
     },
  };

/*
вывод статуса
*/
  var output = {
     empty : function() {
     	$('#status').html('пусто')
     },
     light : function() {
     	$('#status').html('легкий пароль')
     },
     normal : function() {
     	$('#status').html('средний пароль')
     },
     good : function() {   
     	$('#status').html('хороший пароль')	
     },
     hard : function() {  	
     	$('#status').html('тяжелый пароль')
     },
  };

  // текущий пароль из input
  var pass = $(this).val()
  // проверка по всем категориям
  var functions = Array('empty', 'light', 'normal', 'good', 'hard')
  // по умолчанию пустой
  var result = 'empty'
  // делаем проверку
  for (var i = 0; i < functions.length; i++)
  	result = methods[functions[i]].apply()==false?result:methods[functions[i]].apply()  
  // выводим статус
  output[result].apply()
 
  };
})( jQuery );

