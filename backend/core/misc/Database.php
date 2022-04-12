<?php

namespace core\misc;

use core\config\Env;

class Database
{
    const DEFAULT_LIMIT = 10;
    const DEFAULT_OFFSET = 0;
    public static $modelNamespace = "api\\v1\\models\\";
    public static $returnOverride = false;
    public static $overrideValues = null;

    public function __construct()
    {
    }

    function processQuery($query, array $args = array())
    {
        $env = (array)(new Env())->getEnvFile();

        try {
            $pdo = new \PDO(
                'mysql:host=' . $env['database']['host'] . ';port=' . $env['database']['port'] . ';dbname=' . $env['database']['database'],
                $env['database']['username'],
                $env['database']['password'],
                array(
                    \PDO::ATTR_PERSISTENT => true,
                    \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION
                )
            );
            $pdo_statement = $pdo->prepare($query);

            foreach ($args as $index => $arg) {
                if (is_int($arg)) {
                    $type = \PDO::PARAM_INT;
                    $arg = filter_var(trim(urlencode($arg)), FILTER_SANITIZE_NUMBER_INT);
                } elseif (is_bool($arg)) {
                    $type = \PDO::PARAM_BOOL;
                    $arg = filter_var(trim(urlencode($arg)), FILTER_SANITIZE_NUMBER_INT);
                } elseif (is_null($arg)) {
                    $type = \PDO::PARAM_NULL;
                    $arg = NULL;
                } else {
                    $type = \PDO::PARAM_STR;
                    // $arg = filter_var(trim(urldecode($arg)), FILTER_UNSAFE_RAW, FILTER_FLAG_STRIP_HIGH);
                }

                try {
                    $pdo_statement->bindValue($index + 1, $arg, $type);
                } catch (\Exception $e) {
                    $pdo = NULL;
                    return Utilities::responseWithException($e);
                }
            }

            try {
                $pdo_statement->execute();

                if ($pdo_statement->rowCount()) {
                    $output = (preg_match('/\b(update|insert|delete)\b/', strtolower($query)) === 1) ? ["response" => Defaults::SUCCESS, "last_inserted_id" => !is_null($pdo) ? $pdo->lastInsertId() : null] : $pdo_statement->fetchAll(\PDO::FETCH_ASSOC);
                }
            } catch (\PDOException $e) {
                $pdo = NULL;
                return Utilities::responseWithException($e);
            }

            $pdo = NULL;
            flush();
            // return Utilities::response(true, null, $output ?? null);
            return $output ?? null;
        } catch (\PDOException $e) {
            $pdo = NULL;
            return Utilities::responseWithException($e);
        }
    }

}
