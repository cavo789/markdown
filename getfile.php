<?php

declare(strict_types = 1);

require 'vendor/autoload.php';

use Avonture\Pandoc;

$export = new Pandoc('pandoc.json');
$export->readSettings();
$export->download($_GET['filename'] ?? '');
unset($export);
