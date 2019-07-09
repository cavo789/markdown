<?php

declare(strict_types = 1);

require 'vendor/autoload.php';

use Avonture\Pandoc;

$md = '';

$_POST = json_decode(file_get_contents('php://input'), true);

if (isset($_POST['md'])) {
    // Get the URL and make it readable
    $md = trim(base64_decode($_POST['md']));
}

$type = $_POST['type'] ?? '';

$export = new Pandoc();

$export->readSettings('pandoc.json');

$export->setMarkdown($md);
$export->setOutputType($type);

$arrReturn             = [];
$arrReturn['status']   = $export->doIt() ? 'success' : 'failure';
$arrReturn['filename'] = $export->getOutputFile();
$arrReturn['error']    = $export->getLastError();

if ($export->isDebug()) {
    $arrReturn['debug']['command'] = $export->getCommandLine();
}

unset($export);

die(json_encode($arrReturn));
