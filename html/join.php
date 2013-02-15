<html>
<head><title>Result Page</title></head>
<body align='center'>


<?php
include_once "conn.php";

foreach($_POST as $key => $val){
  $_POST[$key] = htmlspecialchars(stripslashes($_POST[$key]));
  $_POST[$key] = mysql_escape_string($_POST[$key]);
}
$name = $_POST['nnn'];
$phone = $_POST['phone'];
$info = $_POST['infoa'];
$ip = $_SERVER['REMOTE_ADDR'];

if(strlen($name)>0 && strlen($phone)>0 && strlen($info)>0){
  $query = "insert into $table(name,phone,info,ip) select '$name','$phone','$info','$ip' from dual where not exists (select sid from $table where phone='$phone');";
  $result = mysql_query($query) or die("ERROR");

  $no = mysql_affected_rows();
  if($no>0){
    echo "You successfully got arrested. >_<<br><br>";
    echo "<img src='img/2.jpg'><br>";
    echo "<img src='img/1.jpg'><br>";
  }else{
    echo "You are already in the jail :/<br><br>";
    echo "<img src='img/jail.jpg'><br>";
  }

  mysql_free_result($result);

}else{
  echo "-_- Get off.<br>";
}
echo "<script>setTimeout('self.close();',5000);</script>";
?>
<progress id="progressBar" max="100" value="0"></progress><br>
Time left for closing. <br>
This page will be closed within 5 seconds.<br>
<script>
function go() {
    // locate the progress bar and store it in a variable
    var bar = document.getElementById("progressBar");
    if(bar.value!=100){
        bar.value += 1;
        bar.title = bar.value+" %";
        setTimeout("go();",50);
    }
};
</script>
<script>
go();
</script>

</body>
</html>
