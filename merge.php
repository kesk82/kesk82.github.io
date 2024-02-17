<?php

if (!empty($_GET["width"]) && !empty($_GET["height"]) && !empty($_GET["posx"]) && !empty($_GET["posy"])) {
  $base = new Imagick('img/bg.jpg');
  $mask = new Imagick('img/logo.png');

  $mask->resizeImage(intval($_GET["width"]), intval($_GET["height"]), Imagick::FILTER_LANCZOS, 1);

  $base->compositeImage($mask, Imagick::COMPOSITE_OVER, intval($_GET["posx"]), intval($_GET["posy"]));
  $base->writeImage('img/out.jpg');
}

?>

<html><body><img src="img/out.jpg?<?php echo rand(); ?>" style="max-width:100%;height:auto;display: block;"></body></html>