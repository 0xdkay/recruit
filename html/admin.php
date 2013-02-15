
<?php 
    include_once "conn.php";

			foreach($_GET as $key => $val){
				$_GET[$key] = htmlspecialchars(stripslashes($_GET[$key]));
				$_GET[$key] = mysql_escape_string($_GET[$key]);
			}
		if($_GET['key'] == $authkey){
?>
<html>
<head>
<style>
table {width:100%; margin:0 auto; text-align:left; border-collapse:collapse}
th, td {padding:5px 10px}
caption {font-weight:700; font-size:20px; padding:5px; color:#1BA6B2; text-align:left; margin-bottom:5px}
th {background:#ABC668; color:#fff; text-align:left; border-right:1px solid #fff}
tr.odd {background:#f9f9f9}
tr.odd th {background:#f2f2f2}
tr:hover {background:#F3F5BB}
tr:hover th {background:#F2F684; color:#1BA6B2}


</style>
</head>
<body>
	<div class='dboard' align='center' style=''>
	<table class='board' >
	<tr>
		<th id='no' class='keys' width='50px' height='20px' ><b>No</td>
		<th id='name' class='keys' width='240px' height='20px' ><b>Name</td>
		<th id='phone' class='keys' width='230px' height='20px' ><b>Phone</td>
		<th id='info' class='keys' width='600px' height='20px'  ><b>Info</td>
		<th id='date' class='keys' width='150px' height='20px'  ><b>Date</td>
		<th id='ip' class='keys' width='100px' height='20px'  ><b>IP</td>
	</tr>

<?php
		$query = "select sid, name, phone, info, date, ip from $table where sid>1 order by sid desc";
		$result = mysql_query($query) or die("ERROR");
    $i = 0;
    $none = true;
    while(($tmp = mysql_fetch_array($result)))
    {
      $none = false;
      if ($i%2==0) $str = "";
      else $str = "class='odd'";
?>
<tr <?php echo $str;?>>
	<td class='no'><?php echo $tmp['sid'];?>  </td>
	<td class='name'><?php echo $tmp['name'];?> </td>
	<td class='phone'><?php echo $tmp['phone'];?> </td>
	<td class='info'><?php echo $tmp['info'];?> </td>
	<td class='date'><?php echo $tmp['date'];?> </td>
	<td class='ip'><?php echo $tmp['ip'];?> </td>
</tr>
<?php
      $i += 1;
		}
?>
<tr>
  <td colspan=6 style='text-align:center'>
    <h1 style='color: red'>
		<font size='7'><?php echo "$i people applied";?></font>
    </h1>
  </td>
</tr>

<?
		mysql_free_result($result);
		mysql_close();
?>
		
</table>
	</div>
</body></html>

<?php
	}else{
		echo "404 Not Found.";
	}
?>
