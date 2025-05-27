<?php
session_start();
if (isset($_GET['theme'])) {
    $_SESSION['tema'] = $_GET['theme'];
    echo 'OK';
} else {
    echo 'Erro';
}
?>