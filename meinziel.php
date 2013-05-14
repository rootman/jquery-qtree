<?php

$data = json_decode(file_get_contents('data.json'));

echo $data->choices[3];