<?php

namespace core\config;

use core\misc\Utilities;

class Env
{

    protected static $default = [
        "IV" => "",
        "KEY" => "",
        "database" => [
            "username" => "",
            "password" => "",
            "database" => "",
            "host" => "",
            "port" => "",
        ],
        "env" => ""
    ];
    private static $envFile = "/.env";
    const VERSION = 'v1';

    public function __construct()
    {
        if (!file_exists(dirname(__FILE__) . '/' . self::$envFile)) {
            $this->generateEnvFile();
        }
    }

    public function generateEnvFile()
    {
        $file = dirname(__FILE__) . '/' . self::$envFile;
        $fileHandler = fopen($file, "w");

        self::$default['IV'] = Utilities::randomizer(16);
        self::$default['KEY'] = Utilities::randomizer(16);

        fwrite($fileHandler, json_encode(self::$default, JSON_PRETTY_PRINT));
        fclose($fileHandler);
        chmod($file, 0775);
        return true;
    }

    public function getEnvFile()
    {
       return json_decode(file_get_contents(dirname(__FILE__) . '/' . self::$envFile), true);
    }

}
