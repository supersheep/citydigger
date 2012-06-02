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
	<div class="logo">
		<img src="/s/i/cityeye.jpg" alt="cityeye" />
	</div>
	<?php if($logged):
	?>
	<div class="hd-tools">
		<div class="avatar"><img src="<?=$avatar?>" alt="<?=$username?>" title="<?=$username?>" /></div>
		<!--div class="find icon"> </div-->
		<div class="at icon"> </div>
		<div class="msg icon">
		<?php if($msgcount):
		?>
			<small class="count"><?=$msgcount;?></small>
		<?php
			endif;
		?>	
		</div>
		<a  href="/logout" class="eject icon"></a>
	</div>
	<?php else:?>
	<div class="hd-tools">
		<div class="txt"><a href="login">login</a></div>
		<div class="txt"><a href="reg">reg</a></div>
	</div>
	<?php endif;?>
</div>