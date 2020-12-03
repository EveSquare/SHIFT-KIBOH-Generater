
function doGet() {
  var template = 'index';
  return HtmlService.createTemplateFromFile(template).evaluate();
}

function doPost(postdata){
  var date = new Date();
  var user_input_month = postdata.parameters.month.toString();
  var user_half = postdata.parameter.half.toString();
  var Mon = postdata.parameter.Mon.toString();
  var Tue = postdata.parameter.Tue.toString();
  var Wed = postdata.parameter.Wed.toString();
  var Thu = postdata.parameter.Thu.toString();
  var Fri = postdata.parameter.Fri.toString();
  var Sat = postdata.parameter.Sat.toString();
  var Sun = postdata.parameter.Sun.toString();
  
  shift_time = [Sat, Sun, Mon, Tue, Wed, Thu, Fri];
  var t = HtmlService.createTemplateFromFile("input_page");
  t.month = user_input_month + "/\n";
  //Utilities.formatDate( date, 'Asia/Tokyo', 'MM') + "/\n";
  
  var output_text = "";
  if(user_input_month=="1"){
    var cal_start = 1
    var cal_end = 16
    var cal_name = "前半"
  }
  else{
    var date = new Date();
    date.setMonth(date.getMonth()+1);
    date.setDate(0);
    var cal_start = 17
    var cal_end = Utilities.formatDate(date, 'JST', 'dd');
    var cal_name = "後半"
  }
  for(let i=cal_start; i<=cal_end; i++){
    var select_day = Utilities.formatDate( date, 'Asia/Tokyo', 'yyyy') + "/" + user_input_month + "/";
    var day_num = new Date(select_day + i).getDay();
    output_text = output_text + i + "日 ";
    output_text = output_text + shift_time[day_num] + "\n";
  }
  
  
  t.output_text = output_text;
  return t.evaluate().setTitle("出力");
}
