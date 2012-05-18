
<form action="/login" method="post" id="form">
	<?php if(isset($error)):?>
	<div class="row error"><?=$error;?></div>
	<?php endif; ?>
	<div class="row"><input type="text" id="email" name="email" placeholder="email" /></div>
	<div class="row"><input type="password" id="pwd" name="password" placeholder="password"/></div>
	<div class="row"><input type="submit" value="提交" /></div>
</form>