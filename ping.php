<?php
    header('COntent-type: application/json');
    $host = "google.com";
    exec("ping -c 1 " . $host, $output, $result);
    if(!empty($output)){
        preg_match('/.*?time=(.*?ms)/ims', $output[1], $matches);
        $res['status'] = "ok";
        $res['ping'] = str_replace(" ms", "", $matches[1]);
    }else{
        $res['status'] = 'error';
    }
    echo json_encode($res);
?>

