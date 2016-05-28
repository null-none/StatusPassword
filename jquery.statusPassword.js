/*
statusPassword
Version 1.0
*/
(function($) {
  $.fn.statusPassword = function() {

    /*
    empty - 0 symbols, "empty";
    light - up to six characters "light"
    normal - more than six chars, includes duplicates "normal"
    good - more than six chars, no duplicates "good"
    hard - more than six chars, includes "_" and different registers "hard"
    */
    var methods = {
      // empty field
      empty: function() {
        if (pass.length == 0)
          return 'empty'
        else
          return false
      },
      // light password
      light: function() {
        if (/^\d+$/.test(pass)) {
          return 'light'
        }
        if (pass.length > 0 && pass.length < 7)
          return 'light'
        else
          return false
      },
      // normal password
      normal: function() {
        if (pass.length > 6 && !(/^\d+$/.test(pass)))
          return 'normal'
        else
          return false
      },
      // good password
      good: function() {
        if (pass.length > 6 && !(/^\d+$/.test(pass))) {
          var listPass = []
          for (var i = 0; i < pass.length; i++) {
            listPass.push(pass[i])
          }
          listPass.sort()
          temp = listPass.shift()
          for (var i = 1; i < listPass.length; i++) {
            if (temp == listPass.shift())
              return false
            temp = listPass.shift()
          }
          return 'good'
        } else {
          return false
        }
      },
      // hard password
      hard: function() {

        if (result == 'good') {
          var status = false
          for (var i = 0; i < pass.length; i++) {
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
    status output
    */
    var output = {
      empty: function() {
        $('#status').html('empty')
      },
      light: function() {
        $('#status').html('light password')
      },
      normal: function() {
        $('#status').html('normal password')
      },
      good: function() {
        $('#status').html('good password')
      },
      hard: function() {
        $('#status').html('hard password')
      },
    };

    // current password from input
    var pass = $(this).val()
      // проверка по всем категориям
    var functions = Array('empty', 'light', 'normal', 'good', 'hard')
      // default: empty
    var result = 'empty'
      // check
    for (var i = 0; i < functions.length; i++)
      result = methods[functions[i]].apply() == false ? result : methods[
        functions[i]].apply()
      // return status
    output[result].apply()

  };
})(jQuery);
