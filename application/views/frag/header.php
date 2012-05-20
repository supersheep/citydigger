<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title><?=$title;?></title>	
	<link rel="stylesheet" type="text/css" href="/s/c/base.css" media="all" />
	<link rel="stylesheet" type="text/css" href="/s/c/cidi.css" media="all"/>
	<script type="text/javascript" src="/s/j/jquery.js"></script>
	<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyA9Xvuu9wNa0nAgSBu0lZC9FtvnRCct16M&sensor=true"></script>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<!--[if lt IE 7 ]><![endif]-->
</head>
<body>
<div id="hd">
	<div class="hd-main">
		<div class="avatar">
			
		<?php if($logged){
		?>	
			<img src="/s/i/dig_dug.png" alt="citydigger" />
		<?php
		}else{
		?>
			<img src="/s/i/dig_dug.png" alt="citydigger" />
		<?php } ?>
		</div>
	</div>
	<?php if($logged):
	?>
	<div class="hd-tools">
		<div class="uname"><?=$username?><img src="<?=$avatar?>" /></div>
		<div class="post"><input type="text" /></div>
		<div class="msg">msg<small class="count">16</small></div>
	</div>
	<?php else:?>
	<div class="hd-tools">
		<div><a href="login">login</a></div>
		<div><a href="reg">reg</a></div>
	</div>
	<?php endif;?>
</div>