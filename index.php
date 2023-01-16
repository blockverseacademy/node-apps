<?php
// Enter your code here, enjoy!

$obj = json_decode(file_get_contents('php://input'));   



$secretKey = hex2bin(md5("8nLNssE3VEyW"));
$initVector = pack("C*", 0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f);

function pkcs5_pad ($text, $blocksize) 
{ 
    $pad = $blocksize - (strlen($text) % $blocksize); 
    return $text . str_repeat(chr($pad), $pad); 
} 

/* Open module and Create IV (Intialization Vector) */
$openMode = mcrypt_module_open(MCRYPT_RIJNDAEL_128, '','cbc', '');
$blockSize = mcrypt_get_block_size(MCRYPT_RIJNDAEL_128, 'cbc');



 $plainPad = pkcs5_pad($obj, $blockSize);
echo $plainPad;
// $plainPad = pkcs5_pad("{'loginId':'abc.carter@wheebox.com','firstName':'abc','lastName':'Carter','dob':'1802-01-16', 'state':'pune', 'gender':'Male','country':'India', 'city':'Gurugram', 'assignTests': [34074]}", $blockSize);




/* Initialize encryption handle */
if (mcrypt_generic_init($openMode, $secretKey, $initVector) != -1)
{
/* Encrypt data */
$encryptedText = mcrypt_generic($openMode, $plainPad); mcrypt_generic_deinit($openMode);
}

$auth_Token =  bin2hex($encryptedText);
echo $auth_Token;




 // echo "<script> window.location.replace('".$callbackURL."'); </script>";
exit();


?>

