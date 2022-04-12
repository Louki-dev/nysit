<?php

class Domain
{
    public static function domain()
    {
        $port = (in_array($_SERVER['SERVER_PORT'],["80", "443", "8080"]) ? "" : ":" . $_SERVER['SERVER_PORT']);
        return ($_SERVER['REQUEST_SCHEME'] == 'http' ? 'http://' : 'https://') . $_SERVER['SERVER_NAME'] . $port;
    }
}
