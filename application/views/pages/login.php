
<form action="/login" method="post" id="form">
	<?php if(isset($error)):?>
	<div class="row error"><?=$error;?></div>
	<?php endif; ?>
	<div class="row"><input type="text" class="input-text" id="email" name="email" placeholder="email" /></div>
	<div class="row"><input type="password" class="input-text" id="pwd" name="password" placeholder="password"/></div>
	<div class="row"><input type="submit" value="Log in" class="btn-sure" /></div>
</form>