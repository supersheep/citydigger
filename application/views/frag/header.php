<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title><?=$title;?></title>	
	<link rel="stylesheet" type="text/css" href="/s/c/base.css" media="all" />
	<link rel="stylesheet" type="text/css" href="/s/c/cidi.css" media="all"/>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<!--[if lt IE 7 ]><![endif]-->
</head>
<body>
<div id="hd">
	<div class="hd-main">
		<div class="avatar">
			
		<?php if($logged){
		?>
			<img src="<?=$avatar?>" alt="<?=$username?>" />
		<?php
		}else{
		?>
			<img src="/s/i/dig_dug.png" alt="citydigger" />
		<?php } ?>
		</div>
	</div>
	<?php if($logged){
	?>
	<div class="hd-tools">
		<div class="post"><input type="text" /></div>
		<div class="uname"><?=$username?></div>
		<div class="info">msg<small class="count">16</small></div>
	</div>
	<?php }else{ ?>
	<div class="hd-tools">
		<a class="login" href="/login">sign in</a>
		<a class="reg" href="/reg">sign up</a>
	</div>
	<?php
		}
	?>
</div>